import { MapModel } from 'utils/ModelBuilder';
import { FormFieldsOf } from 'utils/FieldBuilder';

type Class = { new (...args: any[]): any };
type Build<TM, TP> = (values: TM, parkId: string) => TP;

export interface Model<TModel, TPayload> extends Class {
  modelName?: string
  fields: FormFieldsOf<TModel>;
  initial?: Partial<TModel>;
  mapModel?: MapModel<TModel, TPayload>;
  buildPayload: Build<TModel, TPayload>;
}

// TODO: use decorators
// https://stackoverflow.com/questions/13955157/how-to-define-static-property-in-typescript-interface
export interface BaseModel<TModel, TPayload> {
  fields: FormFieldsOf<TModel>;
  mapModel?: (payload: TPayload) => TModel;
  buildPayload: (values: TModel) => TPayload;
}
