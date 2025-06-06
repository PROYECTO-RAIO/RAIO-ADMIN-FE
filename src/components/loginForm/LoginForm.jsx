import Button from '../basicButton/BasicButton';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);


  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validPassword = /^[A-Za-z0-9]{6,}$/; 

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validEmail.test(email)) {
      setEmailErr(true);
      isValid = false;
    } else {
      setEmailErr(false);
    }

    if (!validPassword.test(password)) {
      setPwdError(true);
      isValid = false;
    } else {
      setPwdError(false);
    }

    if (isValid) {
      console.log("Login exitoso");
    
    }
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-content mb-3" controlId="formBasicEmail">
          <Form.Label>email</Form.Label>
          <Form.Control
            className="email-input"
            type="email"
            placeholder="ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={emailErr}
          />
          {emailErr && <Form.Text className="text-danger">email inválido</Form.Text>}
        </Form.Group>

        <Form.Group className="form-content mb-3" controlId="formBasicPassword">
          <Form.Label>contraseña</Form.Label>
          <Form.Control
            className="password-input"
            type="password"
            placeholder="ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={pwdError}
          />
          {pwdError && <Form.Text className="text-danger">contraseña inválida (mín. 6 caracteres)</Form.Text>}
        </Form.Group>

        <Button className="btn-secondary-custom" variant="secondary" type="submit">
          login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
