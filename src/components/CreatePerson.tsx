import React, { useState } from 'react';
import { sortBy } from 'lodash';
import { useForm } from 'react-hook-form';

import Form from './Form';

import { CreatePersonProps } from '../types/props';
import { CreatePersonType } from '../types/types';
import { FormData } from '../types/form';

const CreatePerson: React.FC<CreatePersonProps> = ({
  persons,
  setPersons,
  sort,
}) => {
  const [formShow, setFormShow] = useState(false);
  const { reset } = useForm<FormData>();

  const handleClick = () => {
    setFormShow(true);
  };

  const createPerson = ({ id, name, age }: CreatePersonType) => {
    const newPersons = [...persons, { id: +id, name, age: +age }];
    if (sort) {
      const sortedPersons = sortBy(newPersons, sort.sortBy);
      setPersons(sortedPersons);
    } else {
      setPersons(newPersons);
    }
    reset();
    setFormShow(false);
  };

  const renderForm = () => <Form persons={persons} onSubmit={createPerson} />;

  const renderButton = () => (
    <button type="button" onClick={handleClick}>
      Create person
    </button>
  );

  return <>{formShow ? renderForm() : renderButton()}</>;
};

export default CreatePerson;
