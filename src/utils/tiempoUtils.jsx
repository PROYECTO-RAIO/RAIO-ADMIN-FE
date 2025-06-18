export const convertirAMinutos = (valor, unidad) => {
  const numero = parseInt(valor, 10) || 0;
  switch (unidad) {
    case 'minuto':
      return numero;
    case 'hora':
      return numero * 60;
    case 'día':
      return numero * 60 * 24;
    default:
      return 0;
  }
};
