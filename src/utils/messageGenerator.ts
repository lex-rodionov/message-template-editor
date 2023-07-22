import { MessageTemplate, TemplateCondition } from 'types';

class MessageGenerator {
  constructor(
    private template: MessageTemplate,
    private values: { [name: string]: string},
  ) {}

  public generate() {
    let message = '';

    const headerText = this.replaceVariables(this.template.header);
    if (headerText) {
      message += headerText + '\n';
    }

    if (this.template.body) {
      message += this.parseCondition(this.template.body);
    }

    const footerText = this.replaceVariables(this.template.footer);
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
    const matches = result.match(/\{\w+\}/giu);

    if (matches) {
      for (const match of matches) {
        const replaceValue = this.values[match.slice(1, -1)];
        result = result.replace(match, replaceValue ?? '');
      }
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

