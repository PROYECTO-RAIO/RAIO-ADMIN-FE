import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/categorias';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getCategorias = async () => {
  try {
    const response = await axiosInstance.get('');
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error.response?.data || error.message);
    throw error;
  }
};

export const getCategoriaById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener categoría por ID:', error.response?.data || error.message);
    throw error;
  }
};

export const createCategoria = async (categoria) => {
  try {
    const response = await axiosInstance.post('/', categoria);
    return response.data; 
  } catch (error) {
    console.error('Error al crear categoría:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCategoria = async (id, categoria) => {
  try {
    const response = await axiosInstance.put(`/${id}`, categoria);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar categoría:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteCategoria = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.status === 204;
  } catch (error) {
    console.error('Error al eliminar categoría:', error.response?.data || error.message);
    throw error;
  }
};
