import React from "react";
import {
  DATE_PRELIMINARES,
  classNameBoxActive,
  classNameGradient,
} from "../data/CONSTANT_COAC_2025";
import { parseDate } from "../utils/handleDate";

// tipos

type RankingKey = 'top' | 'ok' | 'standar';
type RankingStyles = {
  [key in RankingKey]: string;
};

interface Group {
  ranking?: RankingKey; // Cambiar RankingStyles a RankingKey
  modalidad: string;
  nombre: string;
  autor: string;
  "2004"?: string;
  ciudad?: string;
  id?: string;
}

interface Data {
  [date: string]: Group[];
}

interface DynamicTableProps {
  currentSession: string;
  data: Data;
}

const cssRanking: RankingStyles = {
  top: "bg-rose-700 text-rose-50",
  ok: "bg-amber-300 text-amber-700",
  standar: "bg-orange-50",
};

// Component for rendering session data
const SessionComponent: React.FC<{ date: string; groups: Group[] }> = ({
  date,
  groups,
}) => {
  const currentFaseDate = DATE_PRELIMINARES;

  const getSessionClass = (sessionDate: string) => {
    const currentDate = parseDate(currentFaseDate);
    const compareDate = parseDate(sessionDate);

    if (currentDate.getTime() === compareDate.getTime()) {
      return classNameBoxActive;
    }
    if (currentDate.getTime() > compareDate.getTime()) {
      return `opacity-50 hover:opacity-100 grayscale`;
    }

    return ``;
  };

  return (
    <div
      key={date}
      className={`px-4 py-4 coac-session mt-8 ${getSessionClass(date)}`}
      id={date}
    >
      <h3
        className={`text-2xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent  ${classNameGradient}`}
      >
        Sesión - {date}
      </h3>
      <div className="overflow-x-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded">
        <section className="min-w-full divide-y divide-gray-200">
          <header className={`flex flex-auto ${classNameGradient}`}>
            <div className="px-4 py-3 text-left text-xs font-medium text-white uppercase ">
              Modalidad
            </div>
            <div className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
              Nombre de agrupación
            </div>
          </header>
          <main className="divide-y divide-gray-200">
            {groups.map((group, index) => {
              const startTime = new Date(currentFaseDate);
              const timeIncrement = 35; // Tiempo de actuación más el montaje
              const currentRowTime = new Date(
                startTime.getTime() + index * timeIncrement * 60000
              );
              const formattedTime = currentRowTime.toLocaleTimeString(
                "es-ES",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h23",
                }
              );

              const isLive = false; // Aquí se podría implementar una lógica para determinar si el grupo está en vivo

              const highlightRowClass = group.ranking
                ? cssRanking[group.ranking]
                : "";
              const rowClass = "flex flex-auto" + " " + highlightRowClass;
              const onAirClass = isLive
                ? " bg-pink-50 font-bold text-pink-700 text-white blinking"
                : " text-xs";

              return (
                <article id={group.id} key={index} className={rowClass}>
                  <div className="px-4 py-2 ">
                    <div
                      title="Estimación más o menos teniendo en cuenta actuación más el montaje"
                      className="flex flex-col justify-center h-full w-15 text-xs"
                    >
                      <span className="font-bold">{group.modalidad}</span>
                      <span className={onAirClass}>
                        {" "}
                        {isLive ? "📡EN DIRECTO" : formattedTime + " aprox."}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-4">
                    <strong className="text-ellipsis overflow-hidden">
                      {group.nombre}
                    </strong>
                    <p className="sm:text-xl capitalize text-ellipsis overflow-hidden">
                      {group.autor
                        ? group.ranking === "top"
                          ? `🔥${group.autor}`
                          : `${group.autor}`
                        : ""}
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
};

// Main DynamicTable Component
const DynamicTable: React.FC<DynamicTableProps> = ({
  currentSession,
  data,
}) => {
  const css = {
    h2: `text-2xl md:text-4xl font-extrabold leading-tighter tracking-tighter m-4 mt-8 bg-clip-text text-transparent uppercase text-center  ${classNameGradient}`,
  };

  type SessionStatus = "past" | "present" | "future";
  const sessionStatus = (sessionDate: string): SessionStatus => {
    const currentDate = parseDate(currentSession);
    const compareDate = parseDate(sessionDate);

    if (currentDate.getTime() === compareDate.getTime()) {
      return "present";
    }
    if (currentDate.getTime() > compareDate.getTime()) {
      return "past";
    }
    return "future";
  };

  // Clasificar sesiones en pasadas, presentes y futuras
  interface Sessions {
    past: JSX.Element[];
    present: JSX.Element[];
    future: JSX.Element[];
  }

  const sessions: Sessions = {
    past: [],
    present: [],
    future: [],
  };

  Object.entries(data).forEach(([date, groups]) => {
    const status = sessionStatus(date);
    if (status in sessions) {
      sessions[status as keyof Sessions].push(
        <SessionComponent key={date} date={date} groups={groups} />
      );
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
