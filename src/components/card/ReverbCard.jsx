import { Card, Button } from 'react-bootstrap';
import './ReverbCard.css';

function ReverbCard({ text, onClick }){
    return(
        <>
            <Card className="mb-3 border-0 bg-transparent">
                <Button 
                    onClick={onClick} 
                    className="reverb-card-button" 
                    aria-label={`Abrir reverberación ${text}`}
                    >
                    <Card.Text className="mb-0">{text}</Card.Text>
                </Button>
            </Card>
        </>
    )
}

export default ReverbCard;