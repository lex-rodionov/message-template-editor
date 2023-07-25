import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ROOT_PARENT_ID, TYPE_ATTRIBUTE_NAME } from 'constants/index';
import {
  MessageBody,
  MessageBodyType,
  MessageCondition,
  MessageTemplate,
  MessageText,
  SelectedInput,
  TemplateItemType,
} from 'types';
import {
  getChangeConditionText,
  createNewCondition,
  getNestedItemIds,
  splitInputText,
  canAddCondition,
  deleteNestedCondition,
  addVariableToText,
} from 'utils/templateEditor';


const SET_TEMPLATE = 'SET_TEMPLATE';
const CHANGE_BODY_TEXT = 'CHANGE_BODY_TEXT';
const CHANGE_CONDITION_TEXT = 'CHANGE_CONDITION_TEXT';
const CHANGE_CONDITION_END_TEXT = 'CHANGE_CONDITION_END_TEXT';
const SET_FOCUS = 'SET_FOCUS';
const ADD_CONDITION = 'ADD_CONDITION';
const DELETE_CONDITION = 'DELETE_CONDITION';
const DELETE_BODY_CONDITION = 'DELETE_BODY_CONDITION';
const ADD_VARIABLE = 'ADD_VARIABLE';

export const defaultTemplate: MessageTemplate = {
  body: [
    {
      id: ROOT_PARENT_ID,
      type: MessageBodyType.TEXT,
      text: '',
    }
  ],
  conditionList: [],
  selectedInput: null,
}

type TemplateAction = {
  type: string;
  payload?: unknown;
}

export default function useTemplate() {
  const [template, dispatch] = useReducer(
    templateReducer,
    defaultTemplate
  );

  return {
    template,
    setTemplate: (template: MessageTemplate) => {
      dispatch({
        type: SET_TEMPLATE,
        payload: template,
      });
    },
    changeBodyText: (id: string, text: string) => {
      dispatch({
        type: CHANGE_BODY_TEXT,
        payload: { id, text },
      });
    },
    getConditionItem: (id: string) => {
      return template.conditionList.find(item => item.id === id);
    },
    changeConditionText: (id: string, text: string) => {
      dispatch({
        type: CHANGE_CONDITION_TEXT,
        payload: { id, text },
      });
    },
    changeConditionEndText: (id: string, text: string) => {
      dispatch({
        type: CHANGE_CONDITION_END_TEXT,
        payload: { id, text },
      });
    },
    setFocus: (selectedInput: SelectedInput) => {
      dispatch({
        type: SET_FOCUS,
        payload: selectedInput
      });
    },
    addCondition: () => {
      dispatch({
        type: ADD_CONDITION,
      });
    },
    deleteCondition: (conditionId: string) => {
      dispatch({
        type: DELETE_CONDITION,
        payload: conditionId,
      });
    },
    deleteBodyCondition: (conditionId: string) => {
      dispatch({
        type: DELETE_BODY_CONDITION,
        payload: conditionId,
      });
    },
    addVariable: (variableName: string) => {
      dispatch({
        type: ADD_VARIABLE,
        payload: variableName,
      });
    },
  };
}

export type UseTemplateResult = ReturnType<typeof useTemplate>;

