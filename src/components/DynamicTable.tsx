import React from "react";
import { classNameGradient } from "../styles";
import { parseDate, getLiveGroupIndex, buildSessionDateTime } from "../utils/handleDate";
import SessionCard from "./SessionCard";
import CountdownTimer from "./CountdownTimer";
import type { SessionsData } from "../types";

interface DynamicTableProps {
  currentSession: string;
  data: SessionsData;
  previousYearKey: string;
  sessionStartTime: string;
  minutesPerGroup: number;
}

type SessionStatus = "past" | "present" | "future";

const DynamicTable: React.FC<DynamicTableProps> = ({
  currentSession,
  data,
  previousYearKey,
  sessionStartTime,
  minutesPerGroup,
}) => {
  const css = {
    h2: `text-2xl md:text-4xl font-extrabold leading-tighter tracking-tighter m-4 mt-8 bg-clip-text text-transparent uppercase text-center  ${classNameGradient}`,
  };

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

  const sessions: Record<SessionStatus, JSX.Element[]> = {
    past: [],
    present: [],
    future: [],
  };
  let nextSessionDate: string | null = null;

  Object.entries(data).forEach(([date, groups]) => {
    const status = sessionStatus(date);
    const isCurrentSession = status === "present";
    const liveGroupIndex = isCurrentSession
      ? getLiveGroupIndex(sessionStartTime, minutesPerGroup, groups.length)
      : null;

    if (status === "future") {
      const isEarlier = !nextSessionDate || parseDate(date) < parseDate(nextSessionDate);
      if (isEarlier) nextSessionDate = date;
    }

    sessions[status].push(
      <SessionCard
        key={date}
        date={date}
        groups={groups}
        isCurrentSession={isCurrentSession}
        isPastSession={status === "past"}
        previousYearKey={previousYearKey}
        sessionStartTime={sessionStartTime}
        minutesPerGroup={minutesPerGroup}
        liveGroupIndex={liveGroupIndex}
      />,
    );
  });

  const showCountdown = sessions.present.length === 0 && nextSessionDate !== null;
  const onlyPastSessions = sessions.present.length === 0 && sessions.future.length === 0;

  return (
    <div className="max-w-4xl mx-auto">
      {showCountdown && nextSessionDate && (
        <CountdownTimer
          label={`Próxima sesión: ${nextSessionDate}`}
          targetDate={buildSessionDateTime(nextSessionDate, sessionStartTime).toISOString()}
        />
      )}
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
        // Si la fase ya terminó (no queda sesión de hoy ni futura) abrimos el
        // bloque: si no, la página se vería vacía con todo plegado aquí dentro.
        <details id="session-past" open={onlyPastSessions}>
          <summary className={css.h2 + " grayscale cursor-pointer"}>
            Sesiones Pasadas
          </summary>
          {sessions.past}
        </details>
      )}
    </div>
  );
};

export default DynamicTable;
