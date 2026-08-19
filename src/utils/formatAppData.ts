import type { SessionsData } from "../types";

/**
 * Añade a cada agrupación un `id` estable para poder enlazar a su fila
 * (usado por el buscador de autores) mediante anclas `#id`.
 */
function formatAppData(data: SessionsData, year: number): SessionsData {
  const transformedData: SessionsData = {};

  for (const date in data) {
    if (Object.prototype.hasOwnProperty.call(data, date)) {
      transformedData[date] = data[date].map((group) => {
        const id = group.autor
          ? `author${year}${group.autor.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()}`
          : "";
        return { ...group, id };
      });
    }
  }

  return transformedData;
}

export default formatAppData;