function templateReducer(state: MessageTemplate, action: TemplateAction): MessageTemplate {
  switch(action.type) {
    case SET_TEMPLATE: {
      return action.payload as MessageTemplate;
    }
    case CHANGE_BODY_TEXT: {
      const data = action.payload as { id: string, text: string };
      return {
        ...state,
        body: state.body.map(item => item.id === data.id
          ? { ...item, text: data.text }
          : item
        ),
      };
    }
    case CHANGE_CONDITION_TEXT: {
      const data = action.payload as { id: string, text: string };
      const changeConditionText = getChangeConditionText(
        data.id,
        data.text,
        'startText',
      );

      return {
        ...state,
        conditionList: state.conditionList.map(changeConditionText),
      };
    }
    case CHANGE_CONDITION_END_TEXT: {
      const data = action.payload as { id: string, text: string };
      const changeConditionText = getChangeConditionText(
        data.id,
        data.text,
        'endText',
      );

      return {
        ...state,
        conditionList: state.conditionList.map(changeConditionText),
      };
    }
    case SET_FOCUS: {
      return {
        ...state,
        selectedInput: action.payload as SelectedInput,
      };
    }
    case ADD_CONDITION: {
      const { conditionItemId, element } = state.selectedInput ?? {};
      const { condition, conditionItems } = createNewCondition();

      if (!conditionItemId || !element) {
        const newTextItem = {
          id: uuidv4(),
          type: MessageBodyType.TEXT,
          text: '',
        };
        const newConditionItem = {
          id: uuidv4(),
          type: MessageBodyType.CONDITION,
          condition,
        };
        const [firstItem, ...rest] = state.body;

        return {
          ...state,
          body: [
            firstItem,
            newConditionItem,
            newTextItem,
            ...rest,
          ],
          conditionList: [
            ...state.conditionList,
            ...conditionItems,
          ]
        }
      }

      const itemType = element.getAttribute(TYPE_ATTRIBUTE_NAME) as TemplateItemType;

      if (itemType === TemplateItemType.ROOT) {
        const { startText, endText } = splitInputText(element);
        const newTextItem = {
          id: uuidv4(),
          type: MessageBodyType.TEXT,
          text: endText,
        };
        const newConditionItem = {
          id: uuidv4(),
          type: MessageBodyType.CONDITION,
          condition,
        };

        const newBody: MessageBody = [];
        for (const item of state.body) {
          if (item.id === conditionItemId) {
            newBody.push({ ...item, text: startText });
            newBody.push(newConditionItem);
            newBody.push(newTextItem);
          } else {
            newBody.push(item);
          }
        }

        return {
          ...state,
          body: newBody,
          conditionList: [
            ...state.conditionList,
            ...conditionItems,
          ]
        }
      } else {
        let wasUpdated = false;

        const newList = state.conditionList.map(parentItem => {
          if (canAddCondition(parentItem, conditionItemId, itemType)) {
            wasUpdated = true;

            return {
              ...parentItem,
              ...splitInputText(element),
              condition,
            }
          }

          return parentItem;
        });

        if (wasUpdated) {
          return {
            ...state,
            conditionList: [
              ...newList,
              ...conditionItems,
            ]
          }
        }
      }

      return state;
    }
    case DELETE_CONDITION: {
      const parentId = action.payload as string;
      const parentItem = state.conditionList.find(item => item.id === parentId);

      if (parentItem?.condition) {
        const idsToDelete = getNestedItemIds(parentItem.condition, state.conditionList);
  
        const conditionList = deleteNestedCondition(
          state.conditionList,
          idsToDelete,
          parentId,
        );

        const selectedInput = idsToDelete.includes(
          state.selectedInput?.conditionItemId ?? ''
        ) ? null : state.selectedInput;
  
        return {
          ...state,
          conditionList,
          selectedInput,
        };
      }

      return state;
    }
    case DELETE_BODY_CONDITION: {
      const conditionId = action.payload as string;
      const conditionItem = state.body.find(item => item.id === conditionId);

      if (conditionItem) {
        const currentItem = conditionItem as MessageCondition;
        const idsToDelete = getNestedItemIds(currentItem.condition, state.conditionList);
  
        const conditionList = state.conditionList.filter(
          item => !idsToDelete.includes(item.id)
        );

        const conditionItemIndex = state.body.findIndex(item => item.id === conditionItem.id);
        const prevItem = state.body[conditionItemIndex - 1];
        const nextItem = state.body[conditionItemIndex + 1];
        const nextItemText = nextItem ? (nextItem as MessageText).text : '';

        const body = state.body.filter(
          item => item.id !== currentItem.id && item.id !== nextItem.id
        ).map(item => item.id === prevItem.id
          ? { ...item, text: (item as MessageText).text + nextItemText }
          : item
        );

        const selectedInput = idsToDelete.includes(
          state.selectedInput?.conditionItemId ?? ''
        ) ? null : state.selectedInput;
  
        return {
          ...state,
          body,
          conditionList,
          selectedInput,
        };
      }

      return state;
    }
    case ADD_VARIABLE: {
      const variableName = action.payload as string;
      const { conditionItemId, element } = state.selectedInput ?? {};

      if (element) {
        const resultText = addVariableToText(element, variableName);
        const itemType = element.getAttribute(TYPE_ATTRIBUTE_NAME);

        switch(itemType) {
          case TemplateItemType.ROOT: {
            return {
              ...state,
              body: state.body.map(item => item.id === conditionItemId
                ? { ...item, text: resultText }
                : item
              ),
            };
          }
          case TemplateItemType.IF:
          case TemplateItemType.THEN_OR_ELSE: {
            return {
              ...state,
              conditionList: state.conditionList.map(item => item.id === conditionItemId
                ? { ...item, startText: resultText }
                : item
              ),
            };
          }
          case TemplateItemType.END_TEXT: {
            return {
              ...state,
              conditionList: state.conditionList.map(item => item.id === conditionItemId
                ? { ...item, endText: resultText }
                : item
              ),
            };
          }
        }
      } else {
        const textItem = state.body[0] as MessageText;

        return {
          ...state,
          body: state.body.map(item => item.id === textItem.id
            ? { ...item, text: `{${variableName}}${textItem.text}`}
            : item
          ),
        }
      }

      return state;
    }
    default: {
      return state;
    }
  }
}