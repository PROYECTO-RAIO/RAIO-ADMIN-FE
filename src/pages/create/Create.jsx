import CategoriaForm from '../../components/categoryForm/CategoryForm';
import BackButton from "./../../components/backButton/BackButton";
import './Create.css';

function Create() {
    return(
        <>
        <BackButton />
        <h1>NUEVA CATEGORÍA</h1>
        <CategoriaForm />
        </>
    )
}

export default Create;