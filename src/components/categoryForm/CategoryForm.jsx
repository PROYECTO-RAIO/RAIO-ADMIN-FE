import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Alert, Spinner } from 'react-bootstrap';
import BasicButton from '../basicButton/BasicButton';
import './CategoryForm.css';

const defaultData = {
  nombre: '',
  descripcion: '',
  autor: '',
  email_autor: '',
  frecuencia_num: 1,
  frecuencia_unidad: 'hora',
  limitado: false,
  total_reverberaciones: 0,
  activo: true,
  fecha_inicio: '',
  fecha_final: '',
  lista_correo_url: '',
  archivo_url: '',
  demora: false,
  periodo_retraso_num: 0,
  periodo_retraso_unidad: 'minuto',
};

function CategoriaForm({ initialData = null }) {
  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultData,
        ...initialData,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';

    if (formData.nombre.length > 100) {
      newErrors.nombre = 'El nombre es demasiado largo';
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email_autor))
      newErrors.email_autor = 'Email no válido';

    if (Number(formData.frecuencia_num) < 1)
      newErrors.frecuencia_num = 'Debe ser un número mayor o igual a 1';

    if (Number(formData.total_reverberaciones) < 0)
      newErrors.total_reverberaciones = 'Debe ser un número mayor o igual a 0';

    if (typeof formData.activo !== 'boolean') {
      newErrors.activo = 'Debes seleccionar si está activo o inactivo';
    }

    const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    if (formData.lista_correo_url && !urlRegex.test(formData.lista_correo_url))
      newErrors.lista_correo_url = 'URL no válida';

    if (formData.archivo_url && !urlRegex.test(formData.archivo_url))
      newErrors.archivo_url = 'URL no válida';

    if (formData.demora && Number(formData.periodo_retraso_num) < 0)
      newErrors.periodo_retraso_num = 'Debe ser un número mayor o igual a 0';

    if (!Number.isInteger(Number(formData.frecuencia_num))) {
      newErrors.frecuencia_num = 'Debe ser un número entero';
    }

    if (formData.fecha_inicio && isNaN(new Date(formData.fecha_inicio).getTime())) {
      newErrors.fecha_inicio = 'Fecha de inicio no válida';
    }
    if (formData.fecha_final && isNaN(new Date(formData.fecha_final).getTime())) {
      newErrors.fecha_final = 'Fecha final no válida';
    }
    if (
      formData.fecha_inicio &&
      formData.fecha_final &&
      !isNaN(new Date(formData.fecha_inicio).getTime()) &&
      !isNaN(new Date(formData.fecha_final).getTime()) &&
      new Date(formData.fecha_final) < new Date(formData.fecha_inicio)
    ) {
      newErrors.fecha_final = 'La fecha final debe ser igual o posterior a la fecha de inicio';
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      // Aquí va tu llamada axios para crear la categoría
      // await axios.post('/api/categorias', formData);

      alert('Categoría creada con éxito');
      setTimeout(() => {
        navigate('/categorias');
      }, 2500);
    } catch (error) {
      alert('Error al crear la categoría');
      console.error(error);
    }
  };

  const isEditMode = Boolean(initialData);

  return (
    <Form className="custom-form" onSubmit={handleSubmit} noValidate>
      {submitError && <Alert variant="danger">{submitError}</Alert>}

      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre de la categoría:</Form.Label>
        <Form.Control className="input"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          isInvalid={!!errors.nombre}
        />
        <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="descripcion">
        <Form.Label>Descripción de la categoría:</Form.Label>
        <Form.Control className="input"
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          isInvalid={!!errors.descripcion}
        />
        <Form.Control.Feedback type="invalid">{errors.descripcion}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="autor">
        <Form.Label>Autor de la categoría:</Form.Label>
        <Form.Control className="input"
          type="text"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
          isInvalid={!!errors.autor}
        />
        <Form.Control.Feedback type="invalid">{errors.autor}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email_autor">
        <Form.Label>Email del autor:</Form.Label>
        <Form.Control className="input"
          type="email"
          name="email_autor"
          value={formData.email_autor}
          onChange={handleChange}
          isInvalid={!!errors.email_autor}
        />
        <Form.Control.Feedback type="invalid">{errors.email_autor}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <div className="d-flex gap-2">
          <Form.Label htmlFor='frecuencia_num'>Frecuencia:</Form.Label>
          <Form.Control className="input"
            id="frecuencia_num"
            type="number"
            min="1"
            name="frecuencia_num"
            value={formData.frecuencia_num}
            onChange={handleChange}
            isInvalid={!!errors.frecuencia_num}
            style={{ maxWidth: '100px' }}
          />
          <Form.Label htmlFor="frecuencia_unidad"></Form.Label>
          <Form.Select
            id="frecuencia_unidad"
            name="frecuencia_unidad"
            value={formData.frecuencia_unidad}
            onChange={handleChange}
            style={{ maxWidth: '150px' }}
          >
            <option value="minuto">Minuto</option>
            <option value="hora">Hora</option>
            <option value="día">Día</option>
            <option value="semana">Semana</option>
          </Form.Select>
        </div>
        <Form.Control.Feedback type="invalid">{errors.frecuencia_num}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="limitado">
        <Form.Check
          type="checkbox"
          label="Limitado"
          name="limitado"
          checked={formData.limitado}
          onChange={handleChange}
        />
      </Form.Group>

      {formData.limitado && (
        <Form.Group className="mb-3" controlId="total_reverberaciones">
          <Form.Label>Total reverberaciones:</Form.Label>
          <Form.Control className="input"
            type="number"
            min="0"
            name="total_reverberaciones"
            value={formData.total_reverberaciones}
            onChange={handleChange}
            isInvalid={!!errors.total_reverberaciones}
          />
          <Form.Control.Feedback type="invalid">{errors.total_reverberaciones}</Form.Control.Feedback>
        </Form.Group>
      )}

      <fieldset className="mb-3">
        <legend>Estado:</legend>
        <div>
          <Form.Check
            inline
            id="activo-true"
            type="radio"
            label="Activo"
            name="activo"
            value="true"
            checked={formData.activo === true}
            onChange={() => setFormData({ ...formData, activo: true })}
          />
          <Form.Check
            inline
            id="activo-false"
            type="radio"
            label="Inactivo"
            name="activo"
            value="false"
            checked={formData.activo === false}
            onChange={() => setFormData({ ...formData, activo: false })}
          />
        </div>
      </fieldset>

      <Form.Group className="mb-3" controlId="fecha_inicio">
        <Form.Label>Fecha de inicio:</Form.Label>
        <Form.Control className="input"
          type="date"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
          isInvalid={!!errors.fecha_inicio}
        />
        <Form.Control.Feedback type="invalid">{errors.fecha_inicio}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="fecha_final">
        <Form.Label>Fecha final:</Form.Label>
        <Form.Control className="input"
          type="date"
          name="fecha_final"
          value={formData.fecha_final}
          onChange={handleChange}
          isInvalid={!!errors.fecha_final}
        />
        <Form.Control.Feedback type="invalid">{errors.fecha_final}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="lista_correo_url">
        <Form.Label>Lista de correo (URL):</Form.Label>
        <Form.Control className="input"
          type="url"
          name="lista_correo_url"
          value={formData.lista_correo_url}
          onChange={handleChange}
          isInvalid={!!errors.lista_correo_url}
        />
        <Form.Control.Feedback type="invalid">{errors.lista_correo_url}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="archivo_url">
        <Form.Label>Link del archivo (URL):</Form.Label>
        <Form.Control className="input"
          type="url"
          name="archivo_url"
          value={formData.archivo_url}
          onChange={handleChange}
          isInvalid={!!errors.archivo_url}
        />
        <Form.Control.Feedback type="invalid">{errors.archivo_url}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="demora">
        <Form.Check
          type="checkbox"
          label="Demora"
          name="demora"
          checked={formData.demora}
          onChange={handleChange}
        />
      </Form.Group>

      {formData.demora && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor='periodo_retraso_num'>Periodo de retraso:</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              id="periodo_retraso_num"
              type="number"
              min="0"
              name="periodo_retraso_num"
              value={formData.periodo_retraso_num}
              onChange={handleChange}
              isInvalid={!!errors.periodo_retraso_num}
              style={{ maxWidth: '100px' }}
            />
            <Form.Label htmlFor='periodo_retraso_unidad'></Form.Label>
            <Form.Select
              id="periodo_retraso_unidad"
              name="periodo_retraso_unidad"
              value={formData.periodo_retraso_unidad}
              onChange={handleChange}
              style={{ maxWidth: '150px' }}
            >
              <option value="minuto">Minuto</option>
              <option value="hora">Hora</option>
              <option value="día">Día</option>
              <option value="semana">Semana</option>
            </Form.Select>
          </div>
          <Form.Control.Feedback type="invalid">{errors.periodo_retraso_num}</Form.Control.Feedback>
        </Form.Group>
      )}
      <BasicButton type="submit" className="btn-accent-custom mt-3" disabled={loading}>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Guardando...
          </>
        ) : (
          isEditMode ? 'Guardar Cambios' : 'Crear Categoría'
        )}
      </BasicButton>
    </Form>
  );
}

export default CategoriaForm;
