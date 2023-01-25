import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  name: string;
  label: string;
  onChange: OnChangeHandler;
  placeholder?: string;
  value?: string;
  error?: string;
  rows?: number;
}

function TextAreaInput({name, label, onChange, placeholder, value, error, rows}: Props) {
  function inputOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.name, event.target.value);
  }

  if (!rows) rows = 3;

  return (
    <Form.Group className="mb-4">
      <Form.Label htmlFor={name}>{label}</Form.Label>

      <textarea
        name={name}
        rows={rows}
        className="form-control"
        placeholder={placeholder}
        value={value ? value : ''}
        onChange={inputOnChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
}

export default TextAreaInput;
