import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategorias } from "./../../service/apiService";
import CategoryCard from "./../../components/card/CategoryCard";
import filterIcon from './../../assets/lupa.png';
import editIcon from './../../assets/lapiz.png';
import './Categories.css'

function Categories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategorias();
                setCategories(data);
            } catch (error) {
                console.error("Error loading categories:", error);
            }
        };
    
        fetchCategories();
    }, []);

    const handleCategoryClick = (id) => {
        navigate(`/editar/${id}`);
    };

    const handleCreateClick = () => {
        navigate('/crear');
    }

    return (
        <section aria-labelledby="category-title">
            <Link to="/categorias">
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
                    <li key={category.id}>
                        <CategoryCard
                        name={category.tituloCategoria}
                        onClick={() => handleCategoryClick(category.id)}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Categories;