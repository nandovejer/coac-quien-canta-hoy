import React from "react";
import { useState, useEffect } from "react";

interface Group {
  top: boolean;
  tipo: string;
  nombre: string;
  autor: string;
  id?: string;
}

interface Data {
  [date: string]: Group[];
}

interface DynamicTableProps {
  data: Data;
}




const DynamicTable: React.FC<DynamicTableProps> = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Actualizar la hora actual cada segundo
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      // Limpiar el intervalo cuando el componente se desmonta
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="p-4 my-2 max-w-4xl mx-auto">
      {Object.entries(data).map(([date, groups]) => (
        <div key={date} className="mb-16 my-4">
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 uppercase">
            Sesión - {date.split("-").reverse().join("/")}
          </h2>
          <div className="overflow-x-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded">
            <section className="min-w-full bg-white divide-y divide-gray-200">
              <header className="flex flex-auto bg-gradient-to-r from-blue-500 to-teal-400">

                <div className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Hora / Tipo
                </div>
                <div className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Autor / Nombre de agrupación
                </div>

              </header>
              <main className="bg-white divide-y divide-gray-200">
                {groups.map((group, index) => {
                  // Calcular el horario en función del índice actual y el horario de inicio (20:00)
                  const startTime = new Date(`2023-11-26T20:00:00`);
                  const timeIncrement = 30;
                  const currentRowTime = new Date(
                    startTime.getTime() + index * timeIncrement * 60000
                  );
                  const formattedTime = currentRowTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  // Comprobar si la hora actual coincide con la hora de la fila
                  const isLive =
                    currentTime.getTime() >= currentRowTime.getTime() &&
                    currentTime.getTime() <
                    currentRowTime.getTime() + timeIncrement * 60000;

                  const highlightRowClass = group.autor ? (group.top ? `bg-rose-700 text-rose-50` : `bg-amber-50`) : '';
                  const rowClass = "flex flex-auto" + " " + highlightRowClass;
                  const onAirClass = `${isLive
                    ? " bg-pink-50 font-bold text-pink-700  text-white blinking"
                    : ""
                    }`;



                  return (
                    <article key={index} className={rowClass}>
                      <div className="px-6 py-2 ">
                        <div className="flex flex-col justify-center h-full w-20">
                          <span className="">{group.tipo}</span>
                          <span className={onAirClass}> {isLive ? "📡EN DIRECTO" : formattedTime}</span>
                        </div>
                      </div>
                      <div className="px-6 py-4">
                        <strong id={group.id} className="text-xl capitalize  text-ellipsis overflow-hidden">
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
