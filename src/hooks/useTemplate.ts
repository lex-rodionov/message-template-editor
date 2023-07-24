import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ROOT_PARENT_ID, TYPE_ATTRIBUTE_NAME } from 'constants/index';
import {
  MessageTemplate,
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
const CHANGE_HEADER = 'CHANGE_HEADER';
const CHANGE_FOOTER = 'CHANGE_FOOTER';
const CHANGE_CONDITION_TEXT = 'CHANGE_CONDITION_TEXT';
const CHANGE_CONDITION_END_TEXT = 'CHANGE_CONDITION_END_TEXT';
const SET_FOCUS = 'SET_FOCUS';
const ADD_CONDITION = 'ADD_CONDITION';
const DELETE_CONDITION = 'DELETE_CONDITION';
const ADD_VARIABLE = 'ADD_VARIABLE';

export const defaultTemplate: MessageTemplate = {
  body: {
    id: uuidv4(),
    startText: '',
    condition: null,
  },
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
    changeHeader: (value: string) => {
      dispatch({
        type: CHANGE_HEADER,
        payload: value,
      });
    },
    changeFooter: (value: string) => {
      dispatch({
        type: CHANGE_FOOTER,
        payload: value,
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
    case CHANGE_HEADER: {
      return {
        ...state,
        body: {
          ...state.body,
          startText: action.payload as string,
        },
      };
    }
    case CHANGE_FOOTER: {
      return {
        ...state,
        body: {
          ...state.body,
          endText: action.payload as string,
        }
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

      if (!state.body.condition) {
        const textFields = element ? splitInputText(element) : { endText: '' };

        return {
          ...state,
          body: {
            ...state.body,
            ...textFields,
            condition,
          },
          conditionList: [
            ...state.conditionList,
            ...conditionItems,
          ]
        };
      } else if (conditionItemId && element) {
        const itemType = element.getAttribute(TYPE_ATTRIBUTE_NAME) as TemplateItemType;
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

      if (parentId === ROOT_PARENT_ID) {
        let startText = state.body.startText;
        if (state.body.endText) {
          startText += state.body.endText;
        }
        return {
          ...state,
          body: {
            ...state.body,
            startText,
            endText: undefined,
            condition: null,
          },
          conditionList: [],
          selectedInput: null,
        }
      } else {
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
          case TemplateItemType.HEADER: {
            return {
              ...state,
              body: {
                ...state.body,
                startText: resultText,
              }
            };
          }
          case TemplateItemType.FOOTER: {
            return {
              ...state,
              body: {
                ...state.body,
                endText: resultText,
              }
            };
          }
          case TemplateItemType.IF:
          case TemplateItemType.THEN_OR_ELSE: {
            return {
              ...state,
              conditionList: state.conditionList.map(item => {
                if (item.id === conditionItemId) {
                  return {
                    ...item,
                    startText: resultText,
                  };
                }
                return item;
              })
            };
          }
          case TemplateItemType.END_TEXT: {
            return {
              ...state,
              conditionList: state.conditionList.map(item => {
                if (item.id === conditionItemId) {
                  return {
                    ...item,
                    endText: resultText,
                  };
                }
                return item;
              })
            };
          }
        }
      } else {
        return {
          ...state,
          body: {
            ...state.body,
            startText: `{${variableName}}${state.body.startText}`,
          }
        }
      }

      return state;
    }
    default: {
      return state;
    }
  }
}