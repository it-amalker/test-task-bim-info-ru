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
    const newPersons = persons.map((p) =>
      p.id === editingPerson!.id ? editedPerson : p,
    );

    console.log('newPersons ', newPersons);
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
      <div className="table-container">
        <table className="persons-table">
          <thead>
            <tr className="caption-row">
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {persons.map(({ id, name, age }) => {
              if (editingPerson && editingPerson.id === id) {
                return (
                  <tr key={id}>
                    <td colSpan={4}>
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
                <tr
                  className="table-row"
                  key={id}
                  onClick={handleClick({ id, name, age })}
                >
                  <td className="table-id">{id}</td>
                  <td className="table-name">{name}</td>
                  <td className="table-age">{age}</td>
                  <td className="table-remove">
                    <button
                      className="remove-btn"
                      type="button"
                      onClick={removePerson(id)}
                    >
                      &#10008;
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot />
        </table>
      </div>
    );
  };

  return <>{renderTable()}</>;
};

export default Table;
