1. Creación del repositorio en Github
2. Creación del ROADMAP.md para planificar todo el desarrollo en 4 horas. Definición del stack. API: (NestJS + TypeORM (entidades) + SQLite) y front: React + Tailwind + Vite. IDE: VScode.
3. Creación de la estructura: "backend" y "frontend", separados. En el backend se instala NestJS y en el frontend React + Vite.
4. Creación de la estructura del backend, creación de los módulos para cada entidad: clients, hotels, hotel-bookings. "Config" se usará para controlar la configuración del backend. Se empieza el desarrollo por el backend ya que es la pieza más importante y el centro logístico y de persistencia de datos de la aplicación.
5. Primer commit con la estructura.
6. Creación del .env y .env.example donde se definirán las variables DATA_TYPE y FS_FOLDER. NestJS leerá esta configuración con @nestjs/config en config/app-config.service.ts. Validamos los datos del .env con Joi.
7. Creamos un test de validación del .env con jest. Se puede ejecutar con: npx jest env.validation
8. Commit del sistema de configuración
9. Instalación de TypeORM y creación de las entidades Client, Hotel y HotelBooking. Uso de validación con "class-validator". Se usa TypeORM, un ORM de uso generalizado, ya que tiene un buen tipeado de las entidades y se combina muy bien con Nest.
10. Commit de las entidades.
11. Creación de una inteface global Repository con los métodos que vamos a usar para cada entidad (para no duplicar código). Creación de los repositorios de cada entidad. No usamos directamente un servicio TypeORM porque vamos a usar dos tipos de guardado de datos: DB y FS.
12. Commit de los repositorios.
13. Desarrollo de la persistencia en ficheros (FileSystem) con "fs", de node. Creación de los métodos consultar las entidades y actualizarlas. Creación de un test jest para verificar que los métodos funcionan: npx jest fs-repository.
14. Conexión con SQLite. TypeORM no soporta sqlite y hay que instalar "better-sqlite3": https://typeorm.io/docs/releases/1.0/release-notes/. Se instala ahora porque al querer compilar el código surge el error de que falta el "TypeOrmModule.forRoot" en app.module.ts.
15. Creación de un test que comprueba que los ficheros se crean al generar las entidades: fs-persistence.integration.spec.ts: npm test -- fs-persistence
16. Integración de la persistencia de datos en cada repositorio de entidad con "useFactory". Si el config.dataType === 'FS' se va a usar el FsRepository, sino el typeOrmRepository (base de datos)
17. Comprobación de creación de la carpeta definida en FS_FOLDER al ejecutar "npm start".
18. Commit de la integración de persistencia en ficheros.
19. Sincronizar DB sólo cuando DATA_TYPE es "DB". En este caso debería crear el fichero \*.sqlite
20. Creación de un test para comprobar que las entidades se guardan bien en la DB: npx jest db-persistence. Se usa la DB test-database.sqlite para comprobar los datos.
21. Creación de las rutas REST de cada entidad para listar, obtener por ID y actualizar, a través de los controladores. Generación de los DTO de cada entidad para evitar errores de tipo de datos y sólo actualizar campos específicos. Las rutas son:
    - GET /hotels, GET /hotels/:id, POST /hotels, PATCH /hotels/:id
    - GET /clients, GET /clients/:id, POST /clients, PATCH /clients/:id
    - GET /hotel-bookings, GET /hotel-bookings/:id, POST /hotel-bookings, PATCH /hotel-bookings/:id
22. Generación de un archivo Postman para probar todas las rutas de una manera humana.
23. Empezamos a desarrollar la interfície frontal de la aplicación, con React + Tailwind. Se va a usar https://daisyui.com/ para no tener que maquetar los elementos básicos (formularios, botones, tablas, etc). Con esta librería ganamos tiempo en el desarrollo y seremos capaces de desarrollar la UI en la hora que nos queda.
24. Creación de un método global para hacer las consultas a la api. Se encuentra en el archivo api.ts.
25. Creación de los tipados de cada entidad: Client, Hotel, HotelBooking
26. Creación de una landing donde el usuario puede elegir qué entidad consultar.
27. Se hace un commit de los primeros cambios del front.
28. Usaremos react-router-dom para las rutas en React. Podríamos usar un sistema de hash propio, pero para no perder tiempo este paquete soluciona la navegación si disponemos de poco tiempo.
29. Se crean las páginas de cada entidad, vamos a crear un componente global EntityTable para no repetir código. Este componente se usará en cada página de entidad.
30. Tenemos problemas de CORS. Se añade app.enableCors() en maint.s en Nest.
31. Commit de las páginas de entidades con el listado (tabla)
32. Se usa el componente "drawer" de DaisyUI para generar el formulario de creación de entidad. Para ello se crea el componente global CreateEntity.tsx que se encargará de pintar los campos de cada entidad.
33. Para elegir el cliente y hotel en el formulario de creación de "Hotel bookings" se hace una consulta a la DB para no tener que recordar el ID de cada entidad.
34. Creación del componente global "UpdateEntity.tsx" que va a servir para actualizar las entidades. Se usará el componente "drawer" igual que en la creación.
35. Empezamos pruebas en DB y FS. FS no guarda el createdDate. Lo arreglamos
