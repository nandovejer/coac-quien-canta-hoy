import React from "react";
import { classNameBoxActive, classNameGradient, modalidadColors, modalidadColorFallback } from "../styles";
import { dateFullFormat, estimateGroupTime } from "../utils/handleDate";
import { generateUrlYoutube } from "../utils/handleYoutube";
import type { Group, RankingKey } from "../types";

type RankingStyles = { [key in RankingKey]: string };

const cssRanking: RankingStyles = {
  top: "bg-rose-700 text-rose-50",
  ok: "bg-amber-300 text-amber-700",
  standar: "bg-orange-50",
};

interface SessionCardProps {
  date: string;
  groups: Group[];
  isCurrentSession: boolean;
  isPastSession: boolean;
  previousYearKey: string;
  sessionStartTime: string;
  minutesPerGroup: number;
  liveGroupIndex: number | null;
}

const SessionCard: React.FC<SessionCardProps> = ({
  date,
  groups,
  isCurrentSession,
  isPastSession,
  previousYearKey,
  sessionStartTime,
  minutesPerGroup,
  liveGroupIndex,
}) => {
  const sessionClass = isCurrentSession
    ? classNameBoxActive
    : isPastSession
      ? "opacity-50 hover:opacity-100 grayscale"
      : "";

  return (
    <div
      className={`px-4 py-4 coac-session mt-8 ${sessionClass}`}
      id={date}
    >
      <h3
        className={`text-2xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent  ${classNameGradient}`}
      >
        Sesión - {dateFullFormat(date)}
      </h3>
      <div className="overflow-x-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded">
        <section className="min-w-full divide-y divide-gray-200" aria-label={`Agrupaciones de la sesión del ${date}`}>
          <div className={`flex flex-auto ${classNameGradient}`}>
            <div className="px-4 py-3 text-left text-xs font-medium text-white uppercase ">
              Modalidad
            </div>
            <div className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
              Nombre de agrupación
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {groups.map((group, index) => {
              const formattedTime = estimateGroupTime(sessionStartTime, index, minutesPerGroup);
              const isLive = isCurrentSession && liveGroupIndex === index;

              const highlightRowClass = group.ranking ? cssRanking[group.ranking] : "";
              const rowClass = "flex flex-auto" + " " + highlightRowClass;
              const onAirClass = isLive
                ? " bg-pink-50 font-bold text-pink-700 blinking"
                : " text-xs";
              const modalidadClass = modalidadColors[group.modalidad] ?? modalidadColorFallback;
              const previousGroupName = group[previousYearKey];

              return (
                <article id={group.id} key={index} className={rowClass}>
                  <div className="px-4 py-2 pr-0 ">
                    <div
                      title="Estimación más o menos teniendo en cuenta actuación más el montaje"
                      className="flex flex-col justify-center h-full w-15 text-xs"
                    >
                      <span className={`font-bold rounded px-1 py-0.5 inline-block w-fit ${modalidadClass}`}>
                        {group.modalidad}
                      </span>
                      <span className={onAirClass}>
                        {" "}
                        {isLive ? "📡EN DIRECTO" : formattedTime + " aprox."}
                      </span>
                      <span className="py-2 text-ellipsis overflow-hidden">{group.ciudad}</span>
                    </div>
                  </div>
                  <div className="px-4 py-4">
                    <strong className="text-2xl capitalize text-ellipsis overflow-hidden text-pretty">
                      {group.autor}
                    </strong>
                    <p className="text-xl l1">{group.nombre}</p>

                    <small className="text-xs text-ellipsis overflow-hidden w-full text-right">
                      {previousGroupName
                        ? previousGroupName === "Nueva agrupación"
                          ? "Es una nueva agrupación"
                          : (
                            <a className="underline" href={generateUrlYoutube("COAC " + previousGroupName)}>
                              Anteriormente: {previousGroupName} (📺 video)
                            </a>
                          )
                        : null}
                    </small>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SessionCard;
