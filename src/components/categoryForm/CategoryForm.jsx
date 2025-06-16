import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Alert, Spinner } from 'react-bootstrap';
import BasicButton from '../basicButton/BasicButton';
import { createCategoria, updateCategoria, deleteCategoria } from '../../service/apiService';
import './CategoryForm.css';

const defaultData = {
  tituloCategoria: '',
  descripcionCategoria: '',
  autorCategoria: '',
  autorEmailCategoria: '',
  frecuenciaCategoria: '',
  totalLimitado: 'false',
  totalReverberaciones: '0',
  estadoDeActividad: true,
  fechaInicio: '',
  fechaFinal: '',
  listaCorreoUrl: '',
  archivoUrl: '',
  demora: false,
  periodoRetraso: ''
};

function CategoriaForm({ initialData = null }) {
  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isEditMode = !!initialData?.id;

  const [frecuenciaNum, setFrecuenciaNum] = useState('1');
  const [frecuenciaUnidad, setFrecuenciaUnidad] = useState('hora');
  const [retrasoNum, setRetrasoNum] = useState('0');
  const [retrasoUnidad, setRetrasoUnidad] = useState('minuto');

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultData, ...initialData });

      const [freqNum = '1', freqUnit = 'hora'] = initialData.frecuenciaCategoria?.split(' ') || [];
      const [retNum = '0', retUnit = 'minuto'] = initialData.periodoRetraso?.split(' ') || [];

      setFrecuenciaNum(freqNum);
      setFrecuenciaUnidad(freqUnit);
      setRetrasoNum(retNum);
      setRetrasoUnidad(retUnit);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'totalLimitado') {
      setFormData((prev) => ({ ...prev, totalLimitado: checked ? 'true' : 'false' }));
    } else if (name === 'estadoDeActividad') {
      setFormData((prev) => ({ ...prev, estadoDeActividad: value === 'true' }));
    } else if (name === 'demora') {
      setFormData((prev) => ({ ...prev, demora: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.tituloCategoria.trim()) newErrors.tituloCategoria = 'El nombre es obligatorio';
    if (!formData.autorEmailCategoria.match(/^\S+@\S+\.\S+$/)) newErrors.autorEmailCategoria = 'Email no válido';
    if (Number(formData.totalReverberaciones) < 0) newErrors.totalReverberaciones = 'Debe ser mayor o igual a 0';
    if (formData.fechaInicio && isNaN(new Date(formData.fechaInicio).getTime())) {
      newErrors.fechaInicio = 'Fecha de inicio inválida';
    }
    if (formData.fechaFinal && isNaN(new Date(formData.fechaFinal).getTime())) {
      newErrors.fechaFinal = 'Fecha final inválida';
    }
    if (
      formData.fechaInicio &&
      formData.fechaFinal &&
      new Date(formData.fechaFinal) < new Date(formData.fechaInicio)
    ) {
      newErrors.fechaFinal = 'La fecha final debe ser posterior a la fecha de inicio';
    }

    const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    if (formData.listaCorreoUrl && !urlRegex.test(formData.listaCorreoUrl)) {
      newErrors.listaCorreoUrl = 'URL no válida';
    }
    if (formData.archivoUrl && !urlRegex.test(formData.archivoUrl)) {
      newErrors.archivoUrl = 'URL no válida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    const finalData = {
      ...formData,
      frecuenciaCategoria: `${frecuenciaNum} ${frecuenciaUnidad}`,
      periodoRetraso: formData.demora ? `${retrasoNum} ${retrasoUnidad}` : '',
      totalReverberaciones: formData.totalReverberaciones.toString(),
    };

    if (!validate()) return;

    setLoading(true);
    try {
      if (isEditMode) {
  await updateCategoria(initialData.id, finalData);
  alert('Categoría actualizada con éxito');
} else {
  await createCategoria(finalData);
  alert('Categoría creada con éxito');
}
      setTimeout(() => {
        navigate('/categorias');
      }, 2500);
    } catch (error) {
      console.error(error);
      alert('Error al guardar la categoría');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta categoría?');
    if (!confirmed) return;

    try {
      setLoading(true);
      await deleteCategoria(initialData.id);
      alert('Categoría eliminada con éxito');
      navigate('/categorias');
    } catch (error) {
      console.error('Error al eliminar', error);
      alert('No se pudo eliminar la categoría');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className="custom-form" onSubmit={handleSubmit} noValidate>
      {submitError && <Alert variant="danger">{submitError}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Nombre de la categoría:</Form.Label>
        <Form.Control
          name="tituloCategoria"
          value={formData.tituloCategoria}
          onChange={handleChange}
          isInvalid={!!errors.tituloCategoria}
        />
        <Form.Control.Feedback type="invalid">{errors.tituloCategoria}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción:</Form.Label>
        <Form.Control
          name="descripcionCategoria"
          value={formData.descripcionCategoria}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor:</Form.Label>
        <Form.Control
          name="autorCategoria"
          value={formData.autorCategoria}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email del autor:</Form.Label>
        <Form.Control
          name="autorEmailCategoria"
          value={formData.autorEmailCategoria}
          onChange={handleChange}
          isInvalid={!!errors.autorEmailCategoria}
        />
        <Form.Control.Feedback type="invalid">{errors.autorEmailCategoria}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Frecuencia:</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="number"
            min="1"
            value={frecuenciaNum}
            onChange={(e) => setFrecuenciaNum(e.target.value)}
            style={{ maxWidth: '100px' }}
          />
          <Form.Select
            value={frecuenciaUnidad}
            onChange={(e) => setFrecuenciaUnidad(e.target.value)}
            style={{ maxWidth: '150px' }}
          >
            <option value="minuto">Minuto</option>
            <option value="hora">Hora</option>
            <option value="día">Día</option>
            <option value="semana">Semana</option>
          </Form.Select>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="¿Está limitado?"
          name="totalLimitado"
          checked={formData.totalLimitado === 'true'}
          onChange={handleChange}
        />
      </Form.Group>

      {formData.totalLimitado === 'true' && (
        <Form.Group className="mb-3">
          <Form.Label>Total reverberaciones:</Form.Label>
          <Form.Control
            type="number"
            name="totalReverberaciones"
            value={formData.totalReverberaciones}
            onChange={handleChange}
            isInvalid={!!errors.totalReverberaciones}
          />
          <Form.Control.Feedback type="invalid">{errors.totalReverberaciones}</Form.Control.Feedback>
        </Form.Group>
      )}

      <fieldset className="mb-3">
        <legend>Estado:</legend>
        <Form.Check
          inline
          label="Activo"
          name="estadoDeActividad"
          value="true"
          type="radio"
          checked={formData.estadoDeActividad === true}
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="Inactivo"
          name="estadoDeActividad"
          value="false"
          type="radio"
          checked={formData.estadoDeActividad === false}
          onChange={handleChange}
        />
      </fieldset>

      <Form.Group className="mb-3">
        <Form.Label>Fecha de inicio:</Form.Label>
        <Form.Control
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          onChange={handleChange}
          isInvalid={!!errors.fechaInicio}
        />
        <Form.Control.Feedback type="invalid">{errors.fechaInicio}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fecha final:</Form.Label>
        <Form.Control
          type="date"
          name="fechaFinal"
          value={formData.fechaFinal}
          onChange={handleChange}
          isInvalid={!!errors.fechaFinal}
        />
        <Form.Control.Feedback type="invalid">{errors.fechaFinal}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Lista de correo (URL):</Form.Label>
        <Form.Control
          name="listaCorreoUrl"
          value={formData.listaCorreoUrl}
          onChange={handleChange}
          isInvalid={!!errors.listaCorreoUrl}
        />
        <Form.Control.Feedback type="invalid">{errors.listaCorreoUrl}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Link del archivo (URL):</Form.Label>
        <Form.Control
          name="archivoUrl"
          value={formData.archivoUrl}
          onChange={handleChange}
          isInvalid={!!errors.archivoUrl}
        />
        <Form.Control.Feedback type="invalid">{errors.archivoUrl}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="¿Tiene demora?"
          name="demora"
          checked={formData.demora}
          onChange={handleChange}
        />
      </Form.Group>

      {formData.demora && (
        <Form.Group className="mb-3">
          <Form.Label>Periodo de retraso:</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              type="number"
              min="0"
              value={retrasoNum}
              onChange={(e) => setRetrasoNum(e.target.value)}
              style={{ maxWidth: '100px' }}
            />
            <Form.Select
              value={retrasoUnidad}
              onChange={(e) => setRetrasoUnidad(e.target.value)}
              style={{ maxWidth: '150px' }}
            >
              <option value="minuto">Minuto</option>
              <option value="hora">Hora</option>
              <option value="día">Día</option>
              <option value="semana">Semana</option>
            </Form.Select>
          </div>
        </Form.Group>
      )}

      <div className="button-container">
        <BasicButton type="submit" className="btn-accent-custom mt-3" disabled={loading} size="small">
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Guardando...
            </>
          ) : isEditMode ? (
            'Guardar cambios'
          ) : (
            'Crear categoría'
          )}
        </BasicButton>

        {isEditMode && (
          <BasicButton
            type="button"
            className="btn-tertiary-custom"
            size="small"
            onClick={handleDelete}
          >
            Eliminar categoría
          </BasicButton>
        )}
      </div>
    </Form>
  );
}

export default CategoriaForm;
