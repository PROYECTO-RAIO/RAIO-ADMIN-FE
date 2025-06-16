import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import CategoryForm from '../components/categoryForm/CategoryForm';
import { getCategoriaById } from '../service/apiService';

function EditCategory() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoria() {
      try {
        const data = await getCategoriaById(id);
        setInitialData(data);
      } catch (error) {
        console.error('Error al cargar la categoría', error);
        alert('No se pudo cargar la categoría');
      } finally {
        setLoading(false);
      }
    }

    fetchCategoria();
  }, [id]);

  if (loading) return <p>Cargando categoría...</p>;
  if (!initialData) return <p>No se encontró la categoría.</p>;

  return (
    <>
      <Header />
      <CategoryForm initialData={initialData} />
    </>
  );
}

export default EditCategory;
