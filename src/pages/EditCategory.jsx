import Header from "../components/header/Header";
import CategoryForm from "../components/categoryForm/CategoryForm";

function EditCategory() {
        const ejemploData = {
        nombre: 'Noticias Diarias',
        descripcion: 'Categoría para la distribución diaria de noticias',
        autor: 'Juan Pérez',
        email_autor: 'juan.perez@example.com',
        frecuencia_num: 1,
        frecuencia_unidad: 'día',
        limitado: true,
        total_reverberaciones: 5,
        activo: true,
        fecha_inicio: '2025-06-01',
        fecha_final: '2025-12-31',
        lista_correo_url: 'https://listas.ejemplo.com/noticias',
        archivo_url: 'https://archivos.ejemplo.com/noticias.pdf',
        demora: true,
        periodo_retraso_num: 15,
        periodo_retraso_unidad: 'minuto'
        };

    return (
    <>
        <Header />
        <CategoryForm initialData={ejemploData}/>
    </>
)}

export default EditCategory;
