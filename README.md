# Readme

Se inicia el proyecto con el uso de npx create-react-app kruger, donde kruger es el nombre del proyecto, esto crea una app de react.
Se instala react-router-dom
Se instala la libreria de material ui para estilos a los componentes del proyecto

## App.js

Se crea la logica del login en el componente app.js donde valida si el usuario esta logueado y el rol de quien esta logueado para asi redirigirlo al componente de DashboardAdmin o DashboardUser, las funciones de logueo y deslogueo se definen en este componente y se pasan por props al componente Login quien hace el cambio de esta que esta definido en el componente app.js y redirecciona a una ruta u otra cuando ocurre el cambio del estado.

Para la permanencia de la informacion se uso localStorage, en este mismo componente se valida si existe algo en el localStorage y si no es asi guarda la lista de empleados del archivo data.json

## Componentes

### `Login`

Se construyo con compnentes de material ui, recibe por props al funcion login creado en el app.jss, ejecuta una funcion en el submit que valida si el usuario y contraseña corresponden con una de los usuarios guardados en el localStorage y si es asi en ejecuta la funcion login de app.js y redirige.

### `DashboardAdmin`

En este renderiza en una tabla la informacion de los empleados y se realizan las actividades administrativas.
Recibe por props la funcion logout definida en app.js, permitiendo el deslogueo del usuario y redireccion al componente Login.
Posee dos botonos; Employees y Create Employee, los cuales redirigen con ayuda de react-router-dom asi la ruta "/admin/CRUD" donde se renderiza el componente UserCRUD y a la ruta "/admin/create" donde se renderiza el componente CreateEmployee respectivamente.


### `CreateEmployee`

Se crea un estado local input donde se almacena la informacion ingresada en el formulario relacionada al empleado a crear, ademas de esto se crea un estado errors, el cual cambia cuando existe un cambio en algunos de los inputs del formulario, cambio que se captura a traves del evento onChange ejecutando asi la funcion handleInputChange la cual setea el nuevo esta del input y setea el estado error de acuerdo a las validaciones que ejecuta la funcion validate, la cual chequea que los datos ingresados cumplan con los criterios como lo son que todos los campos esten completados, Cédula válida (Incluir un valor numérico y único de 10 dígitos), Correo electrónico válido, Nombres y apellidos no deben contener números o caracteres especiales. Para esto se hace uso de expresiones regulares.
El boton Create user ejecuta la funcion handleSubmit la cual valida que no haya errores en el objeto del estado errors y si no existe crea un nuevo usuario y contraseña con el uso de la funcion create de la carpeta controllers y los agrega al array de empleados del localstorage y posteriormente limpia el estado input.


### `UserCRUD`

En este se renderiza una tabla de los empleados que se encuentran en localstorage y se guardan en el estado local employees de este componente para se renderice nuevamente cuando ocurra un cambio en esta lista de empleados y asi mostrar la informacion que se necesita.
Para los filtros se creo los estados status, type, start y end, los cuales representan el estado de vacunacion (si esta vacunado o no), tipo de vacuna, rango inicial y final para el filtrado de los empleados. Los inputs de type, start y end dependen de si se selecciono en el input de status la opcion vacunado, de los contrario los otros se mantienen deshabilitados. Al seleccionar los filtros de busqueda y dar click al boton search se hace el filtrado de los empleados requeridos con el uso de la funcion filter de la carpeta controllers y guardan el resultado en el item "filter" del localstorage y luego se cambia el estado employees de por la informacion que hay en el item "filter" del localstorage y al dar click al boton clear se cambia nuevamente el estado de employee por la info que esta en el item dataKruger del localstorage el cual tiempo absolutamente todos los empleados.
En cada fila de la tabla hay un boton delete y update. 
El boton delete ejecuta la funcion delete de la carpeta controllers la cual elimina el usuario de la el array datakruger del localstorage y luego cambia el estado employees por la nueva informacion del array datakruger del localstorage.
El boton edit abre un modal con la informacion del usuario que se selecciono donde se puede ver y editar toda la informacion del mismo, al modificar los campos dar click al botono save information ejecuta la funcion handleOnClick la cual tiene una que valida el rol del usuario que esta en el estado global; si este es rol 'admin' modifica el usuario seleccionado de la lista de usuarios. Esto se hace ya que este modal se reusa en el componente DashboardUser.

### `DashboardUser`

En este se renderiza la informacion del usuario con rol employee cuando inicia sesion

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
