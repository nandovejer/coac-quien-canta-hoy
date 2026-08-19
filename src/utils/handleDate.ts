function parseTime(time: string): [hour: number, minute: number] {
  const [hour, minute] = time.split(":").map(Number);
  return [hour, minute];
}

/**
 * Determina la fecha (dd/mm/yyyy) de la sesión "activa" ahora mismo.
 *
 * Las sesiones se consideran parte del día anterior hasta `sessionEndTime`
 * de la madrugada siguiente (p.ej. una sesión del 30/01 que se alarga hasta
 * las 3am del 31/01 se sigue mostrando como "hoy" hasta las 4am).
 */
function getCurrentSessionDate(sessionEndTime: string): string {
  const now = new Date();
  const [endHour, endMinute] = parseTime(sessionEndTime);
  const todayCutoff = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    endHour,
    endMinute,
  );

  const resultDate =
    now < todayCutoff
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
      : now;

  return resultDate.toLocaleDateString("es", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Parse Date ===> dd/mm/yyyy
function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function dateFullFormat(strDate: string): string {
  const parts = strDate.split("/");
  if (parts.length !== 3) {
    throw new Error("Formato de fecha inválido");
  }

  const [day, month, year] = parts.map(Number);
  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) {
    throw new Error("Fecha inválida");
  }

  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // output: jueves, 23 de enero de 2025
}

/**
 * Hora estimada de actuación de la agrupación en la posición `index` de la
 * sesión, contando desde `sessionStartTime` y sumando `minutesPerGroup` por
 * cada agrupación anterior (actuación + montaje).
 */
function estimateGroupTime(
  sessionStartTime: string,
  index: number,
  minutesPerGroup: number,
): string {
  const [startHour, startMinute] = parseTime(sessionStartTime);
  const start = new Date(2000, 0, 1, startHour, startMinute);
  const groupTime = new Date(start.getTime() + index * minutesPerGroup * 60000);

  return groupTime.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
}

/**
 * Índice de la agrupación que probablemente está actuando ahora mismo en la
 * sesión de hoy, o `null` si la sesión de hoy no ha empezado / ya terminó.
 */
function getLiveGroupIndex(
  sessionStartTime: string,
  minutesPerGroup: number,
  groupCount: number,
): number | null {
  const now = new Date();
  const [startHour, startMinute] = parseTime(sessionStartTime);

  // Si aún no hemos llegado a la hora de inicio de hoy, la sesión en curso
  // (si la hay) empezó ayer por la noche.
  const startedToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    startHour,
    startMinute,
  );
  const sessionStart = now < startedToday
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, startHour, startMinute)
    : startedToday;

  const elapsedMinutes = (now.getTime() - sessionStart.getTime()) / 60000;
  const index = Math.floor(elapsedMinutes / minutesPerGroup);

  if (index < 0 || index >= groupCount) {
    return null;
  }

  return index;
}

/**
 * Combina una fecha de sesión (dd/mm/yyyy) con una hora (HH:mm) en un único
 * `Date`, para usar como objetivo de la cuenta atrás a la próxima sesión.
 */
function buildSessionDateTime(dateString: string, time: string): Date {
  const date = parseDate(dateString);
  const [hour, minute] = parseTime(time);
  date.setHours(hour, minute, 0, 0);
  return date;
}

export {
  getCurrentSessionDate,
  parseDate,
  dateFullFormat,
  estimateGroupTime,
  getLiveGroupIndex,
  buildSessionDateTime,
};
