// Clases Tailwind reutilizadas en varios componentes.
export const classNameBoxActive = "shadow-2xl rounded-lg bg-white ";
export const classNameGradient = "bg-gradient-to-r from-blue-500 to-teal-400 ";
export const classNameGradientHigh =
  "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ";
export const classNameGradientDisable = "bg-gradient-to-r from-gray-500 to-grey-400 ";

// Color por modalidad, para identificar el tipo de agrupación de un vistazo.
export const modalidadColors: Record<string, string> = {
  CORO: "bg-indigo-100 text-indigo-800",
  COMPARSA: "bg-emerald-100 text-emerald-800",
  CHIRIGOTA: "bg-amber-100 text-amber-800",
  CUARTETO: "bg-rose-100 text-rose-800",
};

export const modalidadColorFallback = "bg-gray-100 text-gray-800";
