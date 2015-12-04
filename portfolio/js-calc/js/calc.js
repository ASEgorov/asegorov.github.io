'use strict';
var calcApp = (function() {

    var rgb2hsv = function(red, green, blue){
        var r, g, b;
        r = red/255;
        g = green/255;
        b = blue/255;

        var result = {h:0, s:0, v:0};

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        result.v = max;
        var delta = max - min;
        if(max != 0){
            result.s = delta/max;
        }else{
            result.s = 0;
            result.h = -1;
            return result;
        }
        if(r == max){
            result.h = (g - b)/delta;
        }else if (g == max){
            result.h = 2 + (b - r)/delta;
        }else{
            result.h = 4 + (r - g)/delta;
        }
        result.h *= 60;
        if(result.h < 0){
            result.h += 360;
        }
        return result;
    };

    var parceColorComponent = function(str){
        var r =parseInt(str, 10);
        if (!r){
            r = 0;
        }
        if(r < 0){
            r = 0;
        }
        if(r > 255){
            r = 255;
        }
        return r;
    };

    var prepend0 = function(v){
        if(v.length < 2){
            return "0" + v;
        }else{
            return v;
        }
    };

    var colorComponents2Hex = function(r , g, b){
        return "#" + prepend0(r.toString(16)) + prepend0(g.toString(16)) + prepend0(b.toString(16));
    };

    var onChange = function(){
        var r = parceColorComponent($redField.val());
        var g = parceColorComponent($greenField.val());
        var b = parceColorComponent($blueField.val());

        var hsv = rgb2hsv(r, g, b);

        $preview.css("background-color", colorComponents2Hex(r, g, b));

        $redField.val(r);
        $greenField.val(g);
        $blueField.val(b);
        $hField.val(hsv.h);
        $sField.val(hsv.s);
        $vField.val(hsv.v);
    };

    var $redField;
    var $greenField;
    var $blueField;

    var $hField;
    var $sField;
    var $vField;

    var $preview;

    var init = function(){
        $redField = $("#inputRed");
        $greenField = $("#inputGreen");
        $blueField = $("#inputBlue");

        $hField = $("#inputH");
        $sField = $("#inputS");
        $vField = $("#inputV");


        $preview = $("#calc-preview");

        $redField.keyup(onChange);
        $greenField.keyup(onChange);
        $blueField.keyup(onChange);

    };

    $(document).ready(init);
})();