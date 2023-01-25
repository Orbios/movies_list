import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  name: string;
  label: string;
  onChange: OnChangeHandler;
  value?: number;
  error?: string;
}

function NumberInput({name, label, onChange, value, error}: Props) {
  function inputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.name, event.target.value);
  }

  return (
    <Form.Group className="mb-4">
      <Form.Label htmlFor={name}>{label}</Form.Label>

      <input
        type="number"
        name={name}
        className="form-control"
        min="0"
        step="1"
        value={value ? value : 0.0}
        onChange={inputOnChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
}

export default NumberInput;
