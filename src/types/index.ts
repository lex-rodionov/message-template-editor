export enum TemplateItemType {
  IF = 'if',
  THEN_OR_ELSE = 'then_or_else',
  END_TEXT = 'end_text',
  HEADER = 'header',
  FOOTER = 'footer',
}

export type ConditionItem = {
  id: string;
  startText: string;
  condition: TemplateCondition | null;
  endText?: string;
}

export type TemplateCondition = {
  ifId: string;
  thenId: string;
  elseId: string;
}

export type SelectedInput = {
  element: HTMLTextAreaElement;
  conditionItemId: string;
}

export type MessageTemplate = {
  body: ConditionItem;
  conditionList: ConditionItem[];
  selectedInput: SelectedInput | null;
}