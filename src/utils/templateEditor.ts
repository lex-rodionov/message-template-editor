import { v4 as uuidv4 } from 'uuid';
import {
  ConditionItem,
  TemplateCondition,
  TemplateItemType,
} from 'types';


export function createNewCondition() {
  const condition = {
    ifId: uuidv4(),
    thenId: uuidv4(),
    elseId: uuidv4(),
  };

  const conditionItems = [
    {
      id: condition.ifId,
      startText: '',
      condition: null,
    },
    {
      id: condition.thenId,
      startText: '',
      condition: null,
    },
    {
      id: condition.elseId,
      startText: '',
      condition: null,
    }
  ]

  return { condition, conditionItems }
}

export function deleteNestedCondition(
  conditionList: ConditionItem[],
  idsToDelete: string[],
  conditionId: string,
) {
  return conditionList.filter(
    item => !idsToDelete.includes(item.id)
  ).map(item => {
    if (item.id === conditionId) {
      let startText = item.startText;

      if (item.endText) {
        startText += item.endText;
      }

      return {
        ...item,
        startText,
        endText: '',
        condition: null,
      }
    }

    return item;
  });
}

export function getNestedItemIds(
  condition: TemplateCondition | null,
  conditionList: ConditionItem[],
) {
  if (!condition) return [];

  const toDelete: string[] = [];

  for (const id of Object.values(condition)) {
    toDelete.push(id);
  }

  const checkNode = (conditionId: string): string[] => {
    const conditionItem = conditionList.find(
      item => item.id === conditionId
    );

    if (conditionItem?.condition) {
      return getNestedItemIds(
        conditionItem.condition,
        conditionList,
      )
    }

    return [];
  }

  const nestedThen = checkNode(condition.thenId);
  const nestedElse = checkNode(condition.elseId);

  return [
    ...toDelete,
    ...nestedThen,
    ...nestedElse,
  ]
}

export function splitInputText(
  input?: HTMLTextAreaElement,
) {
  if (!input) {
    return {
      startText: '',
      endText: '',
    }
  }

  const positionIndex = input.selectionStart;

  return {
    startText: input.value.slice(0, positionIndex),
    endText: input.value.slice(positionIndex),
  }
}

export function addVariableToText(
  input: HTMLTextAreaElement,
  variableName: string,
) {
  const {startText, endText} = splitInputText(input);
  return `${startText}{${variableName}}${endText}`;
}

export function getChangeConditionText(
  id: string,
  text: string,
  position: 'startText' | 'endText',
) {
  return (item: ConditionItem) => {
    if (item.id === id) {
      return { ...item, [position]: text }
    }

    return item;
  }
}

export function canAddCondition(
  item: ConditionItem,
  conditionId: string,
  itemType: TemplateItemType,
) {
  return (
    item.id === conditionId &&
    !item.condition &&
    itemType === TemplateItemType.THEN_OR_ELSE
  )
}