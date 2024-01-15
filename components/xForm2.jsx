'use client';

import { useState, useEffect } from 'react';
import { calcularEdad, calcularIngresos, exportToExcel, calcularTablaAmortizacion, calcularPrestamoMaximo } from '@/utils';
import { BackButton, NextButton, Stepper, AlertPrestamoMax } from './';
import Image from 'next/image';
import Link from 'next/link';

const Form2 = () => {
  const [parteDelFormulario, setParteDelFormulario] = useState(1);

  const ingresoRatio = 0.3;

  const handleNext = (e) => {
    e.preventDefault();
    if (parteDelFormulario < 3) setParteDelFormulario(parteDelFormulario + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (parteDelFormulario > 1) setParteDelFormulario(parteDelFormulario - 1);
  };

  const [nombre, setNombre] = useState('Juan Perez');
  const [tipoDeId, setTipoDeId] = useState('CI');
  const [dni, setDni] = useState('23456789');
  const [email, setEmail] = useState('jp@gmail.com');
  const [birthday, setBirthday] = useState('');
  const [edad, setEdad] = useState('');
  const [valorUnidad, setValorUnidad] = useState('');
  const [valorPrestamo, setValorPrestamo] = useState('');
  const [tasaAnual, setTasaAnual] = useState(7);
  const [plazoFinanciamiento, setPlazoFinanciamiento] = useState(24);
  const [saldoDelPrecio, setSaldoDelPrecio] = useState(4.8);
  const [seguroDesempleo, setSeguroDesempleo] = useState(4.75);
  const [gastosAdministrativos, setGastosAdministrativos] = useState(0.7);
  const [ingresosNetosMensuales, setIngresosNetosMensuales] = useState(2500);
  const [vehiculoPropio, setVehiculoPropio] = useState('');
  const [esSocioDeUnClub, setEsSocioDeUnClub] = useState('');
  const [ingresosNetosMensuales2, setIngresosNetosMensuales2] = useState('');
  const [vehiculoPropio2, setVehiculoPropio2] = useState('');
  const [esSocioDeUnClub2, setEsSocioDeUnClub2] = useState('');
  const [ingresosNetosMensuales3, setIngresosNetosMensuales3] = useState('');
  const [vehiculoPropio3, setVehiculoPropio3] = useState('');
  const [esSocioDeUnClub3, setEsSocioDeUnClub3] = useState('');
  const [ingresosTotales, setIngresosTotales] = useState();
  const [cuota, setCuota] = useState(0);
  const [cuotas, setCuotas] = useState([]);
  // const [valorPrestamoMax, setValorPrestamoMax] = useState('')

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setFullYear(currentDate.getFullYear() - 18);
  const minDate = new Date(currentDate);
  minDate.setFullYear(currentDate.getFullYear() - 65);

  useEffect(() => {
    const result = calcularTablaAmortizacion(
      valorPrestamo,
      tasaAnual,
      plazoFinanciamiento,
      saldoDelPrecio,
      seguroDesempleo,
      gastosAdministrativos
    );
    setCuotas(result);
    if (result.length > 0) setCuota(result[0]['CUOTA A PAGAR']);

    setIngresosTotales(
      calcularIngresos(ingresosNetosMensuales, ingresosNetosMensuales2, ingresosNetosMensuales3, vehiculoPropio, vehiculoPropio2, vehiculoPropio3, esSocioDeUnClub, esSocioDeUnClub2, esSocioDeUnClub3)
    );
  }, [ valorPrestamo, tasaAnual, plazoFinanciamiento, setCuota, cuota, saldoDelPrecio, seguroDesempleo, gastosAdministrativos, edad, ingresosTotales, setIngresosTotales, ingresosNetosMensuales, ingresosNetosMensuales2, ingresosNetosMensuales3, vehiculoPropio, vehiculoPropio2, vehiculoPropio3, esSocioDeUnClub, esSocioDeUnClub2, esSocioDeUnClub3,]
  );

  const handleCalcularPrestamoMaximo = () => {
    const prestamoMaximo = calcularPrestamoMaximo( ingresosTotales, tasaAnual, plazoFinanciamiento, ingresoRatio, saldoDelPrecio, seguroDesempleo, gastosAdministrativos);
    // alert(`Califica para un crédito máximo de ${prestamoMaximo}`)
    setMostrarAlerta(true)
    setValorPrestamo(prestamoMaximo);
  };

  const handleExportToExcel = () => {
    const header = {
      'Nombre y Apellido': nombre,
      Edad: edad + ' años',
      DNI: dni,
      Email: email,
      'Fecha De Nacimiento': birthday,
      'Valor De La Unidad': 'USD ' + valorUnidad,
      'Valor Del Prestamo': 'USD ' + valorPrestamo,
      'Plazo Del Financiamiento': plazoFinanciamiento + ' meses',
      'Porcentaje del saldo del precio': saldoDelPrecio + ' %',
      'Pocentaje seguro se desempleo': seguroDesempleo + ' %',
      'Pocentaje gastos administrativos': gastosAdministrativos + ' %',
      'Total ingresos mensuales': 'USD ' + ingresosTotales,
    };

    const csvData = cuotas.map((c) => {
      return {
        'NRO. DE CUOTA': c['NRO. DE CUOTA'],
        'CAPITAL AMORTIZADO': c['CAPITAL AMORTIZADO'].toFixed(2),
        INTERÉS: c['INTERÉS'].toFixed(2),
        'CUOTA PURA': c['CUOTA PURA'].toFixed(2),
        'CUOTA A PAGAR': c['CUOTA A PAGAR'],
        'SALDO DEL PRECIO': c['SALDO DEL PRECIO'],
        'SEGURO DE DESEMPLEO': c['SEGURO DE DESEMPLEO'],
        'GASTOS ADMINISTRATIVOS': c['GASTOS ADMINISTRATIVOS'],
        'CAPITAL REMANENTE': c['CAPITAL REMANENTE'].toFixed(2),
      };
    });
    // exportToExcel(csvData, header, 'cuotas hipotecarias');
    exportToExcel(csvData, header, `${nombre} cuotas hipotecarias`);
  };

  return (
    <main className="flex flex-col items-center mx-auto mb-14 md:mb-0">
      <Stepper parteDelFormulario={parteDelFormulario} />
      {/* //////////// */}
      {/* P A R T E  1 */}
      {/* //////////// */}
      {parteDelFormulario === 1 && (
        <>
          <div className="flex flex-col w-64">
            {/* <Link
              className="fixed bottom-4 left-4 h-14 md:left-40 md:bottom-10 bg-blue-500 text-white text-center text-sm py-2 px-3 rounded-md border mr-2 md:w-32 flex items-center opacity-80 hover:opacity-100 transition-opacity duration-300"
              href={'/'}
            >
              {' '}
              Calcular por préstamo{' '}
            </Link> */}

            <div className="border-gray-500 border text-center rounded p-2 text-gray-600 bg-gray-100 w-full">
              Total de ingresos mensuales: {ingresosTotales} USD
            </div>
            
            <div className="flex flex-col lg:flex-row justify-around place-items-start w-64 lg:gap-4 mt-10 top-0">
              <section className="bg-white bg-opacity-30 rounded-lg self-center p-2">
                <h3 className="w-64 font-bold text-center">Propietario 1</h3>
                <section className="flex flex-col items-center m-1">
                  <label htmlFor="ingresosNetosMensuales" className="block">
                    Ingresos netos mensuales:
                  </label>

                  <div className="mb-4 border rounded-md">
                    <input
                      type="number"
                      id="ingresosNetosMensuales"
                      value={ingresosNetosMensuales}
                      onChange={(e) =>
                        setIngresosNetosMensuales(e.target.value)
                      }
                      className="border rounded-md px-3 py-2 w-1/2"
                    />
                    <span className="self-center ml-2">
                      {ingresosNetosMensuales && 'USD'}
                    </span>
                  </div>
                  {/* </div> */}

                  <div className="mb-4 flex items-center justify-between px-4">
                    <select
                      id="vehiculoPropio"
                      value={vehiculoPropio}
                      onChange={(e) => setVehiculoPropio(e.target.value)}
                      className="form-select h-8 w-16 text-black rounded-md"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <label
                      htmlFor="vehiculoPropio"
                      className="ml-4 block text-sm text-gray-900"
                    >
                      Cantidad de vehículos propios (-150 USD c/u):
                    </label>
                  </div>

                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="esSocioDeUnClub"
                      checked={esSocioDeUnClub === 100}
                      onChange={(e) =>
                        setEsSocioDeUnClub(e.target.checked ? 100 : 0)
                      }
                      className="form-checkbox h-6 w-6 text-blue-600"
                    />
                    <label
                      htmlFor="esSocioDeUnClub"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Es socio de un club (-100 USD)
                    </label>
                  </div>
                </section>
              </section>
              <br />

              <section className="bg-white bg-opacity-30 rounded-lg self-center p-2">
                <h3 className="w-64 font-bold text-center">Propietario 2</h3>
                <section className="flex flex-col items-center m-1">
                  <label htmlFor="ingresosNetosMensuales2" className="block">
                    Ingresos netos mensuales:
                  </label>

                  <div className="mb-4 border rounded-md">
                    <input
                      type="number"
                      id="ingresosNetosMensuales2"
                      value={ingresosNetosMensuales2}
                      onChange={(e) =>
                        setIngresosNetosMensuales2(e.target.value)
                      }
                      className="border rounded-md px-3 py-2 w-1/2"
                    />
                    <span className="self-center ml-2">
                      {ingresosNetosMensuales2 && 'USD'}
                    </span>
                  </div>
                  <div className="mb-4 flex items-center justify-between px-4">
                    <select
                      id="vehiculoPropio2"
                      value={vehiculoPropio2}
                      onChange={(e) => setVehiculoPropio2(e.target.value)}
                      className="form-select h-8 w-16 text-black rounded-md"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <label
                      htmlFor="vehiculoPropio2"
                      className="ml-4 block text-sm text-gray-900"
                    >
                      Cantidad de vehículos propios (-150 USD c/u):
                    </label>
                  </div>

                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="esSocioDeUnClub2"
                      checked={esSocioDeUnClub2 === 100}
                      onChange={(e) =>
                        setEsSocioDeUnClub2(e.target.checked ? 100 : 0)
                      }
                      className="form-checkbox h-6 w-6 text-blue-600"
                    />
                    <label
                      htmlFor="esSocioDeUnClub2"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Es socio de un club (-100 USD)
                    </label>
                  </div>
                </section>
              </section>
              <br />

              <section className="bg-white bg-opacity-30 rounded-lg self-center p-2">
                <h3 className="w-64 font-bold text-center">Propietario 3</h3>
                <section className="flex flex-col items-center m-1">
                  <label
                    htmlFor="ingresosNetosMensuales3"
                    className="block text-sm"
                  >
                    Ingresos netos mensuales:
                  </label>

                  <div className="mb-4 border rounded-md">
                    <input
                      type="number"
                      id="ingresosNetosMensuales3"
                      value={ingresosNetosMensuales3}
                      onChange={(e) =>
                        setIngresosNetosMensuales3(e.target.value)
                      }
                      className="border rounded-md px-3 py-2 w-1/2"
                    />
                    <span className="self-center ml-2">
                      {ingresosNetosMensuales3 && 'USD'}
                    </span>
                  </div>

                  <div className="mb-4 flex items-center justify-between px-4">
                    <select
                      id="vehiculoPropio3"
                      value={vehiculoPropio3}
                      onChange={(e) => setVehiculoPropio3(e.target.value)}
                      className="form-select h-8 w-16 text-black rounded-md"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <label
                      htmlFor="vehiculoPropio3"
                      className="ml-4 block text-sm text-gray-900"
                    >
                      Cantidad de vehículos propios (-150 USD c/u):
                    </label>
                  </div>

                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="esSocioDeUnClub3"
                      checked={esSocioDeUnClub3 === 100}
                      onChange={(e) =>
                        setEsSocioDeUnClub3(e.target.checked ? 100 : 0)
                      }
                      className="form-checkbox h-6 w-6 text-blue-600"
                    />
                    <label
                      htmlFor="esSocioDeUnClub3"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Es socio de un club (-100 USD)
                    </label>
                  </div>
                </section>
              </section>
            </div>
          </div>
        </>
      )}

      {/* //////////// */}
      {/* P A R T E  2 */}
      {/* //////////// */}

      {parteDelFormulario === 2 && (
        <div className="flex flex-col w-64">
          {mostrarAlerta && <AlertPrestamoMax valorPrestamo={valorPrestamo} cerrarAlerta={()=>(setMostrarAlerta(false))}/>}
          <button
            // disabled={disabled}
            onClick={handleCalcularPrestamoMaximo}
            className="w-30 bg-blue-500 text-white text-center py-2 px-3 mb-3 rounded-md border flex items-center opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            <span>Calcular préstamo máximo</span>
          </button>
          <section className="flex flex-col md:flex-row justify-center gap-10 w-full">

            <div open className="bg-white bg-opacity-30 rounded-lg p-2">
              <div className="mb-4 w-60">
                <label htmlFor="valorUnidad" className="block">
                  Valor total de la unidad:
                </label>
                <div className="flex w-full border rounded-md">
                  <input
                    type="number"
                    id="valorUnidad"
                    value={valorUnidad}
                    onChange={(e) => setValorUnidad(e.target.value)}
                    className="w-1/2 border rounded-md px-3 py-2"
                    step="100"
                    min="1000"
                    max="150000"
                    />
                  <span className="self-center ml-2">
                    {saldoDelPrecio && 'USD'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="valorPrestamo" className="block">
                  Valor del préstamo:
                </label>
                <div className="flex w-full border rounded-md">
                  <input
                    type="number"
                    id="valorPrestamo"
                    value={valorPrestamo}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue >= 0 && newValue <= 150000) {
                        setValorPrestamo(newValue);
                      }
                    }}
                    // className="w-1/2 border rounded-md px-3 py-2"
                    className={valorPrestamo 
                      ? "w-1/2 border border-gray-300 rounded-md px-3 py-2"
                      : "w-1/2 border-4 border-red-300 rounded-md px-3 py-2"}
                    step="100"
                    min="1000"
                    max="150000"
                  />
                  <span className="self-center ml-2">
                    {saldoDelPrecio && 'USD'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="plazoFinanciamiento" className="block">
                  Plazo del financiamiento:
                </label>
                <div className="flex w-full border rounded-md">
                  <input
                    type="number"
                    id="plazoFinanciamiento"
                    value={plazoFinanciamiento}
                    onChange={(e) => {
                      let value = parseInt(e.target.value);
                      if (isNaN(value) || value < 0) value = 0; // Si value es NaN o menor que 0, establece value en 0
                      if (value > 120) value = 120;
                      setPlazoFinanciamiento(Number(value));
                    }}
                    min="1"
                    max="120"
                    className="w-1/2 border rounded-md px-3 py-2"
                  />
                  <span className="self-center ml-2">
                    {saldoDelPrecio && 'meses'}
                  </span>
                </div>
              </div>

              {calcularEdad(birthday, plazoFinanciamiento) > 70 ? (
                <div className="border-red-500 border text-center rounded p-2 text-red-600 bg-red-100 w-full">
                  Exceso en cuotas + edad
                </div>
              ) : null}

              <div className="mb-4">
                <label htmlFor="tasaAnual" className="block">
                  Tasa anual:
                </label>
                <div className="flex w-full border rounded-md">
                  <input
                    type="number"
                    id="tasaAnual"
                    value={tasaAnual}
                    onChange={(e) => setTasaAnual(e.target.value)}
                    className="w-1/2 border rounded-md px-3 py-2"
                  />
                  <span className="self-center ml-2">
                    {saldoDelPrecio && '%'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="saldoDelPrecio" className="block">
                  Saldo del precio:
                </label>
                <div className="flex w-full border rounded-md">
                  <input
                    type="number"
                    id="saldoDelPrecio"
                    value={saldoDelPrecio}
                    onChange={(e) => setSaldoDelPrecio(e.target.value)}
                    className="w-1/2 px-3 py-2"
                  />
                  <span className="self-center ml-2">
                    {saldoDelPrecio && '%'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="seguroDesempleo" className="block">
                  Seguro de desempleo
                </label>
                <div className="flex w-full border rounded-md">
                  <input
                    type="number"
                    id="seguroDesempleo"
                    value={seguroDesempleo}
                    onChange={(e) => setSeguroDesempleo(e.target.value)}
                    className="w-1/2 border rounded-md px-3 py-2"
                  />
                  <span className="self-center ml-2">
                    {saldoDelPrecio && '% anual'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="gastosAdministrativos" className="block">
                  Gastos administrativos
                </label>
                <div className="flex w-full border rounded-md">
                  <input
                    type="number"
                    id="gastosAdministrativos"
                    value={gastosAdministrativos}
                    onChange={(e) => setGastosAdministrativos(e.target.value)}
                    className="w-1/2 border rounded-md px-3 py-2"
                  />
                  <span className="self-center ml-2">
                    {saldoDelPrecio && '% mensual'}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-30 rounded-lg p-2 w-64">
              <section className="flex flex-col w-60">
                <div className="mb-4 ">
                  <label htmlFor="nombre" className="block">
                    Nombre y Apellido
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 "
                  />
                </div>
              </section>

              <section className="flex flex-col">
                <div className="mb-4 flex flex-row gap-2">
                  <select
                    id="tipoDeId"
                    value={tipoDeId}
                    onChange={(e) => setTipoDeId(e.target.value)}
                    className={tipoDeId === 'DNI' || tipoDeId === 'CI' 
                      ?  "form-select w-2/5 text-black rounded-md text-lg"
                      : "form-select w-2/5 text-black rounded-md text-sm"
                    }
                  >
                    <option value="">Elije una opción</option>
                    <option value="CI">CI</option>
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>

                  <input
                    type="number"
                    id="dni"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    className="w-3/5 border rounded-md px-3 py-2"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </section>

              <div className="mb-4">
                <label htmlFor="birthday" className="block">
                  Fecha de nacimiento:
                </label>
                <input
                  type="date"
                  id="birthday"
                  value={birthday}
                  onChange={(e) => {
                    // const selectedDate = new Date(e.target.value);
                    // if (selectedDate >= minDate && selectedDate <= maxDate) {
                    setBirthday(e.target.value);
                    setEdad(calcularEdad(e.target.value));
                    // }
                  }}
                  // className="w-full border rounded-md px-3 py-2"
                  max={maxDate.toISOString().split('T')[0]}
                  min={minDate.toISOString().split('T')[0]}
                  className={edad 
                    ? "block w-full border border-gray-300 rounded-md px-3 py-2"
                    : "block w-full border-4 border-red-300 rounded-md px-3 py-2"}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="edad"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  Edad: {edad}
                </label>
              </div>
            </div>
          </section>
          
        </div>
      )}

      {/* //////////// */}
      {/* P A R T E  3 */}
      {/* //////////// */}

      {parteDelFormulario === 3 && (
        <div className="flex flex-col w-full items-center max-h-screen md:px-10 pb-10">
          {/* <h1 className="text-center font-semibold text-xl m-4 w-32">
            {nombre} {apellido}
          </h1> */}
          <section className="bg-white bg-opacity-30 rounded-lg self-center p-1 w-68 lg:w-full">
            <h3 className="text-center border-b-2 border-black">
              {' '}
              <b>{nombre}</b>
            </h3>
            <ul className="flex flex-col lg:flex-row justify-evenly">
              <div>
                <li>Edad: {edad} años </li>
                <li>{tipoDeId}: {dni} </li>
                <li>Valor de la unidad: USD {valorUnidad}</li>
                <li>Valor del préstamo: USD {valorPrestamo}</li>
                <li>Plazo del financiamiento: {plazoFinanciamiento} meses</li>
              </div>
              <div>
                <li>Saldo del precio: {saldoDelPrecio}%</li>
                <li>Seguro de desempleo: {seguroDesempleo}%</li>
                <li>Gastos administrativos: {gastosAdministrativos}%</li>
                <li>Total ingresos mensuales: USD {ingresosTotales}</li>
              </div>
            </ul>
          </section>

          {ingresosTotales < cuota ? (
            <div className="border-red-500 border rounded p-6 text-red-600 bg-red-100 w-fit absolute top-1/3">
              Ingresos insuficientes. Diferencia: {cuota - ingresosTotales}
            </div>
          ) : (
            <section className="mt-2 overflow-y-auto overflow-x-auto w-72 lg:w-full rounded-md">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal sticky top-0">
                    <th className="py-3 px-4 text-right text-xs">
                      Nº DE CUOTA
                    </th>
                    <th className="py-3 px-4 text-right text-xs">
                      CAPITAL AMORTIZADO
                    </th>
                    <th className="py-3 px-4 text-right text-xs">INTERÉS</th>
                    <th className="py-3 px-4 text-right text-xs">CUOTA PURA</th>
                    <th className="py-3 px-4 text-right text-xs">
                      CUOTA A PAGAR
                    </th>
                    <th className="py-3 px-4 text-right text-xs">
                      SALDO DEL PRECIO
                    </th>
                    <th className="py-3 px-4 text-right text-xs">
                      SEGURO DE DESEMPLEO
                    </th>
                    <th className="py-3 px-4 text-right text-xs">
                      GASTOS ADMIN
                    </th>
                    <th className="py-3 px-4 text-right text-xs">
                      CAPITAL REMANENTE
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-900 text-sm font-light bg-white bg-opacity-50">
                  {cuotas.map((c) => (
                    <tr
                      className="border-b border-gray-500 hover:bg-gray-100"
                      key={c['NRO. DE CUOTA']}
                    >
                      <td className="py-3 px-4 text-center">
                        {c['NRO. DE CUOTA']}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {c['CAPITAL AMORTIZADO'].toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {c['INTERÉS'].toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {c['CUOTA PURA'].toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center border-r border-gray-500">
                        {c['CUOTA A PAGAR']}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {c['SALDO DEL PRECIO']}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {c['SEGURO DE DESEMPLEO']}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {c['GASTOS ADMINISTRATIVOS']}
                      </td>
                      <td className="py-3 px-4 text-center border-l-4 border-double border-gray-500">
                        {c['CAPITAL REMANENTE'].toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br />
              <br />
            </section>
          )}

          <button
            disabled={
              calcularEdad(currentDate, plazoFinanciamiento) ||
              ingresosTotales < cuota
            }
            variant="contained"
            onClick={handleExportToExcel}
            className={
              ingresosTotales < cuota
                ? 'fixed right-4 bottom-4 h-14 w-14 md:right-40 md:bottom-10 bg-gray-500 text-black py-2 px-3 rounded-md md:w-32 flex justify-evenly items-center opacity-30'
                : 'fixed right-4 bottom-4 h-14 w-14 md:right-40 md:bottom-10 bg-blue-500 text-white py-2 px-3 rounded-md md:w-32 flex justify-evenly items-center opacity-50 hover:opacity-100 transition-opacity duration-300'
            }
          >
            <span className="hidden md:block">Excel </span>
            <div className="bg-white rounded-md p-1">
              <Image
                src="/images/excel-icon.svg"
                alt="Logo"
                width={30}
                height={30}
              />
            </div>
          </button>
        </div>
      )}

      {/* ///////////////// */}
      {/* P A G I N C I Ó N */}
      {/* ///////////////// */}

      {parteDelFormulario > 1 && <BackButton handlePrevious={handlePrevious} />}

      {parteDelFormulario === 1 && (
        <NextButton
          handleNext={handleNext}
          // disabled={calcularEdad(birthday, plazoFinanciamiento) > 70 }
        />
      )}

      {parteDelFormulario === 2 && (
        <NextButton
          handleNext={handleNext}
          disabled={calcularEdad(birthday, plazoFinanciamiento) > 70 || !edad || !valorPrestamo}
        />
      )}
    </main>
  );
};

export default Form2;
