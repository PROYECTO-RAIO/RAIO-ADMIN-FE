import Header from "../components/header/Header";
import CategoryForm from "../components/categoryForm/CategoryForm";

function EditCategory() {
        const ejemploData = {
tituloCategoria: 'Noticias Diarias',
  descripcionCategoria: 'Categoría para la distribución diaria de noticias',
  autorCategoria: 'Juan Pérez',
  autorEmailCategoria: 'juan.perez@example.com',
  frecuenciaCategoria: '1 día',                     
  totalLimitado: 'true',                             
  totalReverberaciones: '5',                        
  estadoDeActividad: true,
  fechaInicio: '2025-06-01',
  fechaFinal: '2025-12-31',
  listaCorreoUrl: 'https://listas.ejemplo.com/noticias',
  archivoUrl: 'https://archivos.ejemplo.com/noticias.pdf',
  demora: true,
  periodoRetraso: '15 minuto'              
        };

    return (
    <>
        <Header />
        <CategoryForm initialData={ejemploData}/>
    </>
)}

export default EditCategory;
