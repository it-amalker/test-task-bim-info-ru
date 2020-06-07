import React from 'react';
import { PersonProps } from '../types/props';

const Table: React.FC<PersonProps> = ({ persons, setPersons }) => {
  const removePerson = (id: number) => () => {
    const filtered = persons.filter((p) => p.id !== id);
    setPersons(filtered);
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
          {persons.map(({ id, name, age }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>
                <button type="button" onClick={removePerson(id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot />
      </table>
    );
  };

  return <>{renderTable()}</>;
};

export default Table;
