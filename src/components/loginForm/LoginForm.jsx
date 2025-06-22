import Button from '../basicButton/BasicButton';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../service/apiService';
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const navigate = useNavigate();

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validPassword = /^[A-Za-z0-9]{6,}$/; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validEmail.test(email)) {
      setEmailErr(true);
      isValid = false;
    } else {
      setEmailErr(false);
    }

    if (!validPassword.test(contraseña)) {
      setPwdError(true);
      isValid = false;
    } else {
      setPwdError(false);
    }

    if (isValid) {
      try {
        const response = await loginAdmin(email, contraseña);
        console.log("Respuesta del servidor:", response);
          setMessage("Inicio de sesión exitoso.\n¡Bienvenide!\nTe redirigmos en 3 segundos.");
          setMessageType('success');
            setTimeout(() => {
            navigate('/categorias');
            }, 3000);
      } catch (error) {
        console.error("Error:", error);
          setMessage("Error al iniciar sesión. Verifica tus credenciales e intenta de nuevo.");
          setMessageType('error');
      }
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
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            isInvalid={pwdError}
          />
          {pwdError && <Form.Text className="text-danger">contraseña inválida (mín. 6 caracteres)</Form.Text>}
        </Form.Group>

        <Button className="btn-secondary-custom" variant="secondary" type="submit">
          login
        </Button>
        {message && (
        <div className={`ux-message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
          <span style={{ whiteSpace: 'pre-line' }}>{message}</span>
            <button
              className="btn-close-message"
              onClick={() => setMessage('')}
              aria-label="Cerrar mensaje"
              >
              ✖
            </button>
        </div>
        )}
      </Form>
    </div>
  );
}

export default LoginForm;
