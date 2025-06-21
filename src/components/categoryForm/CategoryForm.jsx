import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Alert, Spinner } from 'react-bootstrap';
import BasicButton from '../basicButton/BasicButton';
import { createCategoria, updateCategoria, deleteCategoria } from '../../service/apiService';
import { convertirAMinutos } from '../../utils/tiempoUtils';
import './CategoryForm.css';

const defaultData = {
  tituloCategoria: '',
  descripcionCategoria: '',
  autorCategoria: '',
  autorEmailCategoria: '',
  frecuenciaCategoria: 'siempre',
  totalLimitado: 'false',
  totalReverberaciones: '0',
  estadoDeActividad: true,
  temporalidad: false,
  fechaInicio: '',
  fechaFinal: '',
  listaCorreo: '',
  archivoUrl: '',
  demora: false,
  periodoRetraso: ''
};

function CategoriaForm({ initialData = null }) {
  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isEditMode = !!initialData?.id;
  const [frecuenciaNum, setFrecuenciaNum] = useState('1');
  const [retrasoMinNum, setRetrasoMinNum] = useState('0');
  const [retrasoMaxNum, setRetrasoMaxNum] = useState('0');
  const [retrasoMinUnidad, setRetrasoMinUnidad] = useState('minuto');
  const [retrasoMaxUnidad, setRetrasoMaxUnidad] = useState('minuto');
  const [minutosAleatorios, setMinutosAleatorios] = useState(null);

  useEffect(() => {
    if (!initialData) return;

    setFormData({ ...defaultData, ...initialData });

    const frecuencia = initialData.frecuenciaCategoria;
    if (frecuencia?.includes(' ')) {
      const [num] = frecuencia.split(' ');
      setFrecuenciaNum(num);
      setFormData((prev) => ({ ...prev, frecuenciaCategoria: 'personalizada' }));
    } else {
      setFormData((prev) => ({ ...prev, frecuenciaCategoria: frecuencia }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'totalLimitado') {
      setFormData((prev) => ({ ...prev, totalLimitado: checked ? 'true' : 'false' }));
    } else if (name === 'estadoDeActividad') {
      setFormData((prev) => ({ ...prev, estadoDeActividad: value === 'true' }));
    } else if (name === 'temporalidad') {
      setFormData((prev) => ({ ...prev, temporalidad: checked ? 'true' : 'false' }));
    } else if (name === 'frecuenciaCategoria') {
      if (value === 'aleatoria') {
        const random = Math.random() < 0.5 ? 0 : 1;
        setFormData((prev) => ({ ...prev, frecuenciaCategoria: value, resultadoAleatorio: random }));
      } else {
        setFormData((prev) => ({ ...prev, frecuenciaCategoria: value }));
      }
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
    if (formData.archivoUrl && !urlRegex.test(formData.archivoUrl)) {
      newErrors.archivoUrl = 'URL no válida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    let minutosAleatorios = null;
    if (formData.demora) {
      const min = convertirAMinutos(retrasoMinNum, retrasoMinUnidad);
      const max = convertirAMinutos(retrasoMaxNum, retrasoMaxUnidad);

      if (min > max) {
        setSubmitError('El retraso mínimo no puede ser mayor que el máximo');
        setLoading(false);
        return;
      }

      minutosAleatorios = Math.floor(Math.random() * (max - min + 1)) + min;
      setMinutosAleatorios(minutosAleatorios);
    }

    const finalData = {
      ...formData,
      frecuenciaCategoria: formData.frecuenciaCategoria === 'personalizada'
        ? `${frecuenciaNum} emails`
        : formData.frecuenciaCategoria,
      periodoRetraso: formData.demora ? minutosAleatorios : null,
      totalReverberaciones: formData.totalReverberaciones.toString(),
      minutosAleatorios,
    };

    setLoading(true);
    try {
      if (isEditMode) {
        await updateCategoria(initialData.id, finalData);
          setMessage("Categoría actualizada con éxito");
          setMessageType('success');
      } else {
        await createCategoria(finalData);
          setMessage("Categoría creada con éxito");
          setMessageType('success');
      }
      setTimeout(() => {
        navigate('/categorias');
      }, 2500);
    } catch (error) {
      console.error(error);
          setMessage("Error al guardar la categoría");
          setMessageType('error');
      alert('Error al guardar la categoría');
    } finally {
      setLoading(false);
    }
  };

const handleDeleteConfirmed = async () => {
  try {
    setLoading(true);
    await deleteCategoria(initialData.id);
    setMessage("Categoría eliminada con éxito");
    setMessageType('success');
    navigate('/categorias');
  } catch (error) {
    console.error('Error al eliminar', error);
    setMessage("No se pudo eliminar la categoría");
    setMessageType('error');
  } finally {
    setLoading(false);
    setShowDeleteConfirm(false);
  }
};


  return (
    <Form className="custom-form" onSubmit={handleSubmit} noValidate>
      {submitError && <Alert variant="danger">{submitError}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="tituloCategoria">Nombre de la categoría:</Form.Label>
        <Form.Control
          id="tituloCategoria"
          name="tituloCategoria"
          value={formData.tituloCategoria}
          onChange={handleChange}
          isInvalid={!!errors.tituloCategoria}
        />
        <Form.Control.Feedback type="invalid">{errors.tituloCategoria}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="descripcionCategoria">Descripción:</Form.Label>
        <Form.Control
          id="descripcionCategoria"
          name="descripcionCategoria"
          value={formData.descripcionCategoria}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="autorCategoria">Autor/a/e/i/(s):</Form.Label>
        <Form.Control
          id="autorCategoria"
          name="autorCategoria"
          value={formData.autorCategoria}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="autorEmailCategoria">Email:</Form.Label>
        <Form.Control
          id="autorEmailCategoria"
          name="autorEmailCategoria"
          value={formData.autorEmailCategoria}
          onChange={handleChange}
          isInvalid={!!errors.autorEmailCategoria}
        />
        <Form.Control.Feedback type="invalid">{errors.autorEmailCategoria}</Form.Control.Feedback>
      </Form.Group>

      <fieldset className="mb-3">
        <legend>Frecuencia:</legend>
        <Form.Check
          inline
          label="Siempre"
          id="frecuenciaCategoriaSiempre"
          name="frecuenciaCategoria"
          value="siempre"
          type="radio"
          checked={formData.frecuenciaCategoria === "siempre"}
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="Aleatoria"
          id="frecuenciaCategoriaAleatoria"
          name="frecuenciaCategoria"
          value="aleatoria"
          type="radio"
          checked={formData.frecuenciaCategoria === "aleatoria"}
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="Personalizada"
          id="frecuenciaCategoriaPersonalizada"
          name="frecuenciaCategoria"
          value="personalizada"
          type="radio"
          checked={formData.frecuenciaCategoria === "personalizada"}
          onChange={handleChange}
        />

        {formData.frecuenciaCategoria === "aleatoria" && (
          <p>? =&gt; {formData.resultadoAleatorio === 1 ? "Sí" : "No"}</p>
        )}
        {formData.frecuenciaCategoria === "personalizada" && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <span>Cada</span>
            <Form.Control
              type="number"
              min="1"
              value={frecuenciaNum}
              onChange={(e) => setFrecuenciaNum(e.target.value)}
              style={{ maxWidth: '80px' }}
            />
            <span>emails</span>
          </div>
        )}
      </fieldset>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="¿Está limitado?"
          id="totalLimitado"
          name="totalLimitado"
          checked={formData.totalLimitado === 'true'}
          onChange={handleChange}
        />
      </Form.Group>

      {formData.totalLimitado === 'true' && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="totalReverberaciones">Máximo de reverberaciones:</Form.Label>
          <Form.Control
            type="number"
            id="totalReverberaciones"
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
          id="estadoDeActividadActivo"
          name="estadoDeActividad"
          value="true"
          type="radio"
          checked={formData.estadoDeActividad === true}
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="Inactivo"
          id="estadoDeActividadInactivo"
          name="estadoDeActividad"
          value="false"
          type="radio"
          checked={formData.estadoDeActividad === false}
          onChange={handleChange}
        />
      </fieldset>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="¿Es temporal?"
          id="temporalidad"
          name="temporalidad"
          checked={formData.temporalidad === 'true'}
          onChange={handleChange}
        />
      </Form.Group>

      {formData.temporalidad === 'true' && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="fechaInicio">Fecha de inicio:</Form.Label>
          <Form.Control
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            value={formData.fechaInicio || ''}
            onChange={handleChange}
            isInvalid={!!errors.fechaInicio}
          />
          <Form.Control.Feedback type="invalid">{errors.fechaInicio}</Form.Control.Feedback>

          <Form.Label htmlFor="fechaFinal">Fecha final:</Form.Label>
          <Form.Control
            type="date"
            id="fechaFinal"
            name="fechaFinal"
            value={formData.fechaFinal || ''}
            onChange={handleChange}
            isInvalid={!!errors.fechaFinal}
          />
          <Form.Control.Feedback type="invalid">{errors.fechaFinal}</Form.Control.Feedback>
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="listaCorreo">Email de la lista:</Form.Label>
        <Form.Control
          id="listaCorreo"
          name="listaCorreo"
          value={formData.listaCorreo}
          onChange={handleChange}
          isInvalid={!!errors.listaCorreo}
        />
        <Form.Control.Feedback type="invalid">{errors.listaCorreo}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="archivoUrl">Link del archivo (URL):</Form.Label>
        <Form.Control
          id="archivoUrl"
          type="url"
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
          id="demora"
          name="demora"
          checked={formData.demora}
          onChange={handleChange}
        />
      </Form.Group>

      {formData.demora && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="retrasoMinNumero">Periodo de retraso aleatorio entre:</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              id="retrasoMinNumero"
              name="retrasoNumero"
              type="number"
              min="0"
              value={retrasoMinNum}
              onChange={(e) => setRetrasoMinNum(e.target.value)}
              style={{ maxWidth: '100px' }}
            />
            <Form.Select
              id="retrasoMinUnidad"
              name="retrasoUnidad"
              value={retrasoMinUnidad}
              onChange={(e) => setRetrasoMinUnidad(e.target.value)}
              style={{ maxWidth: '150px' }}
            >
              <option value="minuto">Minuto</option>
              <option value="hora">Hora</option>
              <option value="día">Día</option>
            </Form.Select>

            <Form.Control
              id="retrasoMaxNumero"
              name="retrasoNumero"
              type="number"
              min="0"
              value={retrasoMaxNum}
              onChange={(e) => setRetrasoMaxNum(e.target.value)}
              style={{ maxWidth: '100px' }}
            />
            <Form.Select
              id="retrasoMaxUnidad"
              name="retrasoUnidad"
              value={retrasoMaxUnidad}
              onChange={(e) => setRetrasoMaxUnidad(e.target.value)}
              style={{ maxWidth: '150px' }}
            >
              <option value="minuto">Minuto</option>
              <option value="hora">Hora</option>
              <option value="día">Día</option>
            </Form.Select>

          </div>
          {minutosAleatorios !== null && (
            <div className="mt-2">
              <p>El retraso indeterminado fractura el ritmo, generando un eco mutante.</p>
            </div>
          )}
        </Form.Group>
      )}

  <div className="button-container">
  <BasicButton
    type="submit"
    className="btn-accent-custom mt-3"
    disabled={loading}
    size="small"
  >
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
      onClick={() => setShowDeleteConfirm(true)}
      disabled={loading}
    >
      Eliminar categoría
    </BasicButton>
  )}
</div>

{/* Success or error message */}
{message && (
  <div className={`ux-message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
    <span style={{ whiteSpace: 'pre-line' }}>{message}</span>
    <button
      className="btn-close-message"
      onClick={() => setMessage('')}
      aria-label="Cerrar mensaje"
    >
      ✖
    </button>
  </div>
)}

{/* Delete confirmation popup */}
{showDeleteConfirm && (
  <div className="ux-message confirm-message">
    <span>¿Estás seguro de que deseas eliminar esta categoría?</span>
    <div className="mt-2">
      <BasicButton
        type="button"
        className="btn-danger-custom me-2"
        size="small"
        onClick={handleDeleteConfirmed}
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Eliminando...
          </>
        ) : (
          'Eliminar'
        )}
      </BasicButton>
      <BasicButton
        type="button"
        className="btn-secondary-custom"
        size="small"
        onClick={() => setShowDeleteConfirm(false)}
      >
        Cancelar
      </BasicButton>
    </div>
  </div>
)}
    </Form>
  );
}


export default CategoriaForm;
