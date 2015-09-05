# jquery-tokenizer - v0.1
Una herramienta jQuery para tokenizar valores de campos input, verlos de forma elegante y gestionar sus valores de forma sencilla.

##Cómo usar

jQuery Tokenizer Hace uso de jQuery, por tanto necesitamos hacer uso de esta librería.

Debemos linkear jQuery Tokenizer después de la importación de jQuery:

```html
<script src="<path>/jquery.js"></script>
<script src="<path>/jquery-tokenizer-0.1.js"></script>
```

Y el css necesario:

```html
<link rel="stylesheet" href="<path>/jquery-tokenizer-0.1.css">
```

Para comenzar tan solo debemos hacer `.tokenizer([options])` a un campo input. Ejemplo:

```javascript
$("#input1").tokenizer();
```

Podemos ver una demo en Codepen [aquí](http://codepen.io/lmfresneda/pen/QjwYJK)

Por defecto se realiza separación por "," y ";"

##Opciones

Por defecto estas son las opciones, todas ellas configurables:

```javascript
{
	characters: [",", ";"],
	repeat: false,
	max_all: 0,
	max_input: 0,
	lang: {
	    max_all: "Máximo alcanzado"
	}
}
```

* `characters`: Caracteres por los que se tokenizará
* `repeat`: Si queremos permitir que se repitan tokens o no
* `max_all`: Nº máximo de tokens permitidos en total
* `max_input`: Nº máximo de tokens permitidos cada vez
* `lang`: Lenguaje general

Opcionalmente podremos modificarlas para un `tokenizer()` concreto pasándole como parámetro la nueva configuración:

```javascript
$("#input1").tokenizer({
	characters: [" "],
	max_all: 10,
	max_input: 2
});
```

De esta forma la configuración total para el input `#input1` quedaría de la siguiente forma:

```javascript
{
	characters: [" "],
	repeat: false,
	max_all: 10,
	max_input: 2,
	lang: {
	    max_all: "Máximo alcanzado"
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