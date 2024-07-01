import { Paging, Sorting, TableOptions } from "interfaces/TableOptions";

interface Actions {
  onCreateNew?: () => void;
}

export interface TableInstance<T = any> {
  dataSource: T[];
  pagination: Paging;
  sorting: Sorting;
  loading: boolean;
  search: string;
  options: TableOptions<T>;
  actions: Actions;
  setDataSource(value: T[]): void;
  setters: {
    setLoading(value: boolean): void;
    setPagination(value: Paging): void;
    setSorting(value: Sorting): void;
    setSearch(value: string): void;
  }
}
