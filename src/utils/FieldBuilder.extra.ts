import { Rule, RuleObject } from 'antd/lib/form';
import { FormFieldConf } from 'components/forms/helpers';
import { startCase } from 'lodash';

export class Field {
  name: string;
  label?: string;
  type?: string;

  static new(field: Field) {
    const instance = new this();
    Object.assign(instance, field);
    return instance;
  }

  toString() {
    return `Field (${this.label})`;
  }
}

export class FieldsDefinition {
  [x: string]: Field;

  static new<T>(fields: T) {
    const instance = new this();
    Object.assign(instance, fields);
    Object.keys(instance).forEach(key => {
      instance[key] = Field.new({
        name: key,
        label: getLabel(key),
        type: setType(instance[key]),
      });
      if (!instance[key].type) {
        delete instance[key].type;
      }
    });

    return instance as FormFieldsOf<T>;
  }
}

function getLabel(key: string): string {
  let label = startCase(key)
    .replace(/ Id$/g, '')
    .replace(/ Label$/g, '')
    .replace(/ List$/g, 's');
  return label;
}

function setType(value: any) {
  const type = typeMap.get(typeof value);
  return type;
}

const typeMap = new Map([
  ['boolean','switch'],
  ['number','number'],
  ['string','text'],
]);

export function getField<T>(key: string, fields: FormFieldsOf<T>) {
  if (isEqualAny(key, 'id')) return null;
  const instance = Field.new({ name: key, ...fields[key] }) as FormFieldConf<T>;

  if (isEqualAny(instance.type, 'currency')) {
    instance.placeholder = '$0.00';
  }
  if (isEqualAny(instance.type, 'numeric', 'fee') && !instance.placeholder) {
    instance.placeholder = '0.00';
  }
  return instance;
}

function isEqualAny<T, V extends T>(target: T, ...values: V[]): boolean {
  return values.some((value) => target === value);
}

export type FormFieldsOf<T> = {
  [P in keyof T]?: FormFieldConf<P>
};

export type FieldRules<T> = {
  [P in keyof T]?: Rule[]
}

export type FieldInfos<T> = {
  [P in keyof T]?: string
}

export type Class<T> = { new (...args: any[]): T };
export type ModelClass<T> = Class<T>;

export type { RuleObject };
