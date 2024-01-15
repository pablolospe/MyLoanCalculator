import { useSpring, animated } from 'react-spring';

function Stepper({ parteDelFormulario }) {
  const bar1Styles = useSpring({
    width: parteDelFormulario >= 2 ? '100%' : '0%',
  });

  const bar2Styles = useSpring({
    width: parteDelFormulario >= 3 ? '100%' : '0%',
  });

  const bar3Styles = useSpring({
    width: parteDelFormulario >= 4 ? '100%' : '0%',
  });

  return (
    <div className="flex items-start w-80 mx-auto mb-4">
      <div className="w-full">
              <div className="mt-2 self-center">
                {/* <h6 className="text-base font-bold text-blue-500 text-center">Ingresos</h6> */}
                <p className="text-xs text-gray-600">Datos personales</p>
              </div>
        <div className="flex items-center w-full">
          <div className="w-8 h-8 shrink-0 mx-[-1px] bg-blue-500 p-1.5 flex items-center justify-center rounded-full">
            <span className="text-base text-white font-bold">1</span>
          </div>
          <div className="w-full h-1 mx-4 rounded-lg bg-gray-300">
            <animated.div
              className="h-full bg-blue-500 rounded-lg"
              style={bar1Styles}
            ></animated.div>
          </div>
        </div>
      </div>

      <div className="w-full">
              <div className="mt-2 self-center">
                <p className="text-xs text-gray-600">Ingresos <br/> totales</p>
              </div>
        <div className="flex items-center w-full">
          <div
            className={
              parteDelFormulario < 2
                ? 'w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full'
                : 'w-8 h-8 shrink-0 mx-[-1px] bg-blue-500 p-1.5 flex items-center justify-center rounded-full'
            }
          >
            <span className="text-base text-white font-bold">2</span>
          </div>
          <div className="w-full h-1 mx-4 rounded-lg bg-gray-300">
            <animated.div
              className="h-full bg-blue-500 rounded-lg"
              style={bar2Styles}
            ></animated.div>
          </div>
        </div>
      </div>

      <div className="w-full">
            <div className="mt-2 self-center"> 
                <p className="text-xs text-gray-600">Datos del prestamo</p>
              </div>
        <div className="flex items-center w-full">
          <div
            className={
              parteDelFormulario < 3
                ? 'w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full'
                : 'w-8 h-8 shrink-0 mx-[-1px] bg-blue-500 p-1.5 flex items-center justify-center rounded-full'
            }
          >
            <span className="text-base text-white font-bold">3</span>
          </div>
          <div className="w-full h-1 mx-4 rounded-lg bg-gray-300">
            <animated.div
              className="h-full bg-blue-500 rounded-lg"
              style={bar3Styles}
            ></animated.div>
          </div>
        </div>
      </div>

      <div>
              <div className="mt-2 self-center">
                <p className="text-xs text-gray-600">Tabla/ Excel</p>
              </div>
        <div className="flex items-center">
          <div
            className={
              parteDelFormulario < 4
                ? 'w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full'
                : 'w-8 h-8 shrink-0 mx-[-1px] bg-blue-500 p-1.5 flex items-center justify-center rounded-full'
            }
          >
            <span className="text-base text-white font-bold">4</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stepper;

// Versión sin la animación: npm install react-spring

// function Stepper({ parteDelFormulario }) {
//   return (
//     <div className="flex items-start w-80 mx-auto">
//       <div className="w-full">
//         <div className="flex items-center w-full">
//           <div className="w-8 h-8 shrink-0 mx-[-1px] bg-blue-500 p-1.5 flex items-center justify-center rounded-full">
//             <span className="text-base text-white font-bold">1</span>
//           </div>
//           <div 
//             className={
//                 parteDelFormulario < 2 
//                 ? "w-full h-1 mx-4 rounded-lg bg-gray-300"
//                 : "w-full h-1 mx-4 rounded-lg bg-blue-500"
//             }
//           ></div>
//         </div>
//         <div className="mt-2 mr-4">
//           {/* <h6 className="text-base font-bold text-blue-500">Personal Info</h6> */}
//           {/* <p className="text-xs text-gray-400">Completed</p> */}
//         </div>
//       </div>
//       <div className="w-full">
//         <div className="flex items-center w-full">
//           <div
//             className={
//               parteDelFormulario < 2
//                 ? 'w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full'
//                 : 'w-8 h-8 shrink-0 mx-[-1px] bg-blue-500 p-1.5 flex items-center justify-center rounded-full'
//             }
//           >
//             <span className="text-base text-white font-bold">2</span>
//           </div>
//           <div 
//             className={
//                 parteDelFormulario < 3
//                 ? "w-full h-1 mx-4 rounded-lg bg-gray-300"
//                 : "w-full h-1 mx-4 rounded-lg bg-blue-500"
//             }
//           ></div>
//         </div>
//         <div className="mt-2 mr-4">
//           {/* <h6 className="text-base font-bold text-blue-500">Education</h6> */}
//           {/* <p className="text-xs text-gray-400">Completed</p> */}
//         </div>
//       </div>
//       <div>
//         <div className="flex items-center">
//         <div
//             className={
//               parteDelFormulario < 3
//                 ? 'w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full'
//                 : 'w-8 h-8 shrink-0 mx-[-1px] bg-blue-500 p-1.5 flex items-center justify-center rounded-full'
//             }
//           >
//             <span className="text-base text-white font-bold">3</span>
//           </div>
//         </div>
//         <div className="mt-2">
//           {/* <h6 className="text-base font-bold text-blue-500">Review</h6> */}
//           {/* <p className="text-xs text-gray-400">Pending</p> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Stepper;
