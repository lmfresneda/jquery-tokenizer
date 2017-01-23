# jquery-tokenizer - v1.0.0
Una herramienta jQuery para tokenizar valores de campos input, verlos de forma elegante y gestionar sus valores de forma sencilla.

##Cómo usar

jQuery Tokenizer Hace uso de jQuery, por tanto necesitamos hacer uso de esta librería.

Debemos linkear jQuery Tokenizer después de la importación de jQuery:

```html
<script src="<path>/jquery.js"></script>
<script src="<path>/jquery-tokenizer-1.0.0.min.js"></script>
```

Y el css necesario:

```html
<link rel="stylesheet" href="<path>/jquery-tokenizer-1.0.0.min.css">
```

Para comenzar tan solo debemos hacer `.tokenizer([options])` a un campo input. Ejemplo:

```javascript
$("#input1").tokenizer();
```

Podemos ver una demo en Codepen [aquí](http://codepen.io/lmfresneda/pen/QjwYJK)

Por defecto se realiza separación por "," y ";"

##Cómo funciona

Su funcionamiento es muy simple. Una vez hecho el `.tokenizer([options])` nos aparecerá un nuevo área debajo del input, en el cual irán apareciendo los tokens creados.

Si hacemos click en uno o varios tokens, estos se irán marcando (a no ser que hayamos cambiado la función `onClickToken`. Al pulsar la tecla SUPR estos serán borrados.

También podemos borrarlos haciendo click en su "x" correspondiente.


##Opciones

Por defecto estas son las opciones, todas ellas configurables:

```javascript
{
	separators: [",", ";"],
	keyCodeCreate: $.tokenizer.KEY_CODE.ENTER,
	repeat: false,
	max_all: 0,
	max_input: 0,
	text: {
	    max_all: "Máximo alcanzado"
	},
  onClickToken: function () {
      $(this).toggleClass("tokenizer-token-active");
  },
  onDeleteToken: function () { }
}
```

* `separators`: Caracteres por los que se tokenizará
* `keyCodeCreate`: Tecla que hará crear los tokens, por defecto tecla ENTER. Disponemos de una utilidad en `$.tokenizer.KEY_CODE` con los códigos de las principales teclas no alfanuméricas, Aunque podremos poner directamente el `keyCode`.
* `repeat`: Si queremos permitir que se repitan tokens o no
* `max_all`: Nº máximo de tokens permitidos en total
* `max_input`: Nº máximo de tokens permitidos cada vez
* `text`: Lenguaje general
* `onClickToken`: Función llamada al hacer click en un token concreto. Por defecto se añade/retira la clase `.tokenizer-token-active` que sirve para luego ser eliminado o no al pulsar la tecla SUPR. 
* `onDeleteToken`: Función llamada justo después de ser eliminado un token. Por defecto no se hace nada.

Podemos modificar todas las opciones por defecto mediante el acceso a `$.fn.tokenizer.defaults`, por ejemplo:

```js
$.fn.tokenizer.defaults.onDeleteToken = function($tokens){
  alert('Tokens borrados ' + $tokens.length)
}
```

Con este ejemplo vemos también la forma de marcar un callback para los tokens borrados.

Opcionalmente y salvo la opción `onDeleteToken` que es global, podremos modificar las opciones para un `tokenizer()` concreto pasándole como parámetro la nueva configuración:

```javascript
$("#input1").tokenizer({
	separators: [" "],
	max_all: 10,
	max_input: 2
});
```

De esta forma la configuración total para el input `#input1` quedaría de la siguiente forma:

```javascript
{
	separators: [" "],
	keyCodeCreate: $.tokenizer.KEY_CODE.ENTER,
	repeat: false,
	max_all: 10,
	max_input: 2,
	text: {
    max_all: "Máximo alcanzado"
	},
  onClickToken: function () {
    $(this).toggleClass("tokenizer-token-active");
  }
}
```

##Operaciones

Disponemos de una serie de operaciones para gestionar los valores tokenizados, todas ellas con alias para mayor compatibilidad:

###Get ("get")

**Alias**: `("val")`

Operación `get`, nos permite recoger en una colección los valores tokenizados

```javascript
$("#input1").tokenizer("get");
	
//return ["Valor1", "Valor2"...]
```

###Set ("set", String|Array)

**Alias**: `("input", String|Array)`

Operación `set`, nos permite incorporar valores a los tokens existentes. Nos da la posibilidad de pasar un único valor como String, o varios valores en un Array:

```javascript
$("#input1").tokenizer("set", "Valor3");
	
//o

$("#input1").tokenizer("set", ["Valor3", "Valor4"]);
```

###Delete ("del", String)

**Alias**: `("delete", String)`, `("rm", String)`, `("remove", String)`

Operación `del`, nos permite borrar un valor de los tokens existentes. Borrará todos aquellos tokens que coincidan con el String pasado:

```javascript
$("#input1").tokenizer("get");
//return ["Valor1", "Valor2", "Valor3"]

$("#input1").tokenizer("del", "Valor3");
	
$("#input1").tokenizer("get");
//return ["Valor1", "Valor2"]
```