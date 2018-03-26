import React from 'react';

const FormField = ({ input, label, type, meta: {error, touched} }) => {
  return (
    <div className="field">
      <label className="field__title">{label}</label>
      <input {...input} className={'field__input'}  type={type}/>
      <div className="field__error">
        {touched && error}
      </div>
    </div>
  )
}

export default FormField;
