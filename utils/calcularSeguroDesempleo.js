export function calcularSeguroDesempleo(cuota, porcentaje) {
    // const porcentaje = 4.75;
    const iva = 22;

    // Calcula el 4.75% de 4 cuotas(es anual)
    const porcentajeDeLaCuota = 4 * cuota * porcentaje / 100 / 12;

    // Calcula el 22% del resultado anterior (es decir, el IVA)
    const ivaDelPorcentaje = porcentajeDeLaCuota * iva / 100;

    // Suma los dos resultados
    const total = porcentajeDeLaCuota + ivaDelPorcentaje;

    return total;
}

// Uso de la función
// const cuota = 100;
// const total = calcularPorcentajeMasIVA(cuota);
// console.log(total);  // Imprime el resultado en la consola