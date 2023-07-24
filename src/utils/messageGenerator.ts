import { getVariables } from 'services/storage';
import { MessageTemplate, TemplateCondition } from 'types';

class MessageGenerator {
  private keys: string[] = [];

  constructor(
    private template: MessageTemplate,
    private values: { [name: string]: string},
  ) {
    this.keys = getVariables();
  }

  public generate() {
    let message = '';

    const {
      startText,
      endText,
      condition: rootCondition,
    } = this.template.body;

    const headerText = this.replaceVariables(startText);
    if (headerText) {
      message += headerText + '\n';
    }

    if (rootCondition) {
      message += this.parseCondition(rootCondition);
    }

    const footerText = this.replaceVariables(endText);
    if (footerText) {
      message += footerText;
    }

    return message;
  }

  private parseCondition(conditon: TemplateCondition) {
    const { ifId, thenId, elseId } = conditon;
    let result = '';

    const ifItem = this.getConditionItem(ifId);
    const ifText = this.replaceVariables(ifItem?.startText);

    if (ifText) {
      result += this.parseConditionItem(thenId);
    } else {
      result += this.parseConditionItem(elseId);
    }

    return result;
  }

  private replaceVariables(text?: string) {
    if (!text) return '';

    let result = text;
    const keys = this.keys.join('|');

    for (const key of this.keys) {
      result = result.replaceAll(`{${key}}`, this.values[key] ?? '');
    }

    return result;
  }

  private parseConditionItem(itemId: string) {
    let result = '';

    const conditionItem = this.getConditionItem(itemId);
    result += this.replaceVariables(conditionItem?.startText);

    if (conditionItem?.condition) {
      result += this.parseCondition(conditionItem?.condition);
    }

    result += this.replaceVariables(conditionItem?.endText);

    return result;
  }

  private getConditionItem(itemId: string) {
    return this.template.conditionList.find(
      item => item.id === itemId
    );
  }
}

export function generateMessage(
  template: MessageTemplate,
  values: { [name: string]: string},
): string {
  const messageGenerator = new MessageGenerator(
    template,
    values,
  );

  return messageGenerator.generate();
}

