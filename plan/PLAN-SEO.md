# Plan SEO — ¿Quién canta hoy en el COAC?

> Creado el 18/07/2026. Objetivo: todo lo que se puede hacer **en el código**
> para que la web posicione por búsquedas tipo "quién canta hoy COAC",
> "orden actuaciones cuartos COAC 2026", "comparsa El desguace" o el nombre
> de cualquier autor/agrupación.
>
> **Estado: ejecutado el 18/07/2026** (Fases 1-5 completas vía
> `vite-plugin-seo.ts`; `dist/index.html` verificado sin JS, JSON-LD validado
> como JSON, y la app interactiva comprobada sin regresiones). Este documento
> queda como registro histórico. Pendiente solo lo anotado en "Fuera del
> código": dominio propio y alta en Google Search Console.

## Diagnóstico actual

- **Problema nº 1 — la página está vacía para los crawlers.** Es una SPA
  100 % renderizada en cliente: sin JavaScript, `<div id="root">` no tiene
  nada. Google acaba renderizando JS (tarde y sin garantías), pero los bots
  de WhatsApp/Twitter/Facebook y muchos otros no lo hacen nunca. Todo el
  contenido con valor SEO (nombres de agrupaciones, autores, fechas) es
  invisible.
- No hay `robots.txt` ni `sitemap.xml`.
- No hay datos estructurados (JSON-LD): las sesiones son eventos perfectos
  para `schema.org/Event` y no lo estamos contando.
- No hay `<link rel="canonical">`.
- La `og:image` es el favicon `.ico` (WhatsApp/Twitter la ignorarán); no hay
  `twitter:card` grande ni imagen social real.
- Los metadatos están escritos a mano en `index.html`: cuando cambie la fase
  ("cuartos" → "semifinales") se quedarán desactualizados, porque el único
  archivo que se toca es `src/config/season.ts`.
- HTML inválido: hay un `<main>` por cada `SessionCard` además del
  `<main id="siteMain">` de la página (solo puede haber uno), y `<header>`
  dentro de cada tarjeta. Los buscadores usan estas señales semánticas.

## Fase 1 — Contenido indexable sin JavaScript ⭐ (el 80 % del valor)

**Enfoque: "static shell" generado en build** — sin frameworks nuevos ni SSR.

Crear un plugin de Vite en `vite.config.ts` (hook `transformIndexHtml`) que
en cada `npm run build`:

1. Lee `src/config/season.ts` y el JSON de la fase (las mismas fuentes que
   usa la app — cero duplicación).
2. Inyecta dentro de `<div id="root">` una versión HTML estática y semántica
   del contenido: título, y por cada sesión un encabezado con la fecha y la
   lista de agrupaciones (modalidad, nombre, autor, ciudad).
3. Cuando React arranca, `createRoot().render()` reemplaza ese contenido por
   la app interactiva. No hay hidratación ni riesgo de mismatch: los usuarios
   con JS ven exactamente lo mismo que ahora, y los crawlers ven todo el
   contenido. No es cloaking porque es el mismo contenido que muestra la app.

Bonus: mejora el primer pintado percibido (hay contenido antes de que cargue
el JS).

## Fase 2 — Metadatos generados desde `season.ts`

En el mismo plugin de Vite, generar en build (para que nunca se queden
desactualizados al cambiar de fase):

- `<title>` y `meta description` con año y fase desde `SEASON`
  (p. ej. "¿Quién canta hoy en el COAC 2026? — Cuartos de adultos").
- `<link rel="canonical" href="https://nandovejer.github.io/coac-quien-canta-hoy/">`.
- OG completos (`og:title`, `og:description`, `og:url`, `og:site_name`) y
  `twitter:card` = `summary_large_image`.
- **Imagen social real**: crear `public/og-image.png` (1200×630, con el
  título de la web sobre el estilo del gradiente azul-teal actual) y
  referenciarla en `og:image` con URL absoluta. Es lo que hace que compartir
  por WhatsApp/Twitter muestre una tarjeta decente.
- `meta theme-color` (#1f2937, el gris del header) para la barra del
  navegador móvil.

## Fase 3 — Datos estructurados (JSON-LD)

Generar en build (mismo plugin) un `<script type="application/ld+json">` con:

- Un `Event` por sesión: `name` ("Sesión de cuartos del COAC 2026 –
  30/01/2026"), `startDate` en ISO con hora (`fecha + SEASON.sessionStartTime`),
  `location` (Gran Teatro Falla, Cádiz), `performer` (una `PerformingGroup`
  por agrupación con su nombre y modalidad), `eventStatus: EventScheduled` y
  `organizer`.
- Un `WebSite` con `name` y `url`.

Esto habilita resultados enriquecidos de eventos en Google y es la vía más
directa para aparecer en búsquedas de agrupaciones concretas.

## Fase 4 — Infraestructura de rastreo

Crear carpeta `public/` (Vite la copia tal cual a `dist/`):

- `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://nandovejer.github.io/coac-quien-canta-hoy/sitemap.xml
  ```
- `public/sitemap.xml` generado en build (mismo plugin o script `postbuild`):
  una sola URL con `lastmod` = fecha de build. Al ser una SPA de una página,
  el sitemap es trivial pero le dice a Google cuándo hay contenido nuevo
  (cada cambio de fase/sesión).
- Mover `favicon.ico` de la raíz a `public/` y añadir `apple-touch-icon.png`
  (180×180) + `site.webmanifest` básico (nombre, iconos, theme_color).

## Fase 5 — HTML semántico

- `SessionCard.tsx`: quitar los `<main>` y `<header>` internos (solo puede
  haber un `<main>` por página; ahora hay uno por sesión). Usar `<div>` o,
  mejor, marcar cada sesión como `<section aria-labelledby>` con su `<h3>`.
- Revisar jerarquía de encabezados: `h1` (sitio) → `h2` (Hoy/Próximas/
  Pasadas y buscador) → `h3` (cada sesión). Ya casi cumple; ajustar si algo
  se descuelga tras el cambio anterior.
- Enlaces de ancla del menú: asegurar que los `id` destino existen siempre
  (p. ej. `#session-past` solo existe si hay sesiones pasadas).

## Fuera del código (anotado, no ejecutable aquí)

- **Dominio propio** (p. ej. `quiencantahoy.es`): la mejora de mayor impacto;
  un subdominio `github.io` compite peor. Si se hace, actualizar canonical,
  OG, sitemap y `base` de Vite.
- Dar de alta la web en **Google Search Console** (permite pedir indexación
  tras cada cambio de fase) y comprobar los `Event` en el Rich Results Test.

## Verificación

1. `npm run build` y abrir `dist/index.html` **con JavaScript desactivado**
   (o `curl` + inspección): debe verse todo el contenido de las sesiones.
2. Validar el JSON-LD en https://validator.schema.org / Rich Results Test.
3. Lighthouse (pestaña SEO): objetivo 100.
4. Comprobar la tarjeta social con https://www.opengraph.xyz o el
   Sharing Debugger de Meta.
5. `npm run dev`: confirmar que la app interactiva sigue funcionando igual
   (el shell estático solo existe en el build de producción).

## Orden sugerido

Fase 1 (contenido indexable) → Fase 2 (metadatos) → Fase 3 (JSON-LD) →
Fase 4 (robots/sitemap/iconos) → Fase 5 (semántica) → Verificación.
Las fases 1-3 comparten el mismo plugin de Vite, así que en la práctica se
implementan juntas.
