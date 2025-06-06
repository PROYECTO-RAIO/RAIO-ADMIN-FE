import Button from 'react-bootstrap/Button';
import './BasicButton.css';

function BasicButton({ className = "", active, size, href = "#", children, ...props }) {
    const sizeClass = size === 'small' ? 'btn-small' : size === 'large' ? 'btn-large' : '';
    
    return (
        <>
            <Button
                active={active}
                href={href}
                className={`btn ${className} ${sizeClass}`}
                {...props}
                >
                {children}
            </Button>
        </>
    )
}

export default BasicButton;
