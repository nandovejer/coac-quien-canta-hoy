import React from "react";
import { useState, useEffect } from "react";

interface Group {
  tipo: string;
  nombre: string;
  autor: string;
  id: string;
}

interface Data {
  [date: string]: Group[];
}

interface DynamicTableProps {
  data: Data;
}


function createID(inputText: string, index: number): string {
  const cleanedText = inputText.replace(/[^\w\s]/g, '');
  const words = cleanedText.split(/\s+/);
  const camelCaseText = words.map((word, wordIndex) => wordIndex === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)).join('');
  const className = `author-${camelCaseText}${index}`;

  return className;
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
    <div className="sm:container sm:mx-auto p-4 my-2">
      {Object.entries(data).map(([date, groups]) => (
        <div key={date} className="mb-16 my-4">
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 uppercase">
            Sesión - {date.split("-").reverse().join("/")}
          </h2>
          <div className="overflow-x-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className=" bg-gradient-to-r from-blue-500 to-teal-400">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Nombre
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
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

                  const rowClass = group.autor ? "bg-amber-50" : "";
                  const cellClasses = `px-6 py-4 whitespace-nowrap ${isLive
                    ? "text-center  bg-pink-50 font-bold text-pink-700  text-white blinking"
                    : ""
                    }`;
              
                  return (
                    <tr key={index} className={rowClass}>
                      <td className={cellClasses}>
                        {isLive ? "📡EN DIRECTO" : formattedTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {group.tipo}
                      </td>
                      <td className="px-6 py-4">
                        <strong id={group.id} className="text-xl capitalize  text-ellipsis overflow-hidden">{group.autor ? `🚀${group.autor}` : ``}</strong>
                        <p className="text-ellipsis overflow-hidden">{group.nombre}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicTable;
