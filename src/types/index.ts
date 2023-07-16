export type ConditionBranch = {
  startText: string;
  condition?: TemplateCondition;
  endText?: string;
}

export type TemplateCondition = {
  if: string;
  then: ConditionBranch;
  else: ConditionBranch;
}