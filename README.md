# Readme

Se inicia el proyecto con el uso de npx create-react-app kruger, donde kruger es el nombre del proyecto, esto crea una app de react.
Se instala react-router-dom
Se instala la libreria de material ui para estilos a los componentes del proyecto.
El se da estilos a los componentes con material ui y css

## App.js

Se crea la logica del login en el componente app.js donde valida si el usuario esta logueado y el rol de quien esta logueado para asi redirigirlo al componente de DashboardAdmin o DashboardUser, las funciones de logueo y deslogueo se definen en este componente y se pasan por props al componente Login quien hace el cambio de esta que esta definido en el componente app.js y redirecciona a una ruta u otra cuando ocurre el cambio del estado.

Para la permanencia de la informacion se uso localStorage, en este mismo componente se valida si existe algo en el localStorage y si no es asi guarda la lista de empleados del archivo data.json

### Usuario admin:  

username: kruger.admin password: 123450

### Usuario employee: 

username: juan.perez password: 123456

### `Estado de redux`

Se crea un estado de redux con una propiedad user para guardar en este la informacion del usuario loguea y ser asi accesible desde todo los componentes.
A su vez define un estado inicial en la carpeta redux/reduce en la constante inicialState, en este mismo archivo en la constante rootReducer se indica como se modificara el estado global de acuerdo al action.type que se ejecute.
En la carpeta redux/action se definen la funciones que despachan a su vez los action.type y pasan informacion a traves del action.payload que es usada para guardarla en el estado global como ocurre en el action.type LOGIN.
Se define un store y este pasa a traves del provider que a su vez emvuelve el BrowserRouter y el app en el archivo index.js para que funcione y sea accesible desde cualquier componente

## Componentes

### `Login`

Se construyo con compnentes de material ui, recibe por props al funcion login creado en el app.jss, ejecuta una funcion en el submit que valida si el usuario y contraseña corresponden con una de los usuarios guardados en el localStorage y si es asi en ejecuta la funcion login de app.js y redirige.
Se crea un estado de redux donde se guarda el user ya que la informacion del mismo se usa en el modal y en otro componente y asi no es necesario pararlo por props a traves de los distintos componentes

### `DashboardAdmin`

En este renderiza en una tabla la informacion de los empleados y se realizan las actividades administrativas.
Recibe por props la funcion logout definida en app.js, permitiendo el deslogueo del usuario y redireccion al componente Login.
Posee dos botonos; Employees y Create Employee, los cuales redirigen con ayuda de react-router-dom asi la ruta "/admin/CRUD" donde se renderiza el componente UserCRUD y a la ruta "/admin/create" donde se renderiza el componente CreateEmployee respectivamente.


### `CreateEmployee`

Se crea un estado local input donde se almacena la informacion ingresada en el formulario relacionada al empleado a crear, ademas de esto se crea un estado errors, el cual cambia cuando existe un cambio en algunos de los inputs del formulario, cambio que se captura a traves del evento onChange ejecutando asi la funcion handleInputChange la cual setea el nuevo esta del input y setea el estado error de acuerdo a las validaciones que ejecuta la funcion validate, la cual chequea que los datos ingresados cumplan con los criterios como lo son que todos los campos esten completados, Cédula válida (Incluir un valor numérico y único de 10 dígitos), Correo electrónico válido, Nombres y apellidos no deben contener números o caracteres especiales. Para esto se hace uso de expresiones regulares.
El boton Create user ejecuta la funcion handleSubmit la cual valida que no haya errores en el objeto del estado errors y si no existe crea un nuevo usuario y contraseña con el uso de la funcion create de la carpeta controllers y lo agrega al array de empleados del localstorage y posteriormente limpia el estado input.


### `UserCRUD`

En este se renderiza una tabla de los empleados que se encuentran en localstorage y se guardan en el estado local employees de este componente para se renderice nuevamente cuando ocurra un cambio en esta lista de empleados y asi mostrar la informacion que se necesita.
Para los filtros se creo los estados status, type, start y end, los cuales representan el estado de vacunacion (si esta vacunado o no), tipo de vacuna, rango inicial y final para el filtrado de los empleados. Los inputs de type, start y end dependen de si se selecciono en el input de status la opcion vacunado, de los contrario los otros se mantienen deshabilitados. Al seleccionar los filtros de busqueda y dar click al boton search se hace el filtrado de los empleados requeridos con el uso de la funcion filter de la carpeta controllers y guardan el resultado en el item "filter" del localstorage y luego se cambia el estado employees de por la informacion que hay en el item "filter" del localstorage y al dar click al boton clear se cambia nuevamente el estado de employee por la info que esta en el item dataKruger del localstorage el cual tiempo absolutamente todos los empleados.
En cada fila de la tabla hay un boton delete y update. 
El boton delete ejecuta la funcion delete de la carpeta controllers la cual elimina el usuario de la el array datakruger del localstorage y luego cambia el estado employees por la nueva informacion del array datakruger del localstorage.
El boton edit abre un modal con la informacion del usuario que se selecciono donde se puede ver y editar toda la informacion del mismo, al modificar los campos dar click al botono save information ejecuta la funcion handleOnClick la cual tiene una que valida el rol del usuario que esta en el estado global; si este es rol 'admin' modifica el usuario seleccionado de la lista de usuarios. Esto se hace ya que este modal se reusa en el componente DashboardUser.

### `DashboardUser`

En este se renderiza la informacion del usuario con rol employee cuando inicia sesion, esta informacion la lee desde estado global de redux donde se encuentra la propiedad user que corresponde al usuario que se logueo.
Al dar click al boton change information se abre el modal, mismo modal que se usa para la actualizacion de la informacion de los usuarios en el dashboardadmin pero los campos que se pueden editar son mucho menos, esto segun los criterios de las historias de usuario. Al modificar la informacion en este forma se modifica la informacion correspondiente a dicho usuario en el item datakruger del localstorage y a su vez se modifica el estado global de redux en su propiedad user asi al cerrar el modal se muestra la informacion del usuario con los cambios ya que el componente dashboarduser se actualiza ya que lee la informacion del estado global a traves del useSelector.

