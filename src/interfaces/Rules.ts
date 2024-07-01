
export class RuleResult {
  ruleId: string;
  ruleName: string;
  success: boolean;
}

export class RuleError extends RuleResult {
  error: string;
  errorDetail: string;
}

export class CalculationResult extends RuleResult {
  label: string;
  memo: string;
  amount: number;
}
