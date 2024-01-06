import { calcularCuota } from './calcularCuota';
import { calcularSeguroDesempleo } from './calcularSeguroDesempleo';

export function calcularTablaAmortizacion(
  valorPrestamo,
  tasaAnual,
  plazoFinanciamiento = 1,
  saldoDelPrecio,
  seguroDesempleo,
  gastosAdministrativos
) {
  if (
    isNaN(valorPrestamo) ||
    isNaN(tasaAnual) ||
    isNaN(plazoFinanciamiento) ||
    tasaAnual === 0 ||
    plazoFinanciamiento === 0
  )
    return []; // Devuelve un array vacío si alguno de los argumentos es NaN o si tasaAnual es 0
  if (plazoFinanciamiento === 0) plazoFinanciamiento = 1; // Si plazoFinanciamiento es 0, trátalo como 1

  const cuota = parseFloat(
    calcularCuota(valorPrestamo, tasaAnual, plazoFinanciamiento)
  ); // Calcula la cuota básica
  let tasaMensualDecimal = tasaAnual / 100 / 12; // tasa de interés mensual

  let tabla = [];
  let saldo = valorPrestamo;

  let seguroDesempleoCosto = calcularSeguroDesempleo(
    cuota,
    seguroDesempleo
  ).toFixed(2);
  //ES EL 4,75% MAS EL 22% DEL 4,75 DE 4 CUOTAS PURAS

  let gastosAdministrativosCosto = parseFloat(
    (cuota * gastosAdministrativos) / 100
  ).toFixed(2);

  // Calcula la cuota final sumando los costos adicionales a la cuota básica
  // let cuotaFinal = parseFloat(cuota + saldoDelPrecioCosto + seguroDesempleoCosto + gastosAdministrativosCosto).toFixed(2);

  for (let i = 0; i < plazoFinanciamiento; i++) {
    let interes = saldo * tasaMensualDecimal;
    let capitalAmortizado = cuota - interes;
    saldo -= capitalAmortizado;

    let saldoDelPrecioCosto = parseFloat(
      (saldo * saldoDelPrecio) / 1000 / 12
    ).toFixed(2);

    tabla.push({
      'FEE NO.': i + 1,
      'PURE FEE': cuota,
      'FEE TO PAY': (
        parseFloat(cuota) +
        parseFloat(saldoDelPrecioCosto) +
        parseFloat(seguroDesempleoCosto) +
        parseFloat(gastosAdministrativosCosto)
      ).toFixed(2),
      INTEREST: parseFloat(interes.toFixed(2)),
      'AMORTIZED CAPITAL': parseFloat(capitalAmortizado.toFixed(2)),
      'REMAINING CAPITAL': parseFloat(saldo.toFixed(2)),
      'LIFE INSURANCE': saldoDelPrecioCosto,
      'UNEMPLOYMENT INSURANCE': seguroDesempleoCosto,
      'ADMIN EXPENCES': gastosAdministrativosCosto,
    });
  }

  return tabla;
}
