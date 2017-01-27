# jquery-tokenizer - v1.0.0

A jQuery tool to tokenize input field values, view them elegantly and manage their values in a simple way.

##How to use

jQuery is dependent on jQuery, therefore we need to use this library.

Should we link jQuery Tokenizer after importing jQuery:

```html
<script src="<path>/jquery.js"></script>
<script src="<path>/jquery-tokenizer-1.0.0.min.js"></script>
```

Or by npm:

```bash
npm install jquery-tokenizer --save
```

```js
const $ = require('jquery');
require('jquery-tokenizer');
```

And the necessary css:

```html
<link rel="stylesheet" href="<path>/jquery-tokenizer-1.0.0.min.css">
```

To begin with, we should only do `.tokenizer ([options])` to an input field. Example:

```javascript
$("#input1").tokenizer();
```

We can see a demo in Codepen [here](http://codepen.io/lmfresneda/pen/QjwYJK)

"," and ";" separated by default.

##How does it work

Its operation is very simple. Once the `.tokenizer ([options])` is done, a new area will appear below the input, in which the created tokens will appear.

If we click on one or more tokens, these will be marked (unless we have changed the `onClickToken` function. Pressing the DELETE key will delete them.

We can also delete them by clicking on their corresponding "x".


##Options

By default these are the options, all configurable:

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

* `separators`: Characters to be tokenized
* `keyCodeCreate`: Key that will create the tokens, by default ENTER key. We have a utility in `$ .tokenizer.KEY_CODE` with the codes of the main non-alphanumeric keys, although we can put the` keyCode` directly.
* `repeat`: If we want to allow tokens to be repeated or not
* `max_all`: Maximum number of tokens allowed in total
* `max_input`: Maximum number of tokens allowed each time
* `text`: General language
* `onClickToken`: Call function when clicking on a specific token. By default the `.tokenizer-token-active` class is added / removed and then deleted when the DELETE key is pressed.
* `onDeleteToken`: Function called just after a token is deleted. By default nothing is done.

We can change all the default options by accessing `$ .fn.tokenizer.defaults`, for example:

```js
$.fn.tokenizer.defaults.onDeleteToken = function($tokens){
  alert('Deleted Tokens ' + $tokens.length)
}
```

With this example we also see how to indicate a callback for deleted tokens.

Optionally and except for the `onDeleteToken` option that is global, we can modify the options for a `tokenizer()` concrete by passing the new configuration as a parameter:

```javascript
$("#input1").tokenizer({
	separators: [" "],
	max_all: 10,
	max_input: 2
});
```

In this way the total configuration for the input `#input1` would be as follows:

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

##Operations

We have some operations to manage tokenized values, all with aliases for greater compatibility:

###Get ("get")

**Alias**: `("val")`

`Get` operation, allows us to collect in a collection the tokenized values

```javascript
$("#input1").tokenizer("get");
	
//return ["Value1", "Value2"...]
```

###Set ("set", String|Array)

**Alias**: `("input", String|Array)`

`Set` operation, allows us to incorporate values to the existing tokens. It gives us the possibility of passing a single value as String, or several values in an Array:

```javascript
$("#input1").tokenizer("set", "Value3");
	
// or

$("#input1").tokenizer("set", ["Value3", "Value4"]);
```

###Delete ("del", String)

**Alias**: `("delete", String)`, `("rm", String)`, `("remove", String)`

`Del` operation, allows us to delete a value from the existing tokens. It will delete all those tokens that match the indicated String:

```javascript
$("#input1").tokenizer("get");
//return ["Value1", "Value2", "Value3"]

$("#input1").tokenizer("del", "Value3");
	
$("#input1").tokenizer("get");
//return ["Value1", "Value2"]
```