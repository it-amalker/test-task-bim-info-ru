import React from 'react';

type FilterType = {
  filterBy: string;
};

type FilterProps = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  const changeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ filterBy: e.target.value });
  };
  console.log(filter);
  return (
    <select onChange={changeFilter}>
      {filter.filterBy ? null : (
        <option value="Choose filter">Choose filter</option>
      )}
      <option value="ID">ID</option>
      <option value="Name">Name</option>
      <option value="Age">Age</option>
    </select>
  );
};

export default Filter;
