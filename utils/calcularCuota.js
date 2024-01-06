export function calcularCuota(valorPrestamo, tasaAnual, plazoFinanciamiento) {
  if (isNaN(valorPrestamo) || isNaN(tasaAnual) || isNaN(plazoFinanciamiento) || tasaAnual === 0) {
    // Devuelve 0 si alguno de los argumentos es NaN o si tasaAnual es 0
    return 0;
  }

  const tasaMensualDecimal = tasaAnual / 100 / 12; // Convertir la tasa anual a una tasa mensual en decimal
  const result = valorPrestamo * (tasaMensualDecimal * Math.pow((1 + tasaMensualDecimal), plazoFinanciamiento)) / (Math.pow((1 + tasaMensualDecimal), plazoFinanciamiento) - 1);
  return parseFloat(result).toFixed(2);
}

// C = P * (r*(1+r)^n) / ((1+r)^n - 1)

// donde:

// C es el valor de la cuota.
// P es el monto del préstamo o capital inicial.
// r es la tasa de interés del período (si la tasa es anual, deberías dividirla por 12 para obtener la tasa mensual).
// n es el número total de cuotas (si el préstamo es a 5 años, y las cuotas son mensuales, n sería 60).
// Esta fórmula se utiliza para calcular cuotas iguales a lo largo del tiempo, que incluyen tanto la amortización del capital como el pago de intereses. Ten en cuenta que a medida que avanzan las cuotas, la proporción de intereses disminuye y la de capital aumenta, aunque el valor total de la cuota se mantiene constante.