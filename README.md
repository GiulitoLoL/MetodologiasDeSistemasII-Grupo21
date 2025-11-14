# MetodologiaDeSistemasII-Grupo21
## Proyecto de registro de mercadería de almacén

**Integrantes**: Natalini Juan Blas, Pizzico Ramiro y Tedeschi Gómez Giuliano

### Carpetas y archivos (A actualizar):
```
/Proyecto
    /backend
        /src
            /controlers
            /data
            /models
            /routes
            /services
    /frontend
        /components
        /stylesheets
```
### ¿Cómo iniciar a trabajar en el proyecto (backend y frontend):
**Escribir en la terminal:**

```bash
npm i
#Esto instalará todas las dependencias y dependencias de desarrollo para poder empezar a trabajar

npm run build
#Inicirá el script que armará la carpeta /dist en su proyecto

npm run dev
#Inicia el script que dará inicio al servidor
```

### Posibles patrones de diseño

>Para este proyecto utilizaríamos React para tener una buena interfaz de usuario interactiva y reutilizable para futuros proyectos. Utilizaríamos también Express como framework que nos simplifica la creación de servidores web y APIs. Estaremos implementando Zod para proporcionar seguridad a la hora de escribir código tipado y que no ocurran errores de implementación de tipos. A su vez, implementaremos vitest para poder corregir más facilmente errores dentro del código.
>
>Utilizaríamos el patrón Factory, centralizando la creación en la interfaz en la que accedería el cliente, esto hará que el código sea más flexible a la hora de crear productos que el cliente decida. 
>
>Notamos la necesidad de las notificaciones en la falta de productos a la hora de que quede poco producto dentro de la base de datos, entonces decidimos hacer uso del patrón Observer para que los mismos productos notifiquen la falta de stock y también la recomposición de este. 

### Cambios importantes:

>Decidimos, por falta de tiempo y conocimiento sobre el lenguaje Python, cambiar de lenguaje para armar el proyecto. Estaremos utilizando typescript para el desarrollo del proyecto
>
>Hemos cambiado un poco la distribución del proyecto para que no sea tan enredado. Decidimos separar el backend del frontend para poder trabajar en los 2 por separado. Al no tener una base de datos firme, optamos por hacer un .json que simule una.