// import React from "react";
// import {
//   DATE_PRELIMINARES, classNameBoxActive,
//   classNameGradient
// } from "../data/CONSTANT_COAC_2025";
// import { parseDate } from "../utils/handleDate";

// interface Group {
//   top?: boolean;
//   modalidad: string;
//   nombre: string;
//   autor: string;
//   id?: string;
// }

// interface Data {
//   [date: string]: Group[];
// }

// interface DynamicTableProps {
//   currentSession: string,
//   data: Data;
// }

// const DynamicTable: React.FC<DynamicTableProps> = ({ currentSession, data }) => {
//   const currentFaseDate = DATE_PRELIMINARES; // TODO

//   const getSessionClass = (sessionDate: string) => {
//     const currentDate = parseDate(currentSession);
//     const compareDate = parseDate(sessionDate);

//     if (currentDate.getTime() === compareDate.getTime()) {
//       return classNameBoxActive;
//     }
//     if (currentDate.getTime() > compareDate.getTime()) {
//       return `opacity-50 hover:opacity-100 grayscale`;
//     }

//     return ``;
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       {Object.entries(data).map(([date, groups]) => {
//         const isOpen = getSessionClass(date) !== classNameBoxActive;
//         return (
//           <details key={date} open={!isOpen} className={`coac-session mt-8 ${getSessionClass(date)}`} id={date}>
//             <summary className={`px-4 py-4 text-2xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent uppercase ${classNameGradient}`}>
//               Sesión - {date}
//               <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neutral-950">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
// </svg>

//             </summary>
//             <div className="overflow-x-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded">
//               <section className="min-w-full divide-y divide-gray-200">
//                 <header className={`flex flex-auto ${classNameGradient}`}>
//                   {/* Cabeceras de la tabla */}
//                 </header>
//                 <main className="divide-y divide-gray-200">
//                   {groups.map((group, index) => {
//                     // Calcular el horario en función del índice actual y el horario de inicio (20:00)
//                     const startTime = new Date(currentFaseDate);
//                     const timeIncrement = 30;
//                     const currentRowTime = new Date(
//                       startTime.getTime() + index * timeIncrement * 60000
//                     );
//                     const formattedTime = currentRowTime.toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     });

//                     // Comprobar si la hora actual coincide con la hora de la fila
//                     const isLive = false;
//                     const highlightRowClass = group.autor ? (group.top ? `bg-rose-700 text-rose-50` : `bg-orange-50`) : '';
//                     const rowClass = "flex flex-auto" + " " + highlightRowClass;
//                     const onAirClass = `${isLive ? " bg-pink-50 font-bold text-pink-700  text-white blinking" : ""}`;


//                     return (
//                       <article id={group.id} key={index} className={rowClass}>
//                         <div className="px-4 py-2 ">
//                           <div className="flex flex-col justify-center h-full w-20">
//                             <span className="">{group.modalidad}</span>
//                             <span className={onAirClass}> {isLive ? "📡EN DIRECTO" : formattedTime}</span>
//                           </div>
//                         </div>
//                         <div className="px-4 py-4">
//                           <strong  className="sm:text-xl capitalize  text-ellipsis overflow-hidden">
//                             {group.autor ? (group.top ? `🔥${group.autor}🔥` : `👌 ${group.autor}`) : ''}
//                           </strong>
//                           <p className="text-ellipsis overflow-hidden">{group.nombre}</p>
//                         </div>
//                       </article>
//                     );
//                   })}
//                 </main>
//               </section>
//             </div>
//           </details>
//         );
//       })}
//     </div>
//   );
// };

// export default DynamicTable;
