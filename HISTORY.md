1. Creación del repositorio en Github
2. Creación del ROADMAP.md para planificar todo el desarrollo en 4 horas. Definición del stack. API: (NestJS + TypeORM (entidades) + SQLite) y front: React + Tailwind + Vite. IDE: VScode.
3. Creación de la estructura: "backend" y "frontend", separados. En el backend se instala NestJS y en el frontend React + Vite.
4. Creación de la estructura del backend, creación de los módulos para cada entidad: clients, hotels, hotel-bookings. "Config" se usará para controlar la configuración del backend.
5. Primer commit con la estructura.
6. Creación del .env y .env.example donde se definirán las variables DATA_TYPE y FS_FOLDER. NestJS leerá esta configuración con @nestjs/config en config/app-config.service.ts. Validamos los datos del .env con Joi.
7. Creamos un test de validación del .env con jest. Se puede ejecutar con: npx jest env.validation
8. Commit del sistema de configuración
