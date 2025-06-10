import { useNavigate, Link } from 'react-router-dom';
import CategoryCard from "../components/card/CategoryCard";
import filterIcon from '../assets/lupa.png';
import editIcon from '../assets/lapiz.png';
import './CategoryPage.css'

function CategoryPage() {
    const navigate = useNavigate();

    const categories = ['haiku', 'sonoras', 'bot'];

    const handleCategoryClick = (categoryName) => {
        navigate(`/ver/${categoryName}`);
    };

    const handleCreateClick = () => {
        navigate('/crear');
    }

    return (
        <section aria-labelledby="category-title">
            <Link to="/editar">
                <img
                    src={editIcon}
                    alt="Editar categorías"
                    className="edit-icon"
                />
            </Link>
            <img
                src={filterIcon}
                alt="Filtrar categorías"
                className="filter-icon"
            />
            <h1 className="category-title">CATEGORÍAS</h1>
            <ul className="category-container">
                <li key="create">
                    <CategoryCard
                        name="añadir categoría"
                        onClick={handleCreateClick}
                    />
                </li>
                {categories.map(category => (
                    <li key={category}>
                        <CategoryCard
                            name={category}
                            onClick={() => handleCategoryClick(category)}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default CategoryPage;