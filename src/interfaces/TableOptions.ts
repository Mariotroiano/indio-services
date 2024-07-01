export interface Paging {
  current: number,
  pageSize: number,
  total?: number,
}

export interface Sorting {
  field: string,
  order: string,
}

export type Mapping<T> = {
  [P in keyof T]?: string;
}

export interface TableOptions<T> {
  fieldMapping?: Mapping<T>;
  pageSize?: number;
  showSearch?: boolean;
}
