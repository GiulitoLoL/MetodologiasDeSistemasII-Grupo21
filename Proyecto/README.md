# MetodologiaDeSistemasII-Grupo21
## Proyecto de registro de mercadería de almacén

**Integrantes**: Natalini Juan Blas, Pizzico Ramiro y Tedeschi Gómez Giuliano

Carpetas y archivos (A actualizar):
>- proyecto (carpeta)<br>
>    - `__pycache__` (carpeta)<br>
>    - `__init__`.py<br>
>    - asgi.py<br>
>    - settings.py<br>
>    - urls.py<br>
>    - wsgi.py<br>
>- manage.py
>- README.md<br>

**¿Cómo iniciar a trabajar en el proyecto**:

> Escribir en la terminal:<br>
> 1. `python --version`
>   - Para asegurarse de que tengan python y actualizado a la ultima versión (3.13.7)
> 2. `python -m venv venv`
>   - Para crear el entorno virtual donde vamos a trabajar
> 3. `venv\Scripts\activate`
>   - Para iniciar el entorno virtual
> 4. `pip install django`
>   - Aquí descargamos el framework que vamos a estar utilizando para el projecto
> 5. `django-admin --version`
>   - Para probar si se instaló adecuadamente
> 6. `python manage.py runserver`
>   - Para correr el servidor donde se mostrará el proyecto

**Posibles patrones de diseño**

Podriamos usar el patron Factory a la hora de crear distintos tipos de productos (bebidas, productos de limpieza, comida, etc), centralizarndo la creacion en una interfaz a la que accederia el cliente

Tambien podriamos usar un patron Observer en los productos para notificar cuando les queda poco stock o cuando entran productos y sube el stock, por ejemplo