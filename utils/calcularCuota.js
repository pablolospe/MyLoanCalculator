// Calcula la cuota pura, sin seguros ni gastos administrativos.

export function calcularCuota(valorPrestamo, tasaAnual, plazoFinanciamiento) {
  if (isNaN(valorPrestamo) || isNaN(tasaAnual) || isNaN(plazoFinanciamiento) || tasaAnual === 0) {
    // Devuelve 0 si alguno de los argumentos es NaN o si tasaAnual es 0
    return 0;
  }

  const tasaMensualDecimal = tasaAnual / 100 / 12; // Convertir la tasa anual a una tasa mensual en decimal
  const result = valorPrestamo * (tasaMensualDecimal * Math.pow((1 + tasaMensualDecimal), plazoFinanciamiento)) / (Math.pow((1 + tasaMensualDecimal), plazoFinanciamiento) - 1);
  return parseFloat(result).toFixed(2);
}

// export function calcularCuota(P, r, n) {
//   r = r / 100 / 12; // Convertir la tasa anual a una tasa mensual en decimal
//    const result = P * (r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);
//    return result.toFixed(2)
// }


// export function calcularCuota(P, r, N) {
//   const result = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
//   return result.toFixed(2)
// }

// // Ejemplo de uso:
// // const P = 10000;  // Monto del préstamo
// // const N = 12;     // Número de períodos (mensual)

// const tasaAnual = 0.05;   // Tasa de interés anual (5%)
// const tasaPeriodica = tasaAnual / 12;  // Divide la tasa anual por el número de meses en un año
// // const cuota = calcularCuota(P, tasaPeriodica, N);
// // console.log("La cuota mensual es: " + cuota);


// C = P * (r*(1+r)^n) / ((1+r)^n - 1)

// donde:

// C es el valor de la cuota.
// P es el monto del préstamo o capital inicial.
// r es la tasa de interés del período (si la tasa es anual, deberías dividirla por 12 para obtener la tasa mensual).
// n es el número total de cuotas (si el préstamo es a 5 años, y las cuotas son mensuales, n sería 60).
// Esta fórmula se utiliza para calcular cuotas iguales a lo largo del tiempo, que incluyen tanto la amortización del capital como el pago de intereses. Ten en cuenta que a medida que avanzan las cuotas, la proporción de intereses disminuye y la de capital aumenta, aunque el valor total de la cuota se mantiene constante.