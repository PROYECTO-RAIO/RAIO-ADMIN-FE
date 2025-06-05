import Button from 'react-bootstrap/Button';

function BasicButton({ className = "", active, href = "#", children, ...props }) {
    return(
        <>
            <Button
                active={active}
                href={href}
                className={`btn ${className}`}
                {...props}
                >
                {children}
            </Button>
        </>
    )
}

export default BasicButton;
