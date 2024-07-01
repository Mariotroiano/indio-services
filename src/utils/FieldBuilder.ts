import { Rule } from 'antd/lib/form';
import type { FieldInfos, FieldRules, FormFieldsOf, ModelClass, RuleObject } from './FieldBuilder.extra';
import { FieldsDefinition, getField } from './FieldBuilder.extra';
import { upperFirst } from 'lodash';
import { OptionItem } from './getOptionItems';

type NativeTypes = 'email' | 'hidden' | 'number' | 'password' | 'tel' | 'text';
type SpecialTypes = 'image' | 'icon' | 'upload' | 'switch';
type NumericTypes = 'numeric' | 'currency' | 'percent' | 'fee';
type InputTypes = NativeTypes | SpecialTypes | NumericTypes | 'time' | 'date' | 'textarea' | 'html';
type SelectTypes = 'radios' | 'checkboxes' | 'multiple' | 'searchable' | 'tags';
type FieldTypes = InputTypes | SelectTypes;
export type { InputTypes, SelectTypes };


export type FormFieldConf<N = string> = {
  name?: N,
  label: string,
  placeholder?: string,
  disabled?: boolean,
  help?: string,
  type?: FieldTypes,
  rules?: Rule[],
  options?: OptionItem[],
  info?: string,
};

export class FieldBuilder<M> {
  private fields: FormFieldsOf<M>;
  private modelName: string;
  private constructor() {}

  static fieldsForModel<T>(model: ModelClass<T>) {
    const builder = new this<T>();
    builder.modelName = model.name;
    builder.fields = FieldsDefinition.new(new model());
    return builder;
  }

  static fieldsFrom<T>(fields: FormFieldsOf<T>) {
    const builder = new this<T>();
    builder.fields = FieldsDefinition.new(fields);
    builder.setFields(fields);
    return builder;
  }

  static fieldsFromSample<T>(sample: T) {
    const builder = new this<T>();
    builder.fields = FieldsDefinition.new(sample);
    return builder;
  }

  setFields(fields: FormFieldsOf<M>) {
    if (!fields) return this;
    const keys = Object.keys(fields);
    for (const key of keys) {
      const field = this.fields[key];
      Object.assign(field, getField(key, fields));
    }
    return this;
  }

  addFields<T extends FormFieldsOf<M>>(fields: T, prefix?: string) {
    const keys = Object.keys(fields).filter(f => f !== 'id');
    for (const key of keys) {
      const prefixedKey = prefix ? prefix + upperFirst(key) : key;
      this.fields[prefixedKey] = getField(key, fields);
      this.fields[prefixedKey].name = prefixedKey;
    }
    return this;
  }

  setRules(rules: FieldRules<M>) {
    const keys = Object.keys(rules);
    for (const key of keys) {
      const field = this.fields[key] as FormFieldConf;
      const ruleList = rules[key] as RuleObject[];
      field.rules = ruleList.map(rule => {
        let message = rule.required && (rule.message || `${field.label} is required`);
        return { ...rule, message };
      });
    }
    return this;
  }

  setInfos(infos: FieldInfos<M>) {
    const keys = Object.keys(infos);
    for (const key of keys) {
      const field = this.fields[key] as FormFieldConf;
      field.info = infos[key];
    }
    return this;
  }

  build() {
    const result = this.fields as FormFieldsOf<M>;
    return result;
  }

  private get raw() {
    const keys = Object.keys(this.fields);
    let entries = [];
    for (const key of keys) {
      const field = this.fields[key];
      const numKey = String(keys.indexOf(key) + 100).slice(1) + `: ${key}`;
      const values = [field.name, field.label].join(' | ');
      entries.push([numKey, values]);
    }
    return Object.fromEntries(entries);
  }
}

export type { FormFieldsOf };
