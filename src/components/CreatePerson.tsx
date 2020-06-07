import React, { useState } from 'react';
import { sortBy } from 'lodash';
import { useForm } from 'react-hook-form';

import { CreatePersonProps } from '../types/props';
import { CreatePersonType } from '../types/types';
import { FormData } from '../types/form';

const CreatePerson: React.FC<CreatePersonProps> = ({
  persons,
  setPersons,
  sort,
}) => {
  const [formShow, setFormShow] = useState(false);
  const {
    register,
    handleSubmit,
    errors,
    reset,
    setError,
    formState,
  } = useForm<FormData>();

  const { isSubmitting } = formState;

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

  const renderForm = () => (
    <>
      <form
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit(createPerson)}
      >
        <label htmlFor="id">
          <input
            type="text"
            name="id"
            id="id"
            className="create-input"
            placeholder="123"
            ref={register({
              required: 'Id field is required.',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Id must be a number',
              },
              validate: (id: string) => {
                const isUniqueId = !persons.find((p) => p.id === +id);
                return isUniqueId;
              },
            })}
          />
        </label>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            className="create-input"
            placeholder="John"
            ref={register({
              required: 'Name field is required.',
              maxLength: {
                value: 100,
                message: 'Name exceed max length.',
              },
            })}
          />
        </label>
        <label htmlFor="age">
          <input
            type="text"
            name="age"
            id="age"
            className="create-input"
            placeholder="35"
            ref={register({
              required: 'Age field is required.',
              pattern: {
                value: /^\d*(\.\d{0,4})?$/,
                message: 'Age must be number (max 4 decimal places).',
              },
              validate: (n: string) => +n <= 1000,
            })}
          />
        </label>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          Create
        </button>
      </form>
      {errors.id && (
        <span className="error-container">{errors.id.message}</span>
      )}
      {errors.id && errors.id.type === 'validate' && (
        <span className="error-container">ID is not unique</span>
      )}
      {errors.name && (
        <span className="error-container">{errors.name.message}</span>
      )}
      {errors.age && (
        <span className="error-container">{errors.age.message}</span>
      )}
      {errors.age && errors.age.type === 'validate' && (
        <span className="error-container">
          Age must be a number (max 1000).
        </span>
      )}
    </>
  );

  const renderButton = () => (
    <button type="button" onClick={handleClick}>
      Create person
    </button>
  );

  return <>{formShow ? renderForm() : renderButton()}</>;
};

export default CreatePerson;
