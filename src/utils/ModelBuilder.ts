import { Factory } from './Factory';
import { FieldBuilder, FormFieldsOf } from './FieldBuilder';
import { Class } from './FieldBuilder.extra';
import { setZeroTimeout } from './setZeroTimeout';
import { isArray, transform, isObject, snakeCase } from 'lodash';

export type MapModel<TModel,TPayload> = {
  (input: TPayload): TModel;
  (input: TPayload[]): TModel[];
}

export default class ModelBuilder {
  static buildFields<T>(model: Class<T>, fields?: FormFieldsOf<T>) {
    const builder = FieldBuilder.fieldsForModel(model);
    builder.setFields(fields);
    return builder;
  }

  static createModel<TM, TP>(model: Class<TM>, payload: Class<TP>) {
    const _this = this;
    const modelDefinition = class Model {
      static fields = _this.buildFields(model).build();
      static mapModel = _this.buildMapModel<TM, TP>(payload => {
        const item = Factory.create(model, payload as any);
        return item;
      });
    }
    return modelDefinition;
  }

  static buildMapModel<TModel,TPayload>(mapItem: (payload: TPayload) => TModel) {
    const mapModel = (input: TPayload[] | TPayload) => {
      if (!input) return null;
      const output = Array.isArray(input) ? input.map<TModel>(mapItem) : mapItem(input);
      return output;
    };
    return mapModel as MapModel<TModel,TPayload>;
  }

  static Field = FieldBuilder;
}

class EmptyModel {};

export function setModel<T>(that: any, getModel: () => T) {
  setZeroTimeout(() => {
    that.Model = getModel();
  });
  const empty = new EmptyModel();
  return empty as T;
};

export const toSnakeCase  = (obj: any) => {
  const result = transform(obj, (result: any, value: unknown, key: string, target) => {
    const camelKey = isArray(target) ? key : snakeCase(key).replace(/_(\d)/, '$1');
    result[camelKey] = isObject(value) ? toSnakeCase(value) : value;
  });
  return result;
};
