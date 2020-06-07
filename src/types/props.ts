import { PersonType, SortType } from './types';

export type TableProps = {
  persons: PersonType[];
  setPersons: (data: PersonType[]) => void;
};

export type SortProps = {
  sort: SortType;
  setSort: (sort: SortType) => void;
};
