import React from 'react';
import { useForm } from 'react-hook-form';

import { FormProps } from '../types/props';
import { FormData } from '../types/form';

const Form: React.FC<FormProps> = ({ persons, onSubmit, editingPerson }) => {
  const { register, handleSubmit, errors, formState } = useForm<FormData>();

  const { isSubmitting } = formState;

  return (
    <>
      <form
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="id">
          <input
            defaultValue={editingPerson ? editingPerson.id : ''}
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
                const isUniqueId = !persons.find((p) =>
                  editingPerson
                    ? p.id === +id && p.id !== editingPerson.id
                    : p.id === +id,
                );
                return isUniqueId;
              },
            })}
          />
        </label>
        <label htmlFor="name">
          <input
            defaultValue={editingPerson ? editingPerson.name : ''}
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
            defaultValue={editingPerson ? editingPerson.age : ''}
            type="text"
            name="age"
            id="age"
            className="create-input"
            placeholder="35"
            ref={register({
              required: 'Age field is required.',
              pattern: {
                value: /^\d*(\.\d{0,4})?$/,
                message: 'Age must be a number (max 4 decimal places).',
              },
              validate: (n: string) => +n <= 1000,
            })}
          />
        </label>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          Save
        </button>
      </form>
      {errors.id && (
        <span className="error-container">{errors.id.message}</span>
      )}
      {errors.id && errors.id.type === 'validate' && (
        <span className="error-container">ID is not unique.</span>
      )}
      {errors.name && (
        <span className="error-container">{errors.name.message}</span>
      )}
      {errors.age && (
        <span className="error-container">{errors.age.message}</span>
      )}
      {errors.age && errors.age.type === 'validate' && (
        <span className="error-container">Max age 1000.</span>
      )}
    </>
  );
};

export default Form;
