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

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
 Configuración
Crear archivo .env en raíz del proyecto:

env
VITE_API_URL=http://localhost:3000/api  # URL de la API backend
Scripts disponibles
Comando	Descripción
npm run dev	Inicia servidor de desarrollo
npm run build	Genera build de producción
npm run preview	Sirve build localmente
npm run test	Ejecuta pruebas unitarias (Vitest)
npm run test:e2e	Ejecuta pruebas E2E (Playwright)
 Funcionalidades
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

Autenticación
Nota de seguridad
Actualmente no hay sistema de autenticación implementado. Se recomienda:

Agregar JWT o OAuth para producción

Restringir acceso público

Implementar middleware de autorización

Despliegue
bash
# Generar build de producción
npm run build

# Servir localmente (para verificar)
npm run preview

# Para producción:
# Desplegar contenido de /dist en servidor estático
# (Netlify, Vercel, Nginx, Docker, etc.)
 Testing
bash
# Pruebas unitarias (componentes/lógica)
npm run test

# Pruebas E2E (flujos completos)
npm run test:e2e

# Generar reportes de cobertura:
# Ver /coverage después de ejecutar tests
📄 Licencia
Proyecto de carácter cultural/artístico. Uso interno y educativo.
