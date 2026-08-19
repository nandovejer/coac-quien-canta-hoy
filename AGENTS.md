# ¿Quién canta hoy en el COAC?

Web estática que muestra qué agrupaciones cantan en cada sesión del COAC
(Concurso Oficial de Agrupaciones Carnavalescas de Cádiz), con horario estimado
por agrupación, buscador de autores y enlace al directo.

## Stack y comandos

- Vite + React 18 + TypeScript + Tailwind CSS. Sin router, sin estado global,
  sin backend: todo se sirve estático desde GitHub Pages.
- `pnpm run dev` — desarrollo local.
- `pnpm run build` — `tsc` + build de Vite a `dist/`.
- `pnpm run lint` — ESLint con `--max-warnings 0`.
- `pnpm run deploy` — publica `dist/` en la rama `gh-pages` (GitHub Pages).

## Modelo de datos (no cambiar el formato)

Los datos viven en `src/data/COAC_<año>_<FASE>.json`. Formato:

```json
{
  "30/01/2026": [
    {
      "ranking": "top | ok | standar",
      "modalidad": "CORO | COMPARSA | CHIRIGOTA | CUARTETO",
      "nombre": "Nombre de la agrupación",
      "autor": "Autores",
      "2025": "Nombre de la agrupación del año anterior (o 'Nueva agrupación')",
      "ciudad": "Cádiz"
    }
  ]
}
```

- Las claves de primer nivel son las fechas de sesión en `dd/mm/yyyy`.
- La clave del año anterior (`"2025"` en la temporada 2026) cambia cada año
  y se lee dinámicamente vía `SEASON.previousYear` (ver más abajo).
- Las sesiones empiezan a `SEASON.sessionStartTime` y pueden acabar de
  madrugada: hasta `SEASON.sessionEndTime` se considera que sigue siendo la
  sesión del día anterior.
- Los datos de temporadas pasadas están archivados en ramas
  (`2025_COAC_PRE`, `coac2024`, etc.), no en `main`.

## Actualizar de fase o temporada

Todo pasa por **`src/config/season.ts`** — es el único archivo que se toca:
import del JSON de la fase, año, `previousYear`, título, horas de sesión y
minutos por agrupación. Las fechas de cada sesión nunca se declaran a mano:
se derivan de las claves del propio JSON. Ver la chuleta de 3 pasos en
[README.md](README.md).

## Estructura

- `src/App.tsx` — composición de la página; lee todo de `config/season.ts`.
- `src/config/season.ts` — única config de temporada/fase.
- `src/config/site.ts` — constantes de sitio que NO cambian con la fase (URL
  canónica, nombre, lugar de las sesiones).
- `src/types.ts` — tipos compartidos (`Group`, `SessionsData`).
- `src/styles.ts` — clases Tailwind reutilizadas y colores por modalidad.
- `src/components/` — `DynamicTable` (clasifica sesiones en pasadas/hoy/
  futuras y decide si mostrar la cuenta atrás), `SessionCard` (una sesión),
  `SearchAuthor`, `MenuHeader` (nav fija inferior), `Footer`, `CountdownTimer`
  (cuenta atrás a la próxima sesión).
- `src/utils/handleDate.ts` — toda la lógica de fechas/horas: qué sesión está
  "activa" ahora, hora estimada de cada agrupación, qué agrupación está
  probablemente en directo.
- `src/utils/formatAppData.ts` — añade a cada agrupación un `id` de ancla
  (usado por el buscador para enlazar a su fila).
- `vite-plugin-seo.ts` — plugin de Vite que en cada build lee `season.ts` +
  el JSON de la fase y genera: contenido HTML real dentro de `#root` (para
  crawlers sin JS), title/description/canonical/OG/Twitter y JSON-LD de
  eventos (`schema.org/Event`), más `sitemap.xml`. React sustituye ese
  contenido al arrancar (`createRoot`, no hidratación), así que no cambia
  nada para los usuarios. Está incluido en `tsconfig.json` (no en
  `tsconfig.node.json`, que es solo para `vite.config.ts`) porque solo usa
  APIs de navegador/ES2020, no APIs de Node.
- `public/` — favicon, apple-touch-icon, iconos del manifest, `og-image.png`,
  `robots.txt` y `site.webmanifest`. Son estáticos (no dependen de la fase);
  si se quiere regenerar `og-image.png`/iconos con otro diseño, se hizo con
  un HTML+CSS renderizado a PNG vía Playwright (no hay script en el repo,
  fue un paso manual).

## Convenciones y avisos

- Todo el texto visible de la UI está en español; mantenlo así.
- El sitio se sirve bajo `base: "/coac-quien-canta-hoy/"` (ver
  `vite.config.ts`); las rutas absolutas deben respetar ese prefijo. Los
  assets de `public/` se referencian en `index.html` con `%BASE_URL%`.
- Hay un histórico de decisiones de refactor en `plan/PLAN-MEJORAS.md` y de
  SEO en `plan/PLAN-SEO.md` (bugs ya corregidos, motivación de cada cambio).
