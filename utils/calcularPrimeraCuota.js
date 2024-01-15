// Esta función es para sumarle solo a la primer cuota los seguros y gastos administrativos.

import { calcularCuota } from "./calcularCuota";
import { calcularSeguroDesempleo } from "./calcularSeguroDesempleo";

export function calcularPrimeraCuota(valorPrestamo, tasaAnual, plazoFinanciamiento, saldoDelPrecio, seguroDesempleo, gastosAdministrativos) {
  if (isNaN(valorPrestamo) || isNaN(tasaAnual) || isNaN(plazoFinanciamiento) || tasaAnual === 0) {
    // Devuelve 0 si alguno de los argumentos es NaN o si tasaAnual es 0
    return 0;
  }
  const cuota = parseFloat(calcularCuota(valorPrestamo, tasaAnual, plazoFinanciamiento)); // Calcula la cuota básica
  
  let saldoDelPrecioCosto = parseFloat(valorPrestamo * saldoDelPrecio / 1000 / 12).toFixed(2);
  
  let seguroDesempleoCosto = calcularSeguroDesempleo(cuota, seguroDesempleo).toFixed(2);
  //ES EL 4,75% MAS EL 22% DEL 4,75 DE 4 CUOTAS PURAS

  let gastosAdministrativosCosto = parseFloat(cuota * gastosAdministrativos / 100).toFixed(2);

  const tasaMensualDecimal = tasaAnual / 100 / 12; // Convertir la tasa anual a una tasa mensual en decimal
  const result = valorPrestamo * (tasaMensualDecimal * Math.pow((1 + tasaMensualDecimal), plazoFinanciamiento)) / (Math.pow((1 + tasaMensualDecimal), plazoFinanciamiento) - 1);
  // return parseFloat(result).toFixed(2);
  
  // Le sumamos los seguros y los gastos administrativos
  return (parseFloat(result) + parseFloat(saldoDelPrecioCosto) + parseFloat(seguroDesempleoCosto) + parseFloat(gastosAdministrativosCosto)).toFixed(2)
  
  // "CUOTA A PAGAR": (parseFloat(cuota) + parseFloat(saldoDelPrecioCosto) + parseFloat(seguroDesempleoCosto) + parseFloat(gastosAdministrativosCosto)).toFixed(2),
}
