import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import Table from './Table';
import Filter from './Filter';
import pesrsonsData from '../data/small_data_persons.json';

const data = pesrsonsData.map(({ ID, Name, Age }) => {
  return { id: Number(ID), name: Name, age: Number(Age) };
});

type FilterType = {
  filterBy: string;
};

type PersonType = {
  id: number;
  name: string;
  age: number;
};

const App: React.FC = () => {
  const [persons, setPersons] = useState<PersonType[]>(data);
  const [filter, setFilter] = useState<FilterType>({ filterBy: '' });

  useEffect(() => {
    if (filter) {
      const sortedPersons = sortBy(persons, filter.filterBy);
      setPersons(sortedPersons);
    }
  }, [filter]);

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Table persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
