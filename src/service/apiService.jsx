import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

//Login logic - moved from form
export const loginAdmin = async (email, contraseña) => {
  try {
    const response = await axiosInstance.post('/admins/login', { email, contraseña });
    return response.data; 
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response?.data || error.message);
    throw error;
  }
};

export const getCategorias = async () => {
  try {
    const response = await axiosInstance.get('/categorias');
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error.response?.data || error.message);
    throw error;
  }
};

export const getCategoriaById = async (id) => {
  try {
    const response = await axiosInstance.get(`/categorias/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener categoría por ID:', error.response?.data || error.message);
    throw error;
  }
};

export const createCategoria = async (categoria) => {
  try {
    const response = await axiosInstance.post('/categorias', categoria);
    return response.data; 
  } catch (error) {
    console.error('Error al crear categoría:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCategoria = async (id, categoria) => {
  try {
    const response = await axiosInstance.put(`/categorias/${id}`, categoria);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar categoría:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteCategoria = async (id) => {
  try {
    const response = await axiosInstance.delete(`/categorias/${id}`);
    return response.status === 204;
  } catch (error) {
    console.error('Error al eliminar categoría:', error.response?.data || error.message);
    throw error;
  }
};

export default axiosInstance;