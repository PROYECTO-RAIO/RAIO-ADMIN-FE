import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginForm() {
  return (
    <Form>
      <Form.Group className="mb-3-email" controlId="formBasicEmail">
        <Form.Label> email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3-password" controlId="formBasicPassword">
        <Form.Label>constraseña</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="secondary" type="submit">
        login
      </Button>
    </Form>
  );
}

export default LoginForm;