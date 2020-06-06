import React, { useState } from 'react';
import Table from './Table';
import Filter from './Filter';
import data from '../data/small_data_persons.json';

type FilterType = {
  filterBy: string;
};

const App: React.FC = () => {
  const [persons, setPersons] = useState(data);
  const [filter, setFilter] = useState<FilterType>({ filterBy: '' });
  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Table persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
