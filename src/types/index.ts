export enum TemplateItemType {
  IF = 'if',
  THEN_OR_ELSE = 'then_or_else',
  END_TEXT = 'end_text',
  ROOT = 'root',
}

export enum MessageBodyType {
  TEXT = 'text',
  CONDITION = 'condition',
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

export type MessageText = {
  id: string;
  type: MessageBodyType;
  text: string;
}

export type MessageCondition = {
  id: string;
  type: MessageBodyType;
  condition: TemplateCondition;
}

export type MessageBody = Array<MessageText | MessageCondition>;

export type MessageTemplate = {
  body: MessageBody;
  conditionList: ConditionItem[];
  selectedInput: SelectedInput | null;
}