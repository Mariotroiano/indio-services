import { OptionItem } from 'interfaces/OptionItem';
export type { OptionItem } from 'interfaces/OptionItem';

export function getOptionItems<T extends Entity>(entities: T[], field: Field<T>): OptionItem[];
export function getOptionItems<T extends Entity>(entities: T[], field: Field<T>, key: KeyOf<T>): OptionItem[];
export function getOptionItems<T extends Entity>(entities: T[], field: Field<T>, key?: KeyOf<T>): OptionItem[] {
  key = key ?? 'id';
  const optionList = entities.map<OptionItem>(x => ({ label: field(x), value: x[key] }));
  return optionList;
};

type Entity = {
  id: string,
}

type Field<T> = (value: T) => void;

type KeyOf<T> = keyof T;
