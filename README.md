# RAIO - Panel de Administración Frontend

Panel de gestión para RAIO (*Reverberacions d'Amor i Odi*), plataforma creativa para recolectar, reverberar y visualizar mensajes colectivos.
<!-- Agregar imagen real si está disponible -->

## Descripción

Este frontend permite gestionar categorías de reverberaciones - agrupaciones de respuestas creativas asociadas a mensajes del público. Funcionalidades principales:
- Crear/editar/eliminar categorías
- Configurar parámetros de reverberación
- Gestionar estados de activación
- Administrar metadatos y archivos vinculados

##  Tecnologías

- **Core**: React 19
- **Bundler**: Vite
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **UI Framework**: Bootstrap 5 + React-Bootstrap
- **Testing**:
  - Unit: Vitest + Testing Library
  - E2E: Playwright

##  Instalación

# Clonar repositorio
git clone https://github.com/tu-usuario/raio-admin.git

# Configuración
Crear archivo .env en raíz del proyecto

# Funcionalidades
Gestión de Categorías
 Crear nuevas categorías con:

Nombre y descripción

Metadatos (autor, email)

Frecuencia y cantidad de reverberaciones

Fechas de inicio/fin

Estado (activo/inactivo)

Archivos adjuntos y listas de correo

Parámetros de demora/retraso

Editar categorías existentes

Eliminar/desactivar categorías

# Autenticación
Nota de seguridad
Actualmente no hay sistema de autenticación implementado. Se recomienda:

Autenticación con JWT para la creación, actualización y eliminación de categorías

Implementar middleware de autorización



# Licencia
Proyecto de carácter cultural/artístico. Uso interno y educativo.
