import { Card, Button } from 'react-bootstrap';
import './CategoryCard.css';

function CategoryCard({ name, onClick }) {
  return (
    <Card className="mb-3 border-0 bg-transparent">
      <Button 
        onClick={onClick} 
        className="category-card-button" 
        aria-label={`Abrir categoría ${name}`}
      >
        <Card.Text className="mb-0">{name}</Card.Text>
      </Button>
    </Card>
  );
}

export default CategoryCard;