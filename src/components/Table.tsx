import React, { useState } from 'react';
import { sortBy } from 'lodash';
import { useForm } from 'react-hook-form';

import { CreatePersonProps } from '../types/props';
import { PersonType, CreatePersonType } from '../types/types';
import { FormData } from '../types/form';

import Form from './Form';

const Table: React.FC<CreatePersonProps> = ({ persons, setPersons, sort }) => {
  const [editingPerson, setEditingPerson] = useState<PersonType | null>(null);

  const { reset } = useForm<FormData>();

  const removePerson = (id: number) => (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    const filtered = persons.filter((p) => p.id !== id);
    setPersons(filtered);
  };

  const handleClick = (person: PersonType) => () => {
    setEditingPerson(person);
  };

  const editPerson = ({ id, name, age }: CreatePersonType) => {
    const editedPerson = { id: +id, name, age: +age };
    const newPersons = persons.map((p) => (p.id === +id ? editedPerson : p));
    if (sort) {
      const sortedPersons = sortBy(newPersons, sort.sortBy);
      setPersons(sortedPersons);
    } else {
      setPersons(newPersons);
    }
    reset();
    setEditingPerson(null);
  };

  const renderTable = (): JSX.Element => {
    return (
      <table className="persons-table">
        <caption className="persons-table-caption">Persons table</caption>
        <thead>
          <tr>
            <th className="person-id">ID</th>
            <th className="person-name">Name</th>
            <th className="person-age">Age</th>
          </tr>
        </thead>
        <tbody>
          {persons.map(({ id, name, age }) => {
            if (editingPerson && editingPerson.id === id) {
              return (
                <tr key={id}>
                  <td colSpan={3}>
                    <Form
                      persons={persons}
                      onSubmit={editPerson}
                      editingPerson={editingPerson}
                    />
                  </td>
                </tr>
              );
            }
            return (
              <tr key={id} onClick={handleClick({ id, name, age })}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td>
                  <button type="button" onClick={removePerson(id)}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot />
      </table>
    );
  };

  return <>{renderTable()}</>;
};

export default Table;
