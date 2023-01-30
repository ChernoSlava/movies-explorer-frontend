import { useState, useCallback } from "react";

export function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const input = e.target;
    const { name, value } = input;

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
