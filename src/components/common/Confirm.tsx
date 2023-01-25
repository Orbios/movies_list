import {Modal, Button} from 'react-bootstrap';

interface Props {
  title?: string;
  text?: string;
  visible?: boolean;
  action: () => void;
  close: () => void;
}

function Confirm({title, text, visible, action, close}: Props) {
  const displayTitle = title ? title : 'Confirmation';
  const displayMessage = text ? text : 'Are you sure?';

  return (
    <Modal show={visible} backdrop="static" onHide={close}>
      <Modal.Header closeButton>{displayTitle}</Modal.Header>
      <Modal.Body>
        <h4>{displayMessage}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          No
        </Button>
        <Button variant="danger" onClick={action}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Confirm;
