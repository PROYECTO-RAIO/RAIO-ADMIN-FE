import Button from 'react-bootstrap/Button';
import './BasicButton.css';

function BasicButton({ className = "", active, size, href, children, ...props }) {
  const sizeClass = size === 'small' ? 'btn-small' : size === 'large' ? 'btn-large' : '';

  return (
    <Button
      active={active}
      className={`btn ${className} ${sizeClass}`}
      {...(href ? { href } : {})} 
      {...props}
    >
      {children}
    </Button>
  );
}

export default BasicButton;
