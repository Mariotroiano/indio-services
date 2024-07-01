import { OptionItem } from 'interfaces/OptionItem';

export const buildOptionItems = getOverloads((...args: any[]) => {
  const { array, trueLabel, falseLabel } = getArgs(...args);
  const result = Array.isArray(array) ? fromArray(array) : boolItems(trueLabel, falseLabel);
  return result;
});

function getOverloads(func: Function) {
  function buildOptionItems(array: number[]): OptionItem[];
  function buildOptionItems(array: string[]): OptionItem[];
  function buildOptionItems(trueLabel: string, falseLabel: string): OptionItem[];
  function buildOptionItems(...args: any[]) {
    return func(...args);
  }
  return buildOptionItems;
}

function getArgs(...args: any[]) {
  const [arg1, arg2] = args;
  let array: string[], trueLabel: string, falseLabel: string;

  if (Array.isArray(arg1)) {
    array = arg1.map(item => item.toString());
  }
  else {
    trueLabel = arg1;
    falseLabel = arg2;
  }
  return { array, trueLabel, falseLabel };
}

function fromArray(array: string[]) {
  const optionList = array.map<OptionItem>(item => (
    { label: startCase(item), value: item }
  ));
  return optionList;
}

function boolItems(trueLabel: string, falseLabel: string) {
  const optionList: OptionItem[] = [
    { label: trueLabel, value: true },
    { label: falseLabel, value: false },
  ];
  return optionList;
}

function startCase(value: string) {
  const result = value.replace(/_/g, ' ').replace(/^\w|\s\w/g, letter => letter.toUpperCase());
  return result;
}
