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
        var uniqueArray = function (array) {
            var a = array.concat();
            for (var i = 0; i < a.length; ++i) {
                for (var j = i + 1; j < a.length; ++j) {
                    if (a[i] === a[j])
                        a.splice(j--, 1);
                }
            }
            return a;
        }
        if (!String.__format) {
            String.__format = function () {
                var s = arguments[0];
                for (var i = 0; i < arguments.length - 1; i++) {
                    var reg = new RegExp("\\{" + i + "\\}", "gm");
                    s = s.replace(reg, arguments[i + 1]);
                }
                return s;
            };
        }
        var getWrapperValues = function ($input) {
            var $wrapperValues = $("<div></div>")
                            .addClass("tokenizer-values")
                            .width($input.width() - 7);
            return $wrapperValues;
        }
        var removeAllToken = function () {
            $(".tokenizer-token").remove();
        }
        var removeToken = function($tokens) {
            $tokens.each(function () {
                $(this).remove();
            });
        }
        var getToken = function (value) {
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
                removeToken($token);
            });
            return $token;  
        }
        var showMaxAll = function ($wrapperValues) {
            var $token = getToken($.fn.tokenizer.defaults.lang.max_all);
            $token.addClass("tokenizer-token-max");
            $token.removeAttr("data-value");
            $wrapperValues.append($token);
            setTimeout(function() {
                removeToken($token);
            }, 1500)
        }
        var getValues = function() {
            var tokens = [];
            $(".tokenizer-token[data-value]").each(function () {
                tokens.push($(this).attr("data-value"));
            });
            return tokens;
        }

        if (!arguments.length || $.isPlainObject(arguments[0])) {
            //bind
            var settings = !arguments.length ? {} : arguments[0];
            $(document).on("keydown", function (e) {
                if (e.keyCode == KEY_CODE_SUPR || e.keyCode == KEY_CODE_DEL) {
                    removeToken($(".tokenizer-token-active"));
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
                var $wrapperValues = getWrapperValues($input);
                $input.parent().append($wrapperValues);
                $input.css("margin-bottom", "0px");
                $input.off().on("keypress", function (e) {
                    if (e.keyCode == KEY_CODE_ENTER) {
                        e.preventDefault();
                        if ($.trim($input.val()) != "") {
                            var strReg = "\s*[";
                            for (var i = 0; i < settings.characters.length; i++) {
                                strReg += settings.characters[i];
                            }
                            strReg += "]\s*";
                            var reg = new RegExp(strReg);
                            var tokens = $input.val().split(reg);

                            //controlamos max_input
                            if (settings.max_input > 0) {
                                tokens = tokens.splice(0, settings.max_input);
                            }

                            var tokens = getValues().concat(tokens);
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
                                tokens = uniqueArray(tokens);
                            }

                            removeAllToken();
                            $.each(tokens, function (k, el) {
                                el = $.trim(el);
                                $wrapperValues.append(getToken(el));
                            });
                            if (showMax)
                                showMaxAll($wrapperValues);
                        }
                        $input.val("");
                    }
                });
            });
        } else {

            switch(arguments[0]) {
                case "get":
                case "val":
                    //get value
                    if (arguments.length > 1) {
                        throw new Error("Número de argumentos inválidos, se requiere ('option') solamente");
                    }
                    return getValues();
                case "set":
                case "input":
                    //set value
                    if (arguments.length != 2) {
                        throw new Error("Número de argumentos inválidos, se requiere ('option', String|Array)");
                    }
                    if (typeof arguments[1] === "string") {
                        //only input
                        $this.val(arguments[1]);
                        $this.trigger($.Event("keypress", { keyCode: KEY_CODE_ENTER }));
                    } else if (arguments[1] instanceof Array) {
                        //array input
                        var str = arguments[1].join($.fn.tokenizer.defaults.characters[0]);
                        $this.val(str);
                        $this.trigger($.Event("keypress", { keyCode: KEY_CODE_ENTER }));
                    } else {
                        throw new Error("Segundo parámetro inválido, se requiere ('option', String|Array)");
                    }
                    return $this;
                case "del":
                case "delete":
                case "rm":
                case "remove":
                    //remove value
                    if (arguments.length != 2) {
                        throw new Error("Número de argumentos inválidos, se requiere ('option', String)");
                    }
                    if (typeof arguments[1] === "string") {
                        $(".tokenizer-token[data-value='" + arguments[1] + "']").remove();
                    } else {
                        throw new Error("Segundo parámetro inválido, se requiere ('option', String)");
                    }
                    return $this;
                default:
                    throw new Error(String.__format("Opción '{0}' no válida", arguments[0]));
            }

        }
    };

    $.fn.tokenizer.defaults = $.fn.tk.defaults = {
        characters: [",", ";"],
        repeat: false,
        max_all: 0,
        max_input: 0,
        lang: {
            max_all: "Máximo alcanzado"
        }
    };

})(jQuery);

