# Roadmap — Intricom Prueba Técnica

Stack: **NestJS** (backend) + **React** (frontend, styled with **Tailwind CSS**) + **TypeORM** (DB_TYPE=DB, engine: **SQLite**, file-based, no external service required).

Time budget: 3–4h. Steps are ordered so that if time runs out, everything up to the last completed step is still coherent and demoable. Nothing gets implemented until each step below is approved.

## Assumptions / open questions to confirm before coding

- The spec's Anexo 1 FS subdirectory list ("Client, HotelBooking, Booking") looks like a typo against the ER diagram (`HotelBooking`, `Client`, `Hotel`). Assumption: the three entities are **Hotel**, **Client**, **HotelBooking**, and both FS and DB modes persist all three.
- Config file format: **.env** — idiomatic for NestJS via `@nestjs/config`/`dotenv`, flat key=value fits `DATA_TYPE`/`FS_FOLDER`, no extra parsing code needed.
- `_metadata` file format: JSON, one per entity subdirectory (`TOTAL_REGISTRIES`, `LAST_INDEX`).
- One record = one file, e.g. `fs-data/HotelBooking/1.json`.
- UI: a single React SPA with 3 entity sections (list / create / edit), talking to the NestJS API over REST.
- `HotelBooking` relation: per the ER diagram it's a join-like entity carrying `HotelId` + `ClientId` (plus `Name`, `Address`, `CreatedDate`) — effectively "Booking of a Client at a Hotel".

## Phase 0 — Project scaffolding (~20 min)
- Monorepo layout: `application/backend` (NestJS) and `application/frontend` (React + Vite).
- Backend: Nest CLI project, base modules folder structure (`config`, `common`, `hotels`, `clients`, `hotel-bookings`), ESLint/Prettier.
- Frontend: Vite + React + TS scaffold, Tailwind CSS configured, basic routing (3 pages), minimal API client.
- `.gitignore`, root `README.md` skeleton (filled in at the end).

## Phase 1 — Configuration loading (~20 min)
- `.env` at backend root with `DATA_TYPE` (`DB` | `FS`) and `FS_FOLDER`.
- Nest `ConfigModule.forRoot()` + a typed `AppConfigService` wrapping it, validated at bootstrap via a Joi/class-validator schema (fails fast with a clear error if `DATA_TYPE=FS` and `FS_FOLDER` is missing).
- Config schema validated — ties into tips.pdf's "validaciones robustas".

## Phase 2 — Domain layer & persistence abstraction (~40 min)
- Define domain entities/DTOs: `Hotel`, `Client`, `HotelBooking` (shared shape regardless of storage).
- Define a `Repository<T>` interface per entity (`findAll`, `findById`, `create`, `update`) — this is the seam that lets `DATA_TYPE` switch storage without touching services/controllers (Strategy/DI pattern, SOLID's DIP).
- Services depend only on the interface; a Nest custom provider picks the FS or TypeORM implementation based on `AppConfigService.dataType` at module init.

## Phase 3 — FS persistence implementation (~40 min)
- On bootstrap (`DATA_TYPE=FS`): ensure `FS_FOLDER/{Hotel,Client,HotelBooking}` exist, and `_metadata.json` per folder with `TOTAL_REGISTRIES`/`LAST_INDEX`, created if missing.
- `FsRepository<T>`: create → allocate next id from metadata, write `{id}.json`, bump metadata; findAll → read+parse all files in folder; findById; update → overwrite file (id immutable).
- Concurrency note: single-writer assumption is fine for this exercise (documented in README as a known limitation).

## Phase 4 — DB persistence implementation (~40 min)
- TypeORM entities matching the ER diagram (`Hotel`, `Client`, `HotelBooking` with `hotelId`/`clientId` FKs), SQLite datasource, migrations (not `synchronize: true`, to show production-mindedness) or a seed script.
- `TypeOrmRepository<T>` implementing the same `Repository<T>` interface as Phase 2/3.
- A `schema.sql` / migration files delivered alongside the app per the "script de base de datos" requirement.

## Phase 5 — API layer (~30 min)
- REST controllers per entity: `GET /hotels`, `GET /hotels/:id`, `POST /hotels`, `PUT /hotels/:id` (same pattern for clients, hotel-bookings).
- DTO validation with `class-validator` (`class-validator`/`ValidationPipe`), consistent error responses (Nest exception filters), 404 vs 400 vs 500 distinguished.

## Phase 6 — Frontend UI (~50 min)
- Three entity screens, each with: list (table), create form, edit form — matching the required "listar / modificar / dar de alta" functionality.
- Styling via Tailwind utility classes; shared layout/nav component, consistent table/form/button styles across the 3 screens.
- `HotelBooking` form uses selects populated from `Hotel`/`Client` lists for the FK fields.
- Basic client-side validation + surfaced API error messages; loading/empty/error states.

## Phase 7 — Testing (~30–40 min)
- Backend unit tests: `FsRepository` and `TypeOrmRepository` (id allocation, metadata bump, not-found path), services (business rules if any), one controller test.
- Edge cases: missing config, invalid FK reference in `HotelBooking`, update of non-existent id, empty FS folder on first boot.
- One lightweight e2e/integration test (Nest `supertest`) hitting a real SQLite file and a real temp FS folder.

## Phase 8 — Polish & delivery (~20 min)
- README: how to run (both `DATA_TYPE` modes), how to switch, architecture diagram/notes, assumptions, known limitations.
- Final pass for consistent error handling/logging, remove dead code, verify both DATA_TYPE=FS and DATA_TYPE=DB paths work end-to-end.
- Zip the deliverable per submission instructions.

---
**Next step:** review this roadmap and approve/adjust before Phase 0 scaffolding starts.
