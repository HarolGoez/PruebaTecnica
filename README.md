# Documentación Pruebas técnicas para aspiración del cargo de desarrollador backend en Different Roads

Para poder usar el servicio, se debe tener presente las siguientes consideraciones :

1. Tener Nodejs instalado localmente en su computador
2. Descargar el código que se encuentra en este repositorio
3. Luego se debe de ingresar al directorio raíz, que tiene la siguiente forma:

```shell
    -src
    -tsconfig.json
    -package.json
    -package-lock.json
    -nodemon.json
    .gitignore
```

4. abrir la consola de Windows/Mac/Linux y usar el siguiente comando `npm install`
5. cambiar el nombre del archivo `.env.template` por `.env`
6. modificar los valores de las llaves, ingresando sus credenciales de acceso a la api
   de Amadeus.

    ```cmd
    API_KEY_AMADEUS=YQeKbBy9rAeNExdxGPEaOkAqHUBHAMIY
    API_KEY_SECRET=23O1HXSCJA7JTAFo
    PORT=3000
    ```

7. una vez haya terminado de ingresar las variables de entorno, en la misma consola usar el comando `npm run start`
8. En la consola debe de salir un aviso que dice `Server running on port 4000`,
   es posible que pueda aparecer un aviso adicional diciéndote que tienes que escribir las credenciales en el archivo del variables de entorno `.env`

> [!IMPORTANT]
> Dejo mis credenciales de acceso por si no tienen las suyas, no las quise suministrar directamente en el archivo de variables de entorno porque sé que es una mala practica guardar ese tipo de información en un repositorio publico, pero para efectos de pruebas , las dejare aca y luego borrare el repositorio

> [!WARNING]
> La variable de entorno de `PORT` es obligatoria ponerla para que el sistema pueda correr, el servicio no asume un puerto por defecto, entonces el usuario debe de saber que puertos tiene disponibles su servidor para correr este aplicativo

## Endpoints de la aplicación

A continuación, se va a suministrar la información de todos los endpoints para consumir la API de Different Roads :

### Buscar disponibilidad del hotel

Este endpoint se utiliza para buscar disponibilidad de hoteles en una ciudad en particular

**Endpoint de la api**

```javascript
 url:"http://localhost:4000/api/",
 endpoint:"search-hotels",
 httpMethod:"GET",
 contentType:"application/json",
 port: depende del que coloquen en las variables de entorno
```

**Parámetros de entrada**

En el body se debe de enviar un archivo de tipo JSON con la siguiente estructura:

```json
{
    "cityCode": "MUC", // para Munich Alemania
    "checkInDate": "2024-10-27",
    "checkOutDate": "2024-10-28",
    "guests": 1,
    "roomQuantity": 1
}
```

**ejemplo de respuesta del sistema**

```json
{
    "country": "Germany",
    "city": "Munich",
    "checkInDate": "2024-10-27",
    "checkOutDate": "2024-10-28",
    "hotels": [
        {
            "name": "HOTEL KOENIGSTEIN",
            "hotelId": "CHMUCKON",
            "address": {
                "countryCode": "DE"
            },
            "price": [
                {
                    "currency": "EUR",
                    "total": "87.00"
                }
            ],
            "roomsAvalaible": 1
        },
        {
            "name": "Courtyard by Marriott Munich City Center",
            "hotelId": "CYMUCCYC",
            "address": {
                "countryCode": "DE"
            },
            "price": [
                {
                    "currency": "EUR",
                    "total": "139.00"
                }
            ],
            "roomsAvalaible": 1
        },
        {
            "name": "COURTYARD MUNICH CITY EAST",
            "hotelId": "CYMUCORC",
            "address": {
                "countryCode": "DE"
            },
            "price": [
                {
                    "currency": "EUR",
                    "total": "119.00"
                }
            ],
            "roomsAvalaible": 1
        },
        {
            "name": " MUNICH - CITY CENTRE",
            "hotelId": "HIMUC041",
            "address": {
                "countryCode": "DE"
            },
            "price": [
                {
                    "currency": "EUR",
                    "total": "120.00"
                }
            ],
            "roomsAvalaible": 1
        },
        {
            "name": "HOLIDAY INN MUNICH SOUTH",
            "hotelId": "HIMUCADE",
            "address": {
                "countryCode": "DE"
            },
            "price": [
                {
                    "currency": "EUR",
                    "total": "89.00"
                }
            ],
            "roomsAvalaible": 1
        }
    ]
}
```

> [!IMPORTANT]
> Tuve muchos problemas al momento de darle el formato que solicitaba el ejercicio, porque por ejemplo el endpoint que extrae la calificación de los hoteles no funcionaba bien, nunca retorno algún dato en concreto que mencionara la puntuación del hotel.

> [!IMPORTANT]
> El endpoint de Amadeus para traerse la información de la direcciones del hotel, tampoco funcionaba bien, no mostraba direcciones (al menos las ciudades que estuve probando), solo aparece el `countryCode` en la llave que se suponía que iba a ser la dirección del hotel

> [!NOTE]
> La verdad tengo mucha curiosidad de saber los endpoints donde se podia encontrar esa información que me quedo faltando, porque según yo, no era posible obtenerla con las herramientas que Amadeus brindaba. Revise toda la documentación y probe de muchas formas para ver donde podia conseguir esa información pero no la pude ver.
