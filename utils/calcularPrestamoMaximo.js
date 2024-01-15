// // Función para calcular el préstamo máximo con cálculo iterativo

import { calcularPrimeraCuota } from "./calcularPrimeraCuota";

export function calcularPrestamoMaximo(ingresosTotales, tasaAnual, plazoFinanciamiento, ingresoRatio, saldoDelPrecio, seguroDesempleo, gastosAdministrativos) {
    let prestamoMaximo = 0;
    let cuota = 0;
  
    // 30% de ingresos para la cuota
    const cuotaMax = parseFloat(ingresosTotales) * ingresoRatio;
    
    // Comienza con un préstamo de 0 y aumenta gradualmente
    for (let valorPrestamo = 0;; valorPrestamo += 1000) {
        // Calcula la cuota para el valor actual del préstamo
        cuota = calcularPrimeraCuota(valorPrestamo, tasaAnual, plazoFinanciamiento, saldoDelPrecio, seguroDesempleo, gastosAdministrativos);
        
        // Si la cuota calculada es mayor que cuotaMax, entonces hemos excedido el monto de préstamo máximo admisible.
        if (cuota > cuotaMax) {
          break; // Salimos del bucle
        }
        
        // Si la cuota calculada es todavía menor o igual a cuotaMax, entonces este valor de préstamo es admisible
        prestamoMaximo = valorPrestamo;
      }
  
      return prestamoMaximo;
  }