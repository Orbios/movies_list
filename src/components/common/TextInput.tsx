import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  name: string;
  label: string;
  onChange: OnChangeHandler;
  placeholder?: string;
  value?: string;
  error?: string;
  type?: string;
  disabled?: boolean;
}

function TextInput({name, label, onChange, placeholder, value, error, type, disabled}: Props) {
  const inputType = type ? type : 'text';

  function inputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.name, event.target.value);
  }

  return (
    <Form.Group className="mb-4">
      <Form.Label htmlFor={name}>{label}</Form.Label>

      <input
        type={inputType}
        name={name}
        className="form-control"
        placeholder={placeholder}
        disabled={disabled}
        value={value ? value : ''}
        onChange={inputOnChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
}

export default TextInput;
