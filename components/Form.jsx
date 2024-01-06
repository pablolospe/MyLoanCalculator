'use client';

import { useState, useEffect } from 'react';
import { calcularEdad } from '@/utils/calcularEdad';
import { calcularIngresos } from '@/utils/calcularIngresos';
import { exportToExcel } from '@/utils/exportToExcel';
import { calcularTablaAmortizacion } from '@/utils/calcularTablaAmortizacion';
import BackButton from './BackButton';
import NextButton from './NextButton';
import ToggleDetails from './ToggleDetails';
import Image from 'next/image';

const FormOp2 = () => {
  const [parteDelFormulario, setParteDelFormulario] = useState(1);
  // Estado para controlar qué parte del formulario se muestra

  const handleNext = (e) => {
    e.preventDefault();
    if (parteDelFormulario < 3) setParteDelFormulario(parteDelFormulario + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (parteDelFormulario > 1) setParteDelFormulario(parteDelFormulario - 1);
  };

  const [nombre, setNombre] = useState('John');
  const [apellido, setApellido] = useState('Doe');
  const [dni, setDni] = useState('23456789');
  const [email, setEmail] = useState('jd@gmail.com');
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

  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setFullYear(currentDate.getFullYear() - 18);
  const minDate = new Date(currentDate);
  minDate.setFullYear(currentDate.getFullYear() - 65);

  useEffect(() => {
    // setIngresosTotales(calcularIngresos( ingresosNetosMensuales, ingresosNetosMensuales2, ingresosNetosMensuales3, vehiculoPropio, vehiculoPropio2, vehiculoPropio3, esSocioDeUnClub, esSocioDeUnClub2, esSocioDeUnClub3));

    const result = calcularTablaAmortizacion(
      valorPrestamo,
      tasaAnual,
      plazoFinanciamiento,
      saldoDelPrecio,
      seguroDesempleo,
      gastosAdministrativos
    );
    setCuotas(result);
    if (result.length > 0) setCuota(result[0]['FEE TO PAY']);

    setIngresosTotales(
      calcularIngresos(
        ingresosNetosMensuales,
        ingresosNetosMensuales2,
        ingresosNetosMensuales3,
        vehiculoPropio,
        vehiculoPropio2,
        vehiculoPropio3,
        esSocioDeUnClub,
        esSocioDeUnClub2,
        esSocioDeUnClub3
      )
    );
  }, [
    valorPrestamo,
    tasaAnual,
    plazoFinanciamiento,
    cuota,
    saldoDelPrecio,
    seguroDesempleo,
    gastosAdministrativos,
    edad,
    setIngresosTotales,
    ingresosNetosMensuales,
    ingresosNetosMensuales2,
    ingresosNetosMensuales3,
    vehiculoPropio,
    vehiculoPropio2,
    vehiculoPropio3,
    esSocioDeUnClub,
    esSocioDeUnClub2,
    esSocioDeUnClub3,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleExportToExcel = () => {
    const header = {
      Name: nombre + apellido,
      Age: edad + ' years old',
      DNI: dni,
      Email: email,
      Birthday: birthday,
      'Unit Value': 'USD ' + valorUnidad,
      'Loan Value': 'USD ' + valorPrestamo,
      'Financing Term': plazoFinanciamiento + ' months',
      'Life insurance percentage': saldoDelPrecio + ' %',
      'Unemployment insurance percentage': seguroDesempleo + ' %',
      'Administrative expenses percentage': gastosAdministrativos + ' %',
      'Total monthly income': 'USD ' + ingresosTotales,
    };

    const csvData = cuotas.map((c) => {
      return {
        'FEE NO.': c['FEE NO.'],
        'AMORTIZED CAPITAL': c['AMORTIZED CAPITAL'],
        INTEREST: c['INTEREST'],
        'PURE FEE': c['PURE FEE'],
        'FEE TO PAY': c['FEE TO PAY'],
        'LIFE INSURANCE': c['LIFE INSURANCE'],
        'UNEMPLOYMENT INSURANCE': c['UNEMPLOYMENT INSURANCE'],
        'ADMIN EXPENCES': c['ADMIN EXPENCES'],
        'REMAINING CAPITAL': c['REMAINING CAPITAL'],
      };
    });
    // exportToExcel(csvData, header, 'cuotas hipotecarias');
    exportToExcel(csvData, header, `${nombre} ${apellido} cuotas hipotecarias`);
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto">
      {/* //////////// */}
      {/* P A R T E  1 */}
      {/* //////////// */}
      {parteDelFormulario === 1 && (
        <div className="flex flex-col w-64">
          <h1 className="text-center font-semibold text-xl m-4 ">
          My Loan Calculator
          </h1>
          {/* <ToggleDetails /> */}
          <section className="flex flex-col md:flex-row justify-center gap-10">
            <details open className="bg-white bg-opacity-30 rounded-lg p-2">
              <summary className="w-64">Personal information</summary>
              <section className="flex flex-col">
                <div className="mb-4 ">
                  <label htmlFor="nombre" className="block">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 "
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="apellido" className="block">
                    Lastname:
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </section>

              <section className="flex flex-col">
                <div className="mb-4">
                  <label htmlFor="dni" className="block">
                    DNI:
                  </label>
                  <input
                    type="number"
                    id="dni"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
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
                  Birthday:
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
                  className="w-full border rounded-md px-3 py-2"
                  max={maxDate.toISOString().split('T')[0]}
                  min={minDate.toISOString().split('T')[0]}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="edad"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  Age: {edad}
                </label>
              </div>
            </details>

            <details open className="bg-white bg-opacity-30 rounded-lg p-2">
              <summary className="w-64">Loan Details</summary>

              <div className="mb-4">
                <label htmlFor="valorUnidad" className="block">
                  Unit Value:
                </label>
                <div className="flex w-full border rounded-md">
                  <input
                    type="number"
                    id="valorUnidad"
                    value={valorUnidad}
                    onChange={(e) => setValorUnidad(e.target.value)}
                    className="w-1/2 border rounded-md px-3 py-2"
                  />
                  <span className="self-center ml-2">
                    {saldoDelPrecio && 'USD'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="valorPrestamo" className="block">
                  Loan Value:
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
                    className="w-1/2 border rounded-md px-3 py-2"
                    min="0"
                    max="150000"
                  />
                  <span className="self-center ml-2">
                    {saldoDelPrecio && 'USD'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="plazoFinanciamiento" className="block">
                  Financing Term:
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
                  Excess in quotas + age
                </div>
              ) : null}

              <div className="mb-4">
                <label htmlFor="tasaAnual" className="block">
                  Annual Rate:
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
                  Life Insurance:
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
                  Unemployment Insurance:
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
                  Administrative Expenses:
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
            </details>
          </section>
        </div>
      )}

      {/* //////////// */}
      {/* P A R T E  2 */}
      {/* //////////// */}

      {parteDelFormulario === 2 && (
        <div className="flex flex-col w-64">
          <h1 className="text-center font-semibold text-xl m-4">
            Monthly Income:
          </h1>

          <div className="border-gray-500 border text-center rounded p-2 text-gray-600 bg-gray-100 w-full">
            Total Revenue: {ingresosTotales} USD
          </div>
          {/* <ToggleDetails /> */}
          <div className="flex flex-col lg:flex-row justify-around place-items-start w-64 lg:gap-4 mt-10 top-0">
            <details
              open
              className="bg-white bg-opacity-30 rounded-lg self-center p-2"
            >
              <summary className="w-64">First Owner</summary>
              <section className="flex flex-col items-center m-1">
                {/* <div className=""> */}
                <label htmlFor="ingresosNetosMensuales" className="block">
                  Monthly Net Income:
                </label>

                <div className="mb-4 border rounded-md">
                  <input
                    type="number"
                    id="ingresosNetosMensuales"
                    value={ingresosNetosMensuales}
                    onChange={(e) => setIngresosNetosMensuales(e.target.value)}
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
                    Number of own vehicles (-150 USD each):
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
                    Is a member of a club (-100 USD):
                  </label>
                </div>
              </section>
            </details>
            <br />

            <details
              open
              className="bg-white bg-opacity-30 rounded-lg self-center p-2"
            >
              <summary className="w-64">Second Owner</summary>
              <section className="flex flex-col items-center m-1">
                {/* <div className=""> */}
                <label htmlFor="ingresosNetosMensuales2" className="block">
                  Monthly Net Income:
                </label>

                <div className="mb-4 border rounded-md">
                  <input
                    type="number"
                    id="ingresosNetosMensuales2"
                    value={ingresosNetosMensuales2}
                    onChange={(e) => setIngresosNetosMensuales2(e.target.value)}
                    className="border rounded-md px-3 py-2 w-1/2"
                  />
                  <span className="self-center ml-2">
                    {ingresosNetosMensuales2 && 'USD'}
                  </span>
                </div>
                {/* </div> */}

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
                    Number of own vehicles (-150 USD each):{' '}
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
                    Is a member of a club (-100 USD):
                  </label>
                </div>
              </section>
            </details>
            <br />

            <details
              open
              className="bg-white bg-opacity-30 rounded-lg self-center p-2"
            >
              <summary className="w-64">Third Owner</summary>
              <section className="flex flex-col items-center m-1">
                {/* <div className=""> */}
                <label htmlFor="ingresosNetosMensuales3" className="block">
                  Monthly Net Income:
                </label>

                <div className="mb-4 border rounded-md">
                  <input
                    type="number"
                    id="ingresosNetosMensuales3"
                    value={ingresosNetosMensuales3}
                    onChange={(e) => setIngresosNetosMensuales3(e.target.value)}
                    className="border rounded-md px-3 py-2 w-1/2"
                  />
                  <span className="self-center ml-2">
                    {ingresosNetosMensuales3 && 'USD'}
                  </span>
                </div>
                {/* </div> */}

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
                    Number of own vehicles (-150 USD each):{' '}
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
                    Is a member of a club (-100 USD):
                  </label>
                </div>
              </section>
            </details>

            {/* <CalcularButton handleCalcular={handleCalcular} /> */}
          </div>
        </div>
      )}

      {/* //////////// */}
      {/* P A R T E  3 */}
      {/* //////////// */}

      {parteDelFormulario === 3 && (
        <div className="flex flex-col w-full items-center max-h-screen md:px-10 pb-10">
          <h1 className="text-center font-semibold text-xl m-4 w-32">
            {nombre} {apellido}
          </h1>
          <section className="bg-white bg-opacity-30 rounded-lg self-center p-1 w-68 lg:w-full">
            <ul className="flex flex-col lg:flex-row justify-evenly">
              <div>
                <li>Age: {edad} years old </li>
                <li>Unit Value: USD {valorUnidad}</li>
                <li>Loan Value: USD {valorPrestamo}</li>
                <li>Financing Term: {plazoFinanciamiento} months</li>
              </div>
              <div>
                <li>Life Insurance: {saldoDelPrecio}%</li>
                <li>Unemployment Insurance: {seguroDesempleo}%</li>
                <li>Administrative Expenses: {gastosAdministrativos}%</li>
                <li>Total Monthly Income: USD {ingresosTotales}</li>
              </div>
            </ul>
          </section>

          {ingresosTotales < cuota ? (
            <div className="border-red-500 border rounded p-6 text-red-600 bg-red-100 w-fit absolute top-1/3">
              Insufficient income. Difference: {cuota - ingresosTotales}
            </div>
          ) : (
            <section className="mt-2 overflow-y-auto overflow-x-auto w-72 lg:w-full rounded-md">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal sticky top-0">
                    <th className="py-3 px-4 text-right text-xs">
                    FEE NO.
                    </th>
                    <th className="py-3 px-4 text-right text-xs">
                    AMORTIZED CAPITAL
                    </th>
                    <th className="py-3 px-4 text-right text-xs">INTEREST</th>
                    <th className="py-3 px-4 text-right text-xs">PURE FEE</th>
                    <th className="py-3 px-4 text-right text-xs">
                      FEE TO PAY
                    </th>
                    <th className="py-3 px-4 text-right text-xs">
                      LIFE INSURANCE
                    </th>
                    <th className="py-3 px-4 text-right text-xs">
                      UNEMPLOYMENT INSURANCE
                    </th>
                    <th className="py-3 px-4 text-right text-xs">
                      ADMIN EXPENCES
                    </th>
                    <th className="py-3 px-4 text-right text-xs">
                      REMAINING CAPITAL
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-900 text-sm font-light bg-white bg-opacity-50">
                  {cuotas.map((c) => (
                    <tr
                      className="border-b border-gray-500 hover:bg-gray-100"
                      key={c['FEE NO.']}
                    >
                      <td className="py-3 px-4 text-center">
                        {c['FEE NO.']}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {c['AMORTIZED CAPITAL']}
                      </td>
                      <td className="py-3 px-4 text-center">{c['INTEREST']}</td>
                      <td className="py-3 px-4 text-center">
                        {c['PURE FEE']}
                      </td>
                      <td className="py-3 px-4 text-center border-r border-gray-500">
                        {c['FEE TO PAY']}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {c['LIFE INSURANCE']}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {c['UNEMPLOYMENT INSURANCE']}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {c['ADMIN EXPENCES']}
                      </td>
                      <td className="py-3 px-4 text-center border-l-4 border-double border-gray-500">
                        {c['REMAINING CAPITAL']}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                ? 'fixed right-4 top-4 h-14 w-14 md:right-40 md:bottom-40 bg-gray-500 text-black py-2 px-3 rounded-md md:w-32 flex justify-evenly items-center opacity-30'
                : 'fixed right-4 top-4 h-14 w-14 md:right-40 md:bottom-40 bg-blue-500 text-white py-2 px-3 rounded-md md:w-32 flex justify-evenly items-center opacity-50 hover:opacity-100 transition-opacity duration-300'
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

      {parteDelFormulario < 3 && (
        <NextButton
          handleNext={handleNext}
          disabled={calcularEdad(birthday, plazoFinanciamiento) > 70}
        />
      )}
    </form>
  );
};

export default FormOp2;
