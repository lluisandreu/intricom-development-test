# Intricom Booking Manager

## Backend

Se usa el stack NestJS + TypeORM + SQLite (persistencia en DB). Se elige este stack por compatibilidad con el rol que se requiere.

Para ejecutar el backend:
cd application/backend && npm start

## Frontend

Se usa el stack React + Vite + Tailwind (DaisyUI). Se elige este stack para agilizar el proceso y poder entregar un front usable en el poco tiempo que disponemos.

Para ejecutar el frontend:
cd application/frontend && npm run dev

## TODO

- Implementación de una capa de autenticación y JWT para acceder a las rutas.
- Implementación de middlewares para prevenir ataques y controlar cada ruta.
- Front: Capa de autenticación para acceder a las entidades.
