import React from 'react';
import { TableProps } from '../types/props';

const Table: React.FC<TableProps> = ({ persons, setPersons }) => {
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
