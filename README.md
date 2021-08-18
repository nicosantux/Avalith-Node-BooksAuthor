# Consignas:

Utilizando de base el ejercicio anterior, agregar una nueva tabla "author" donde tendrán las columnas: id, name y country. Ahora en lugar de la columna "author" en la tabla de "books" deberá haber un id que haga referencia al ID de un autor. Con estos cambios deberán modificar los endpoints que ya realizaron con los siguientes puntos:

- Los endpoints de consulta (ambos GET) deberán obtener además la información del libro y de su autor siguiendo la siguiente estructura:

```
{
    "id": 1,
    "name": "Nombre del libro",
    "isbn": "Código",
    "author": {
        "id": 1,
        "name": "Nombre del autor",
        "country": "Argentina"
    }
}
```

- Al momento de crear un libro, deberán enviar junto a sus datos el ID del autor. NO puede haber un libro sin un autor!

Además de estos cambios, deberán agregar endpoints para consultar, modificar y agregar autors a la DB.