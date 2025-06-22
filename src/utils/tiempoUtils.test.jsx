import { describe, it, expect } from 'vitest';
import { convertirAMinutos } from './tiempoUtils';

describe('convertirAMinutos', () => {
  it('convierte minutos correctamente', () => {
    expect(convertirAMinutos('5', 'minuto')).toBe(5);
    expect(convertirAMinutos('0', 'minuto')).toBe(0);
  });

  it('convierte horas correctamente', () => {
    expect(convertirAMinutos('1', 'hora')).toBe(60);
    expect(convertirAMinutos('2', 'hora')).toBe(120);
  });

  it('convierte días correctamente', () => {
    expect(convertirAMinutos('1', 'día')).toBe(1440);
    expect(convertirAMinutos('2', 'día')).toBe(2880);
  });

  it('maneja valores no numéricos devolviendo 0', () => {
    expect(convertirAMinutos('abc', 'minuto')).toBe(0);
    expect(convertirAMinutos('', 'hora')).toBe(0);
  });

  it('devuelve 0 para unidades desconocidas', () => {
    expect(convertirAMinutos('5', 'semana')).toBe(0);
    expect(convertirAMinutos('10', '')).toBe(0);
  });
});
