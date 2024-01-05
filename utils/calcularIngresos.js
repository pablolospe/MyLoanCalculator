export function calcularIngresos(
  ingreso,
  ingreso2,
  ingreso3,
  vehículo,
  vehiculo2,
  vehiculo3,
  club,
  club2,
  club3
) {
  const result =
    +ingreso +
    +ingreso2 +
    +ingreso3 -
    ((+vehículo + +vehiculo2 + +vehiculo3) * 150 ) -
    (+club + +club2 + +club3);
  return result;
}