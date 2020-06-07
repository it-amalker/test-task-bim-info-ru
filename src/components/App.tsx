import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import Table from './Table';
import Sort from './Sort';
import pesrsonsData from '../data/small_data_persons.json';

const data = pesrsonsData.map(({ ID, Name, Age }) => {
  return { id: Number(ID), name: Name, age: Number(Age) };
});

type SortType = {
  sortBy: string;
};

type PersonType = {
  id: number;
  name: string;
  age: number;
};

const App: React.FC = () => {
  const [persons, setPersons] = useState<PersonType[]>(data);
  const [sort, setSort] = useState<SortType>({ sortBy: '' });

  useEffect(() => {
    if (sort) {
      const sortedPersons = sortBy(persons, sort.sortBy);
      setPersons(sortedPersons);
    }
  }, [sort]);

  return (
    <div>
      <Sort sort={sort} setSort={setSort} />
      <Table persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
