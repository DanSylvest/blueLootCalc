/**
 * Created by Dan Sylvest on 06.09.2018.
 */
var G =function(){}
G.prototype = {
    el: function(_id){
        return document.getElementById(_id);
    }
};

var g = new G();

var Main =function(){};
Main.prototype = {
    loaded: function(){
        this._ta = g.el("data-input");
        this._ta.addEventListener("keydown", this.on_key_down.bind(this));
    },
    parser: function(_value){
        var result = [];
        var lines = _value.split("\n");

        var a = 0;
        while( a < lines.length){
            var sline = lines[a];

            var attrs = sline.split("	");

            if(!attrs[0] || !attrs[1] || !attrs[2] || !attrs[3] || !attrs[4] || !attrs[5] ){
                a++;
                continue;
            }

            var line = {
                signature : attrs[0],
                sig_type : attrs[1],
                type : attrs[2],
                name : attrs[3],
                scan_result : attrs[4],
                distance : attrs[5]
            };
            result.push(line);
            a++;
        }

        return result;
    },
    calc_price: function (_sigs) {
        var result_part_price = 0;
        var result_full_price = 0;
        var a = 0;
        while (a < _sigs.length) {
            var signature = _sigs[a];
            var info = plist[signature.name];

            if(!info){
                a++;
                continue;
            }

            var part_1 = info.price;
            var part_2 = 0;
            var part_3 = 0; // for avengers;

            if (info.wh_class == 4 || info.wh_class == 5) {
                part_2 = 300;
            }
            var part = part_1;
            var full = part_1 + part_2 + part_3;

            result_part_price += part;
            result_full_price += full;

            a++;
        }
        return {
            part_price: result_part_price,
            full_price: result_full_price
        }
    },
    parse_price: function (_num) {
        var result = [];

        if(_num > 0) {
            _num *= 1000000;
            var str = _num.toString();
            var arr = str.split("").reverse();
            var a = 0;
            var counter = 1;
            while( a < arr.length){
                var num = arr[a];
                result.push(num);
                if(counter == 3) {
                    result.push(" ");
                    counter = 0;
                }
                counter++;
                a++;
            }
            result = result.reverse();
        }
        return result.join("");
    },
    on_key_down: function(_ev){
        if(_ev.keyCode != 13) return;

        var value = this._ta.value;
        var sigs = this.parser(value);
        var price = this.calc_price(sigs);

        var all = this.parse_price(price.full_price);
        var part = this.parse_price(price.part_price);

        var out = g.el("ui-data-out");
        out.innerText = part + " ISK / " + all + " (with drifter) ISK";
    }
};

var main = new Main();

addEventListener("load", main.loaded.bind(main));


var plist = {

    //c3
    "Core Garrison": {
        price: 253,
        wh_class: 4
    },


    // C5
    "Core Garrison": {
        price: 253,
        wh_class: 4
    },
    "Core Stronghold": {
        price: 234,
        wh_class: 4
    },
    "Forgotten Core Data Field": {
        price: 279,
        wh_class: 4
    },
    "Forgotten Core Information Pen": {
        price: 332,
        wh_class: 4
    },
    "Oruze Osobnyk": {
        price: 164,
        wh_class: 4
    },
    "Quarantine Area": {
        price: 146,
        wh_class: 4
    },
    "Unsecured Frontier Enclave Relay": {
        price: 329,
        wh_class: 4
    },
    "Unsecured Frontier Server Bank": {
        price: 272,
        wh_class: 4
    },


    // C6
    "Core Bastion": {
        price: 445,
        wh_class: 5
    },
    "Core Citadel": {
        price: 310,
        wh_class: 5
    },
    "Forgotten Core Assembly Hall": {
        price: 642,
        wh_class: 5
    },
    "Forgotten Core Circuitry Disassembler": {
        price: 657,
        wh_class: 5
    },
    "Strange Energy Readings": {
        price: 291,
        wh_class: 5
    },
    "The Mirror": {
        price: 363,
        wh_class: 5
    },
    "Unsecured Core Backup Array": {
        price: 688,
        wh_class: 5
    },
    "Unsecured Core Emergence": {
        price: 627,
        wh_class: 5
    }
};