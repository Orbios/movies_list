import Form from 'react-bootstrap/Form';
import Select from 'react-select';

interface Props {
  name: string;
  label: string;
  value: BasicOption[];
  onChange: OnChangeHandler;
  options: BasicOption[];
  error?: string;
}

function SelectInput({name, label, value, onChange, options, error}: Props) {
  function inputOnChange(val: any) {
    const selected = val.map((x: any) => x.value);

    onChange(name, selected);
  }

  return (
    <Form.Group className="mb-4">
      <Form.Label>{label}</Form.Label>

      <Select name={name} isMulti options={options} value={value} onChange={inputOnChange} />

      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
}

export default SelectInput;
