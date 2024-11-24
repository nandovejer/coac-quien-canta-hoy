import React from "react";
import {
  DATE_PRELIMINARES, classNameBoxActive,
  classNameGradient
} from "../data/CONSTANT_COAC_2025";
import { parseDate } from "../utils/handleDate";

interface Group {
  top?: boolean;
  modalidad: string;
  nombre: string;
  autor: string;
  id?: string;
}

interface Data {
  [date: string]: Group[];
}

interface DynamicTableProps {
  currentSession: string;
  data: Data;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ currentSession, data }) => {

  const currentFaseDate = DATE_PRELIMINARES;

  const getSessionClass = (sessionDate: string) => {
    const currentDate = parseDate(currentSession);
    const compareDate = parseDate(sessionDate);

    if (currentDate.getTime() === compareDate.getTime()) {
      return classNameBoxActive;
    }
    if (currentDate.getTime() > compareDate.getTime()) {
      return `opacity-50 hover:opacity-100 grayscale`;
    }

    return ``;
  };

  type SessionStatus = 'past' | 'present' | 'future';
  const sessionStatus = (sessionDate: string): SessionStatus => {
    const currentDate = parseDate(currentSession);
    const compareDate = parseDate(sessionDate);

    if (currentDate.getTime() === compareDate.getTime()) {
      return 'present';
    }
    if (currentDate.getTime() > compareDate.getTime()) {
      return 'past';
    }
    return 'future';
  };

  const css = {
    h2: `text-2xl md:text-4xl font-extrabold leading-tighter tracking-tighter m-4 mt-8 bg-clip-text text-transparent uppercase text-center  ${classNameGradient}`
  }

  function SessionComponent(date: string, groups: Group[]) {
    return (
      <div key={date} className={`px-4 py-4 coac-session mt-8 ${getSessionClass(date)}`} id={date}>
        <h3 className={`text-2xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent  ${classNameGradient}`}>
          Sesión - {date}
        </h3>
        <div className="overflow-x-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded">
          <section className="min-w-full divide-y divide-gray-200">
            <header className={`flex flex-auto ${classNameGradient}`}>

              <div className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Hora / modalidad
              </div>
              <div className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Autor / Nombre de agrupación
              </div>

            </header>
            <main className="divide-y divide-gray-200">
              {groups.map((group, index) => {
                const startTime = new Date(currentFaseDate);
                const timeIncrement = 30;
                const currentRowTime = new Date(
                  startTime.getTime() + index * timeIncrement * 60000
                );
                const formattedTime = currentRowTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                const isLive = false; // Aquí se podría implementar una lógica para determinar si el grupo está en vivo
                const highlightRowClass = group.autor ? (group.top ? `bg-rose-700 text-rose-50` : `bg-orange-50`) : '';
                const rowClass = "flex flex-auto" + " " + highlightRowClass;
                const onAirClass = isLive ? " bg-pink-50 font-bold text-pink-700 text-white blinking" : "";

                return (
                  <article id={group.id} key={index} className={rowClass}>
                    <div className="px-4 py-2 ">
                      <div className="flex flex-col justify-center h-full w-20">
                        <span>{group.modalidad}</span>
                        <span className={onAirClass}> {isLive ? "📡EN DIRECTO" : formattedTime}</span>
                      </div>
                    </div>
                    <div className="px-4 py-4">
                      <strong className="text-ellipsis overflow-hidden">{group.nombre}</strong>
                      <p className="sm:text-xl capitalize text-ellipsis overflow-hidden">
                        {group.autor ? (group.top ? `🔥${group.autor}🔥` : `${group.autor}`) : ''}
                      </p>
                    </div>
                  </article>
                );
              })}
            </main>
          </section>
        </div>
      </div>
    );
  }
  // Clasificar sesiones en pasadas, presentes y futuras
  interface Sessions {
    past: JSX.Element[];
    present: JSX.Element[];
    future: JSX.Element[];
  }

  const sessions: Sessions = {
    past: [],
    present: [],
    future: []
  };

  Object.entries(data).forEach(([date, groups]) => {
    const status = sessionStatus(date);
    if (status in sessions) {
      sessions[status].push(SessionComponent(date, groups));
    }
  });

  return (
    <div className="max-w-4xl mx-auto">
      {sessions.present.length > 0 && (

        <div id="session-present">
          <h2 className={css.h2}>Sesión de Hoy</h2>
          {sessions.present}
        </div>
      )}
      {sessions.future.length > 0 && (
        <div id="session-future">
          <h2 className={css.h2}>Próximas sesiones</h2>
          {sessions.future}
        </div>
      )}
      {sessions.past.length > 0 && (
        <div id="session-past">
          <h2 className={css.h2 + ` grayscale `}>Sesiones Pasadas</h2>
          {sessions.past}
        </div>
      )}
    </div>
  );
};

export default DynamicTable;