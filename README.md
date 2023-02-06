# looker-studio

Script para exportar datos de un objeto gráfico en Looker Studio.

Para usar este script hay que setear el perfil de Chrome que tiene acceso como usuario (de google) al reporte en cuestión en el archivo `.env`. Para ver el perfil, ir a la url `chrome://version` y chequear la variable `Profile Path`.
También debe modificarse la url del reporte y el indice del objeto gráfico en el `Makefile`.
El indice se obtiene abriendo el reporte, luego la consola del navegador y ejecutando `document.querySelectorAll('ng2-chart-menu-button button[mattooltip="More"]')`. Aparecerá un listado de elementos/nodes HTML y debe elegirse el que corresponda al objeto para el cual quiere descargarse la info.
Todo esto se hace por única vez.

Luego, para obtener las cookies, necesarias para instanciar una copia del navegador dentro de docker, se debe correr en una terminal local `node index.js --auth` (está pensado para realizarse en Windows y se deben cerrar todas las ventanas abiertas de Chrome). Para correr el comando en la terminal es necesario tener instalado de manera local Node.js. Al clonar el repo, posiblemente sea necesario realizar `npm install` para instalar los módulos de dependencias.
Las cookies se almacenan en la carpeta auth y generalmente expiran cada cierto tiempo o al cerrar la sesión manualmente (o pueden no expirar).

Finalmente, se puede correr el container con `docker compose up`. Lógicamente tener instalado previamente docker o bien implementarlo en alguna nube.
Es un proyecto reutilizable para scrapear información de otros servicios de Google o de plataformas que requieran autenticación.
