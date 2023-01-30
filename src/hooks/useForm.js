import { useState, useCallback } from "react";

export function useForm() {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const input = e.target;
    const { name, value } = input;
    setValues({ ...values, [name]: value });
  };

  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
    },
    [setValues]
  );
  return { values, handleChange, resetForm };
}
