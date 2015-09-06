/*
 *  jquery-tokenizer - v0.1
 *  A jQuery tool to tokenizer value on input
 *  https://github.com/lmfresneda/jquery-tokenizer
 *
 *  Made by Luis Miguel F.
 *  Under MIT License (https://github.com/lmfresneda/jquery-tokenizer/blob/master/LICENSE)
 */
;(function ($) { 
    "use strict";

    $.tokenizer = $.tk = {
        version: "0.1"
    };

    $.fn.tokenizer = $.fn.tk = function () {
        var $this = this;
        var KEY_CODE_ENTER = 13,
            KEY_CODE_SUPR = 46,
            KEY_CODE_DEL = 8;
        //PRIVATE METHODS
        var _uniqueArray = function (array) {
            var a = array.concat();
            for (var i = 0; i < a.length; ++i) {
                for (var j = i + 1; j < a.length; ++j) {
                    if (a[i] === a[j])
                        a.splice(j--, 1);
                }
            }
            return a;
        }
        var _getWrapperValues = function ($input) {
            var $wrapperValues = $("<div></div>")
                            .addClass("tokenizer-values")
                            .width($input.width() - 7);
            return $wrapperValues;
        }
        var _removeAllToken = function () {
            $(".tokenizer-token").remove();
        }
        var _removeToken = function($tokens) {
            $tokens.each(function () {
                $(this).remove();
            });
        }
        var _getToken = function (value) {
            var $token = $("<span></span>")
                            .addClass("tokenizer-token")
                            .text(value)
                            .attr("data-value", value)
                            .prepend($("<span></span>")
                                        .addClass("tokenizer-token-close")
                                        .text("x"));
            $token.on("click", function () {
                $(this).toggleClass("tokenizer-token-active");
            });
            $token.find("span").on("click", function () {
                _removeToken($token);
            });
            return $token;  
        }
        var _showMaxAll = function ($wrapperValues) {
            var $token = _getToken($.fn.tokenizer.defaults.text.max_all);
            $token.addClass("tokenizer-token-max");
            $token.removeAttr("data-value");
            $wrapperValues.append($token);
            setTimeout(function() {
                _removeToken($token);
            }, 1500)
        }
        var _getValues = function() {
            var tokens = [];
            $(".tokenizer-token[data-value]").each(function () {
                tokens.push($(this).attr("data-value"));
            });
            return tokens;
        }
        var _buildRegExp = function(separators) {
            var strReg = "\s*[";
            for (var i = 0; i < separators.length; i++) {
                strReg += separators[i];
            }
            strReg += "]\s*";
            return new RegExp(strReg);
        }
        var _printTokens = function (tokens, $wrapperValues) {
            _removeAllToken();
            $.each(tokens, function (k, el) {
                el = $.trim(el);
                $wrapperValues.append(_getToken(el));
            });
        }
        var _operations = {
            get: function (args) {
                if (args.length > 1) {
                    throw new Error("Número de argumentos inválidos, se requiere ('option') solamente");
                }
                return _getValues();
            },
            set: function (args) {
                var str;
                if (args.length != 2) {
                    throw new Error("Número de argumentos inválidos, se requiere ('option', String|Array)");
                }
                if (typeof args[1] === "string") {
                    //only input
                    str = args[1];
                } else if (args[1] instanceof Array) {
                    //array input
                    str = args[1].join($.fn.tokenizer.defaults.separators[0]);
                } else {
                    throw new Error("Segundo parámetro inválido, se requiere ('option', String|Array)");
                }
                $this.val(str);
                $this.trigger($.Event("keypress", { keyCode: KEY_CODE_ENTER }));
                return $this;
            },
            del: function (args) {
                if (args.length != 2) {
                    throw new Error("Número de argumentos inválidos, se requiere ('option', String)");
                }
                if (typeof args[1] === "string") {
                    $(".tokenizer-token[data-value='" + args[1] + "']").remove();
                } else {
                    throw new Error("Segundo parámetro inválido, se requiere ('option', String)");
                }
                return $this;
            }
        }

        if (!arguments.length || $.isPlainObject(arguments[0])) {
            //INIT BINDING
            var settings = !arguments.length ? {} : arguments[0];
            $(document).on("keydown", function (e) {
                if (e.keyCode == KEY_CODE_SUPR || e.keyCode == KEY_CODE_DEL) {
                    _removeToken($(".tokenizer-token-active"));
                }
            });

            settings = $.extend({}, $.fn.tokenizer.defaults, settings);

            return $this.each(function () {
                var $input = $(this);
                console.log($input);
                var $wrapper = $("<div></div>")
                                .addClass("tokenizer-wrapper")
                                .width($input.width());
                $input.wrap($wrapper);
                var $wrapperValues = _getWrapperValues($input);
                $input.parent().append($wrapperValues);
                $input.css("margin-bottom", "0px");

                $input.off().on("keypress", function (e) {
                    if (e.keyCode == KEY_CODE_ENTER) {
                        e.preventDefault();
                        if ($.trim($input.val()) != "") {
                            var reg = _buildRegExp(settings.separators);
                            var tokens = $input.val().split(reg);

                            //controlamos max_input
                            if (settings.max_input > 0) {
                                tokens = tokens.splice(0, settings.max_input);
                            }

                            var tokens = _getValues().concat(tokens);
                            var showMax = false;
                            //controlamos max_all
                            if (settings.max_all > 0) {
                                var len = tokens.length;
                                tokens = tokens.splice(0, settings.max_all);
                                if (len != tokens.length) {
                                    showMax = true;
                                }
                            }

                            if (!settings.repeat) {
                                tokens = _uniqueArray(tokens);
                            }

                            _printTokens(tokens, $wrapperValues);

                            if (showMax)
                                _showMaxAll($wrapperValues);
                        }
                        $input.val("");
                    }
                });
            });
        } else {
            //ANOTHER REQUEST
            switch(arguments[0]) {
                case "get":
                case "val":
                    //get value
                    return _operations.get(arguments);
                case "set":
                case "input":
                    //set value
                    return _operations.set(arguments);
                case "del":
                case "delete":
                case "rm":
                case "remove":
                    //remove value
                    return _operations.del(arguments);
                default:
                    throw new Error("Opción '"+ arguments[0] +"' no válida");
            }
        }
    };

    //SETTINGS
    $.fn.tokenizer.defaults = $.fn.tk.defaults = {
        separators: [",", ";"],
        repeat: false,
        max_all: 0,
        max_input: 0,
        text: {
            max_all: "Máximo alcanzado"
        }
    };

})(jQuery);

