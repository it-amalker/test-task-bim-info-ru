import React, { useState } from 'react';
import { sortBy } from 'lodash';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { CreatePersonProps } from '../types/props';
import { CreatePersonType } from '../types/types';
import { FormData } from '../types/form';

const ValidationSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().max(100).required(),
  age: yup.number().max(1000).required(),
});

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
  } = useForm<FormData>({ validationSchema: ValidationSchema });

  const { isSubmitting } = formState;

  const handleClick = () => {
    setFormShow(true);
  };

  const createPerson = ({ id, name, age }: CreatePersonType) => {
    const isUniqueId = persons.find((p) => p.id === +id);
    if (isUniqueId) {
      setError('id', 'notUniqueId', 'ID is not unique');
    } else {
      const newPersons = [...persons, { id: +id, name, age: +age }];
      if (sort) {
        const sortedPersons = sortBy(newPersons, sort.sortBy);
        setPersons(sortedPersons);
      } else {
        setPersons(newPersons);
      }
      reset();
      setFormShow(false);
    }
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
            ref={register}
          />
        </label>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            className="create-input"
            placeholder="John"
            ref={register}
          />
        </label>
        <label htmlFor="age">
          <input
            type="text"
            name="age"
            id="age"
            className="create-input"
            placeholder="35.0001"
            ref={register}
            pattern="^\d*(\.\d{0,4})?$"
          />
        </label>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          Create
        </button>
      </form>
      {errors.id && errors.id.type === 'notUniqueId' && (
        <span className="error-container">{errors.id.message}</span>
      )}
      {errors.name && (
        <span className="error-container">{errors.name.message}</span>
      )}
      {errors.age && (
        <span className="error-container">{errors.age.message}</span>
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
