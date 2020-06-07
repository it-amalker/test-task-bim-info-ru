import { PersonType, SortType } from './types';

export type PersonProps = {
  persons: PersonType[];
  setPersons: (data: PersonType[]) => void;
};

export type SortProps = {
  sort: SortType;
  setSort: (sort: SortType) => void;
};

export type CreatePersonProps = PersonProps & { sort: SortType };
