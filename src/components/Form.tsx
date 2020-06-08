import React from 'react';
import { useForm } from 'react-hook-form';

import { FormProps } from '../types/props';
import { FormData } from '../types/form';

const Form: React.FC<FormProps> = ({ persons, onSubmit, editingPerson }) => {
  const { register, handleSubmit, errors, formState } = useForm<FormData>();

  const { isSubmitting } = formState;

  return (
    <>
      <div className="form-container">
        <form
          className="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            defaultValue={editingPerson ? editingPerson.id : ''}
            type="text"
            name="id"
            id="id"
            className="form-input form-input-id"
            placeholder="123"
            ref={register({
              required: 'Id field is required',
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
          <input
            defaultValue={editingPerson ? editingPerson.name : ''}
            type="text"
            name="name"
            id="name"
            className="form-input form-input-name"
            placeholder="John"
            ref={register({
              required: 'Name field is required',
              maxLength: {
                value: 100,
                message: 'Name exceed max length',
              },
            })}
          />
          <input
            defaultValue={editingPerson ? editingPerson.age : ''}
            type="text"
            name="age"
            id="age"
            className="form-input form-input-age"
            placeholder="35"
            ref={register({
              required: 'Age field is required.',
              pattern: {
                value: /^\d*(\.\d{0,4})?$/,
                message: 'Age must be a number (max 4 decimal places)',
              },
              validate: (n: string) => +n <= 1000,
            })}
          />
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            Save
          </button>
        </form>
      </div>
      <div className="errors">
        {errors.id && (
          <div className="error-container">{errors.id.message}</div>
        )}
        {errors.id && errors.id.type === 'validate' && (
          <div className="error-container">ID is not unique</div>
        )}
        {errors.name && (
          <div className="error-container">{errors.name.message}</div>
        )}
        {errors.age && (
          <div className="error-container">{errors.age.message}</div>
        )}
        {errors.age && errors.age.type === 'validate' && (
          <div className="error-container">Max age 1000</div>
        )}
      </div>
    </>
  );
};

export default Form;
