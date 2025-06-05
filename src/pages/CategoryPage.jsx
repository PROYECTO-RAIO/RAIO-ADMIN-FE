import { useNavigate } from 'react-router-dom';
import CategoryCard from "../components/card/CategoryCard";

function CategoryPage() {
    const navigate = useNavigate();

    const categories = ['haiku', 'sonoras', 'bot'];

    const handleCategoryClick = (categoryName) => {
        navigate(`/view/${categoryName}`);
    };

    return (
        <section aria-labelledby="categorias-titulo">
            <h1 id="categorias-titulo">Categorías</h1>
            <ul className="categories-container">
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