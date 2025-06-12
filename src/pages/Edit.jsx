import { useNavigate, Link } from 'react-router-dom';
import Header from "../components/header/Header";
import CategoryCard from "../components/card/CategoryCard";

function Edit() {
    const categories = ['haiku', 'sonoras', 'bot'];
    const navigate = useNavigate();
    const handleCategoryClick = (categoryName) => {
        navigate(`/editar/${categoryName}`);
    };

    return(
        <>
        <Header />
        <ul className="category-container">
                {categories.map(category => (
                    <li key={category}>
                        <CategoryCard
                            name={category}
                            onClick={() => handleCategoryClick(category)}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Edit;