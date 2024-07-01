import { Mapping } from 'interfaces/TableOptions';
import { MapModel } from 'utils/ModelBuilder';
import { FormFieldsOf } from 'utils/FieldBuilder';

export class ModelDefinition<M, P> {
  name?: string;
  fields: FormFieldsOf<M>;
  fieldMapping?: Mapping<M>;
  mapModel: MapModel<M, P>;
  buildPayload: (model: M, parkId: string) => P;
  relation?: Relation<M, P>;

  constructor(params: Params<M, P>) {
    this.name = params.relation[0].name;
    Object.assign(this, params);
  };
}

type Params<M, P> = {
  fields: FormFieldsOf<M>;
  mapModel: MapModel<M, P>;
  buildPayload?: (model: M, parkId: string) => P;
  relation?: Relation<M, P>;
}

type Class<T> = { 
  new (...args: any[]): T;
};

type Relation<M, P> = readonly [Class<M>, Class<P>];
