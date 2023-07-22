import { DEFAULT_VAR_NAMES } from 'constants/index';
import { MessageTemplate } from 'types';

const TEMPLATE = 'app_template';
const VARIABLE_NAMES = 'app_variable_names';

export function setMessageTemplate(value: MessageTemplate) {
  value.selectedInput = null;
  const result = JSON.stringify(value);
  localStorage.setItem(TEMPLATE, result);
}
export function getMessageTemplate(): MessageTemplate | null {
  const templateString = localStorage.getItem(TEMPLATE);

  return templateString ? JSON.parse(templateString) : null;
}

export function setVariables(names: string[]) {
  const result = JSON.stringify(names);
  localStorage.setItem(VARIABLE_NAMES, result);
}
export function getVariables(): string[] {
  const variables = localStorage.getItem(VARIABLE_NAMES);
  return variables
    ? JSON.parse(variables)
    : DEFAULT_VAR_NAMES;
}