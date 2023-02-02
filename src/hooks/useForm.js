import { useState, useCallback } from "react";

import isEmail from 'validator/es/lib/isEmail';

export function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});



  const handleChange = (e) => {
    const input = e.target;
    const { name, value } = input;

    if (name === 'email') {
      if (!isEmail(value)) {
          input.setCustomValidity('Указана некорректная почта');
      }
    }
    
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}) => {
      setValues(newValues);
      setErrors(newErrors);
    },
    [setValues, setErrors]
  );
  return { values, handleChange, resetForm, errors };
}
