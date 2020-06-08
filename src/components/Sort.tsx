import React from 'react';
import { SortProps } from '../types/props';

const Sort: React.FC<SortProps> = ({ sort, setSort }) => {
  const changeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort({ sortBy: e.target.value });
  };

  return (
    <div className="sort-container">
      <span className="sort-name">Sort by:</span>
      <form>
        <select className="sort-select" onChange={changeFilter}>
          {sort.sortBy ? null : (
            <option value="Choose filter">Choose sort</option>
          )}
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
      </form>
    </div>
  );
};

export default Sort;
