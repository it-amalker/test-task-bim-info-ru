import React from 'react';
import data from '../data/small_data_persons.json';

type PersonType = {
  ID: string;
  Name: string;
  Age: string;
};

type TableProps = {
  persons: PersonType[];
  setPersons: (data: PersonType[]) => void;
};

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
          {persons.map(({ ID, Name, Age }) => (
            <tr key={ID}>
              <td>{ID}</td>
              <td>{Name}</td>
              <td>{Age}</td>
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
