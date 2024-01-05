// export function calcularEdad(birthday) {
//     let fechaNacimiento = new Date(birthday);
//     const fechaHoy = new Date();
  
//     let edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();
  
//     // Comprueba si aún no ha pasado el cumpleaños de este año
//     if (
//       fechaNacimiento.getMonth() > fechaHoy.getMonth() ||
//       (fechaNacimiento.getMonth() === fechaHoy.getMonth() &&
//         fechaNacimiento.getDate() > fechaHoy.getDate())
//     ) {
//       edad--;
//     }
  
//     return edad;
//   }





  export function calcularEdad(birthday, additionalMonths = 0) {
    let fechaNacimiento = new Date(birthday);
    const fechaHoy = new Date();
  
    let edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();
    let meses = fechaHoy.getMonth() - fechaNacimiento.getMonth();
  
    // Comprueba si aún no ha pasado el cumpleaños de este año
    if (fechaNacimiento.getDate() > fechaHoy.getDate()) {
      meses--;
    }
  
    meses += additionalMonths; // Añade los meses adicionales
  
    // Resta un año si aún no ha pasado el mes de cumpleaños
    if (meses < 0) {
      edad--;
      meses += 12;
    }
  
    // Convierte los meses restantes en años
    let edadTotal = edad + meses / 12;
  
    // Comprueba si la edad total es mayor, menor o exactamente 70
    if (edadTotal > 70) {
      return 71;
    } else if (edadTotal < 70) {
      return edad;
    } else {
      return 70;
    }
}