import { useNavigate } from 'react-router-dom';
import CategoryCard from "../components/card/CategoryCard";
import filterIcon from '../assets/lupa.png'

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