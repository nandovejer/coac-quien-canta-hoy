# Plan de mejoras — ¿Quién canta hoy en el COAC?

> Creado el 18/07/2026. Objetivo: ordenar el código, hacer que actualizar la
> temporada (fechas, fase, datos) sea cosa de tocar **un solo archivo**, y pulir
> la UI. El formato de los JSON de datos **se mantiene tal cual está**.
>
> **Estado: ejecutado el 18/07/2026** (Fases 1-5 completas, `lint`/`build`
> verificados y comportamiento comprobado con capturas en dev server). Este
> documento queda como registro histórico de qué se hizo y por qué.

## Contexto

La app muestra qué agrupaciones cantan cada sesión del COAC. Los datos viven en
JSON por fase (`src/data/COAC_2026_CUARTOS.json`, claves `dd/mm/yyyy` → array de
agrupaciones), y cada cambio de fase requiere hoy editar a mano varios archivos
(`App.tsx`, `CONSTANT_COAC.tsx`, `DynamicTable.tsx`). Además hay bastante código
muerto acumulado de años anteriores.

## Bugs detectados (arreglar sí o sí)

1. **Fase hardcodeada a preliminares** — [DynamicTable.tsx:46](src/components/DynamicTable.tsx#L46)
   usa `DATE_PRELIMINARES` como `currentFaseDate` aunque estemos en cuartos.
   Afecta al resaltado de sesión activa y a las horas estimadas de actuación.
2. **Clave del año anterior desactualizada** — [DynamicTable.tsx:139](src/components/DynamicTable.tsx#L139)
   lee `group['2024']`, pero el JSON de 2026 usa la clave `"2025"`. El enlace
   "Anteriormente: … (📺 video)" **no se muestra nunca**.
3. **Llamada con argumentos equivocados** — [App.tsx:17-20](src/App.tsx#L17-L20)
   llama `getCurrentSessionDate(new Date().toLocaleDateString(), MAX_HOUR_SESSION)`:
   el primer parámetro debería ser una hora (`MIN_HOUR_SESSION`), no una fecha.
   Funciona de casualidad porque la fecha inválida hace que un `if` interno nunca
   se cumpla. Hay que reescribir la función con firma clara y sin `any`.
4. **Año hardcodeado en los ids** — [formatAppData.tsx:17](src/utils/formatAppData.tsx#L17)
   genera ids `author2025…` con el año a fuego.
5. **Side effect en el render** — [App.tsx:22](src/App.tsx#L22) hace
   `document.body.classList.add` dentro del componente; el fondo debe ir en CSS.
6. **236 KB de easter egg en cada visita** — `index.html` carga
   [sorpresa.tsx](src/data/sorpresa.tsx) (gif en base64 inline) como segundo
   módulo en todas las cargas de página.

## Fase 1 — Limpieza de código muerto

Borrar (todo está en git si hiciera falta recuperarlo; los años anteriores ya
viven en sus ramas `2025_COAC_*`, `coac2024`, etc.):

- `my-react-app/` — esqueleto antiguo duplicado.
- `docs/` — build viejo; el deploy real es `gh-pages -d dist` (rama `gh-pages`).
- `src/components/test.tsx` — 100 % comentado.
- `src/utils/vejer.tsx` — ASCII art sin importar desde ningún sitio.
- Componentes sin uso: `Modal.tsx`, `OnTop.tsx`, `AuthorCloud.tsx` (sustituido
  por `SearchAuthor`). `CountdownTimer.tsx` **se conserva**: se reutiliza en la
  Fase 4.
- JSONs de prueba/fases pasadas: `COAC_2025_PRE_test.json`, `COAC_2026_PRE_test.json`
  (y `COAC_2026_PRE.json` cuando acabe la temporada, si se archiva en rama).
- `src/data/sorpresa.tsx` + `sorpresa.gif`: quitar el `<script>` de `index.html`.
  Si quieres conservar el easter egg, mover el gif a asset normal y cargarlo
  lazy solo cuando se dispare.

## Fase 2 — Config única de temporada ⭐ (el cambio importante)

Crear `src/config/season.ts`: **el único archivo que se toca al actualizar**.

```ts
export const SEASON = {
  year: 2026,
  previousYear: 2025,          // clave del JSON con la agrupación del año pasado
  phaseTitle: "Actuaciones de cuartos de adultos",
  liveUrl: "https://www.youtube.com/@ONDACADIZCARNAVAL/streams",
  sessionStart: "20:00",       // hora de inicio de sesión
  sessionEnd: "04:00",         // hora de corte (madrugada = sesión del día anterior)
  minutesPerGroup: 35,         // actuación + montaje, para la hora estimada
};
```

Reglas:

- El JSON **no cambia de formato**. Las fechas de sesión se derivan de las
  claves del propio JSON — desaparecen `DATE_PRELIMINARES`, `DATE_CUARTOS`,
  etc. de `CONSTANT_COAC.tsx` (no hay que duplicar fechas nunca más).
- El import del JSON de la fase queda junto al config (una línea).
- La clave del año anterior se lee dinámicamente:
  `group[String(SEASON.previousYear)]` — arregla el bug 2 para siempre.
- El título del `<h1>` sale de `phaseTitle` — se acaba el comentar/descomentar
  texto en `App.tsx`.
- Añadir al `README.md` la chuleta "Actualizar a una nueva fase en 3 pasos":
  1) crear `COAC_<año>_<FASE>.json`, 2) actualizar `season.ts`, 3) `npm run build && npm run deploy`.

## Fase 3 — Refactor

- `src/types.ts` único con `Group` y `SessionsData` (hoy hay 4 copias
  divergentes en `DynamicTable`, `SearchAuthor`, `AuthorCloud`, `formatAppData`).
- Utils a `.ts` (no `.tsx`, no tienen JSX): reescribir `handleDate` con nombres
  claros, tipos correctos y sin la lógica frágil actual.
- Extraer `SessionCard` (el `SessionComponent` interno de `DynamicTable`) a su
  propio archivo; la hora estimada de cada agrupación se calcula con
  `SEASON.sessionStart` + índice × `SEASON.minutesPerGroup` (no con la fecha de
  preliminares).
- Clases Tailwind repetidas (gradientes, títulos) a un módulo `src/styles.ts`
  o a componentes pequeños (`GradientTitle`).
- Fondo del body a `index.css`; quitar el side effect del render.
- Corregir el typo `CURRENNT_YEAR` (desaparece con la Fase 2 de todos modos).

## Fase 4 — Mejoras de UI

- **Chips de color por modalidad**: CORO / COMPARSA / CHIRIGOTA / CUARTETO con
  un color propio cada una — se escanea la tabla de un vistazo.
- **"Cantando ahora" real**: la variable `isLive` existe pero está a `false`.
  Con la hora actual y la estimación de 35 min/agrupación ya calculada, marcar
  la agrupación que probablemente esté en el escenario durante la sesión de hoy.
- **Cuenta atrás a la próxima sesión** reutilizando `CountdownTimer` cuando no
  haya sesión hoy (fecha objetivo = primera sesión futura del JSON).
- **Sesiones pasadas colapsadas** en `<details>` para no hacer scroll infinito.
- **Meta tags para compartir**: `description` + Open Graph (título, imagen) en
  `index.html` — ahora mismo al compartir por WhatsApp no sale nada.
- **Favicon**: quitar el `<link>` roto a `/vite.svg`; dejar solo `favicon.ico`.
- **Accesibilidad**: `<label>` en el buscador de autores, revisar contrastes.

## Fase 5 — Verificación

- `npm run lint` y `npm run build` limpios.
- `npm run dev` y comprobar manualmente: sesión pasada / de hoy / futura
  (cambiando temporalmente la fecha del sistema o las claves de un JSON de
  prueba), buscador de autores, enlaces de ancla del menú inferior, enlace
  "Anteriormente" con la clave `"2025"`.
- Deploy con `npm run deploy` y comprobar la URL de GitHub Pages.

## Orden sugerido

Fase 1 (limpieza) → Fase 2 (config, arregla los bugs 1-4) → Fase 3 (refactor)
→ Fase 4 (UI) → Fase 5 (verificación). Las fases 1+2 son las que dan el 80 %
del valor: repo limpio y actualización de datos en un solo archivo.
