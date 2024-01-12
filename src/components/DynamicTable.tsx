import React from "react";
// import { useState, useEffect } from "react";
// import { formatDateString } from '../utils/handleDate';
import {
  DATE_PRELIMINARES, DATE_CUARTOS, DATE_SEMIFINALES, DATE_FINAL, classNameBoxActive,
  classNameGradient,
  classNameGradientHight,
  classNameGradientDisable
} from "../data/ConstantsCoac2024";
// import { formatDateDDmmYYYY } from "../utils/handleDate";

interface Group {
  top?: boolean;
  tipo: string;
  nombre: string;
  autor: string;
  id?: string;
}

interface Data {
  [date: string]: Group[];
}

interface DynamicTableProps {
  currentSession: string,
  data: Data;
}


const DynamicTable: React.FC<DynamicTableProps> = ({ currentSession, data }) => {

  const currentFaseDate = DATE_PRELIMINARES;

  //   function getOngoingEvent() {
  //     const now = new Date();
  //     const events = [
  //         { start: new Date(DATE_PRELIMINARES), end: new Date(DATE_PRELIMINARES).setDate(new Date(DATE_PRELIMINARES).getDate() + 1) },
  //         { start: new Date(DATE_CUARTOS), end: new Date(DATE_CUARTOS).setDate(new Date(DATE_CUARTOS).getDate() + 1) },
  //         { start: new Date(DATE_SEMIFINALES), end: new Date(DATE_SEMIFINALES).setDate(new Date(DATE_SEMIFINALES).getDate() + 1) },
  //         { start: new Date(DATE_FINAL), end: new Date(DATE_FINAL).setDate(new Date(DATE_FINAL).getDate() + 1) }
  //     ];

  //     for (let event of events) {
  //         if (now >= event.start && now < event.end) {
  //           console.log(event.start);
  //             return event.start;
  //         }
  //     }

  //     return null; // No hay eventos en curso si no se cumple ninguna condición.
  // }

  //   const currentFaseDate = getOngoingEvent();




  return (
    <div className=" max-w-4xl mx-auto">
      {Object.entries(data).map(([date, groups]) => (
        <div key={date} className={`px-4 py-12 coac-session mt-8 ${currentSession === date ? classNameBoxActive : ''}`} id={date}>
          <h2 className={`text-2xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent  uppercase  ${currentSession === date ? classNameGradientHight : classNameGradient}}`}>
            Sesión - {date}
          </h2>
          <div className="overflow-x-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded">
            <section className="min-w-full  divide-y divide-gray-200">
              <header className={`flex flex-auto ${currentSession === date ? classNameGradientHight : classNameGradient}}`}>

                <div className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Hora / Tipo
                </div>
                <div className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Autor / Nombre de agrupación
                </div>

              </header>
              <main className=" divide-y divide-gray-200">
                {groups.map((group, index) => {
                  // Calcular el horario en función del índice actual y el horario de inicio (20:00)
                  const startTime = new Date(currentFaseDate);
                  const timeIncrement = 30;
                  const currentRowTime = new Date(
                    startTime.getTime() + index * timeIncrement * 60000
                  );
                  const formattedTime = currentRowTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  // Comprobar si la hora actual coincide con la hora de la fila
                  const isLive = false;
                  // const isLive =
                  //   currentTime.getTime() >= currentRowTime.getTime() &&
                  //   currentTime.getTime() <
                  //   currentRowTime.getTime() + timeIncrement * 60000;


                  const highlightRowClass = group.autor ? (group.top ? `bg-rose-700 text-rose-50` : ``) : '';
                  const rowClass = "flex flex-auto" + " " + highlightRowClass;
                  const onAirClass = `${isLive
                    ? " bg-pink-50 font-bold text-pink-700  text-white blinking"
                    : ""
                    }`;



                  return (
                    <article key={index} className={rowClass}>
                      <div className="px-4 py-2 ">
                        <div className="flex flex-col justify-center h-full w-20">
                          <span className="">{group.tipo}</span>
                          <span className={onAirClass}> {isLive ? "📡EN DIRECTO" : formattedTime}</span>
                        </div>
                      </div>
                      <div className="px-4 py-4">
                        <strong id={group.id} className="sm:text-xl capitalize  text-ellipsis overflow-hidden">
                          {group.autor ? (group.top ? `🔥${group.autor}🔥` : `👌 ${group.autor}`) : ''}
                        </strong>
                        <p className="text-ellipsis overflow-hidden">{group.nombre}</p>
                      </div>
                    </article>
                  );
                })}
              </main>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicTable;
