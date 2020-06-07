import React from 'react';

type SortType = {
  sortBy: string;
};

type FilterProps = {
  sort: SortType;
  setSort: (sort: SortType) => void;
};

const Sort: React.FC<FilterProps> = ({ sort, setSort }) => {
  const changeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort({ sortBy: e.target.value });
  };
  console.log(sort);
  return (
    <select onChange={changeFilter}>
      {sort.sortBy ? null : (
        <option value="Choose filter">Choose filter</option>
      )}
      <option value="id">ID</option>
      <option value="name">Name</option>
      <option value="age">Age</option>
    </select>
  );
};

export default Sort;
