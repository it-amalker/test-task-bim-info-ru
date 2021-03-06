import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import Table from './Table';
import Sort from './Sort';
import pesrsonsData from '../data/big_data_persons.json';
import { SortType, PersonType } from '../types/types';
import CreatePerson from './CreatePerson';

const data = pesrsonsData.map(({ ID, Name, Age }) => {
  return { id: Number(ID), name: Name, age: Number(Age) };
});

const App: React.FC = () => {
  const [persons, setPersons] = useState<PersonType[]>(data);
  const [sort, setSort] = useState<SortType>({ sortBy: '' });

  useEffect(() => {
    if (sort) {
      setPersons((p) => sortBy(p, sort.sortBy));
    }
  }, [sort]);

  return (
    <div className="app-container">
      <Sort sort={sort} setSort={setSort} />
      <CreatePerson persons={persons} setPersons={setPersons} sort={sort} />
      <Table persons={persons} setPersons={setPersons} sort={sort} />
    </div>
  );
};

export default App;
