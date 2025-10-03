# MetodologiaDeSistemasII-Grupo21
## Proyecto de registro de mercadería de almacén

**Integrantes**: Natalini Juan Blas, Pizzico Ramiro y Tedeschi Gómez Giuliano

### Carpetas y archivos (A actualizar):
```
/proyecto
  /__pycache__ 
  `__init__`.py
  asgi.py
  settings.py
  urls.py
  wsgi.py
manage.py
README.md
```
### ¿Cómo iniciar a trabajar en el proyecto:
**Escribir en la terminal:**

    ```bash
    python --version
      # (Para asegurarse de que tengan python y actualizado a la ultima versión (3.13.7))
    python -m venv venv
      # (Para crear el entorno virtual donde vamos a trabajar)
    venv\Scripts\activate
      # (Para iniciar el entorno virtual)
    pip install django
      # (Aquí descargamos el framework que vamos a estar utilizando para el projecto)
    django-admin --version
      # (Para probar si se instaló adecuadamente)
    python manage.py runserver
      # (Para correr el servidor donde se mostrará el proyecto)
    ```

### Posibles patrones de diseño

>En el proyecto empezaríamos utilizando Django, un framework que nos ayudaría a la hora de modificar la base de datos que iremos a utilizar. 
>
>Utilizaríamos el patrón Factory, centralizando la creación en la interfaz en la que accedería el cliente, esto hará que el código sea más flexible a la hora de crear productos que el cliente decida. 
>
>Notamos la necesidad de las notificaciones en la falta de productos a la hora de que quede poco producto dentro de la base de datos, entonces decidimos hacer uso del patrón Observer para que los mismos productos notifiquen la falta de stock y también la recomposición de este. 