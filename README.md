# ¿Quién canta hoy en el COAC?

Web que muestra qué agrupaciones cantan en cada sesión del COAC (Concurso
Oficial de Agrupaciones Carnavalescas de Cádiz), con horario estimado,
buscador de autores y enlace al directo.

## Desarrollo

```bash
pnpm install
pnpm run dev       # servidor de desarrollo
pnpm run lint      # ESLint
pnpm run build     # tsc + build de producción a dist/
pnpm run deploy    # publica dist/ en la rama gh-pages (GitHub Pages)
```

## Actualizar a una nueva fase (3 pasos)

1. Crea `src/data/COAC_<año>_<FASE>.json` con el mismo formato que el actual
   (claves `dd/mm/yyyy` → array de agrupaciones).
2. Edita `src/config/season.ts`: cambia el import del JSON y ajusta
   `phaseTitle`, `previousYear` (si toca) y las horas de sesión si cambian.
3. `pnpm run build && pnpm run deploy`.

Las fechas de cada sesión **no** se declaran a mano en ningún sitio: se
derivan directamente de las claves del JSON.

Más contexto del proyecto en [AGENTS.md](AGENTS.md).
