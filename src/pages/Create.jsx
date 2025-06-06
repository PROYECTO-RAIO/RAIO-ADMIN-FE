import CategoriaForm from '../components/categoryForm/CategoryForm';
import './Create.css';


import BackButton from "../components/backButton/BackButton"; 

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