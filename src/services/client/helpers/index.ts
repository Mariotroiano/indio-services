import { ClassConstructor } from '../Types';
import { UrlBuilder } from './UrlBuilder';
import { FilterAdapter } from './FilterAdapter';

export * from './logging';
export const buildUrl = UrlBuilder.build;
export const adaptFilter = FilterAdapter.adapt;

export function plainToInstance<T, V>(cls: ClassConstructor<T>, plain: V[]): T[];
export function plainToInstance<T, V>(cls: ClassConstructor<T>, plain: V): T;
export function plainToInstance(_: any, data: any) {
  return data;
}
