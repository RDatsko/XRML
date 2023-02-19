/* ====================================================================================================
*
* xrQuery
* thanks to https://github.com/james2doyle/ki.extend.js
* ==================================================================================================== */

if (typeof $ == "undefined") {
    !(function (b, c, d, e, f) {
        f = b["add" + e];

        function i(a, d, i) {
            if (a[0] == "@") {
                for (d = a && a.nodeType ? [a] : "" + a === c, i = d.length; i--; c.unshift.call(this, d[i]));
            } else {
                for (d = a && a.nodeType ? [a] : "" + a === a ? b.querySelectorAll(a) : c, i = d.length; i--; c.unshift.call(this, d[i]));
            }
        }

        $ = function (a) {
            $XR.curVar = a;

            return /^f/.test(typeof a) ? /in/.test(b.readyState) ? setTimeout(function () {
                $(a);
            }, 9) : a() : new i(a);
        };

        $[d] = i[d] = {
            on: function (a, b) {
                return this.each(function (c) {
                    f ? c["add" + e](a, b, false) : c.attachEvent("on" + a, b);
                });
            },

            off: function (a, b) {
                return this.each(function (c) {
                    f ? c["remove" + e](a, b) : c.detachEvent("on" + a, b);
                });
            },

            each: function (a, b) {
                for (var c = this, d = 0, e = c.length; d < e; ++d) {
                    a.call(b || c[d], c[d], d, c);
                }

                return c;
            },

            splice: c.splice
        };
    })(document, [], "prototype", "EventListener");

    var props = ["add", "remove", "toggle", "has"],
    maps = ["add", "remove", "toggle", "contains"];

    props.forEach(function (prop, index) {
        $.prototype[prop + "Class"] = function (a) {
            return this.each(function (b) {
                if (a) { b.classList[maps[index]](a); }
            });
        };
    });
}










/* ===== add ============================================================= */
/*
$.prototype.add = function (object, item) {
    switch (object.toLowerCase()) {

        case 'audio':
            break;


        case 'cube':
            app.Resources[app.Variables.curVar] = {
                xrtype: "cube",
                object: new Cube()
            };
            break;
//            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//      var texture = new THREE.TextureLoader().load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJjrEGUXiPiPgC7AKbYEn7wwNxsJjeVGN7Equm0Z3-T-3PI26T&s");
//			//var material = new THREE.MeshBasicMaterial( { color: 311234 } );
//      var material = new THREE.MeshBasicMaterial( { map: texture } );
//            var cube = new THREE.Mesh( geometry, material );
        
        
        case 'image':
            break;


        case 'light':
            app.Resources[app.Variables.curVar] = {
                xrtype: "light",
                object: new Light(item)
            };
            break;


        case 'model':
            var ext = item.split(".");
            ext = ext[ext.length - 1];
      
            if (ext == "glb" || ext == "gltf") {
                app.Resources[app.Variables.curVar] = {
                    xrtype: "model",
                    object: new Model(item)
                };
            } else {
                console.log("Invalid model format!");
            }
            break;


        case 'plane':
            app.Resources[app.Variables.curVar] = {
                xrtype: "plane",
                object: new Plane()
            };
//            var geometry = new THREE.PlaneGeometry( 1000, 1000, 1, 1 );
//            var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
//            var floor = new THREE.Mesh( geometry, material );
//            floor.material.side = THREE.DoubleSide;
//            floor.rotation.x = 90;
            break;


        case 'sphere':
            app.Resources[app.Variables.curVar] = {
                xrtype: "sphere",
                object: new Sphere()
            }
            break;
        
        
        case 'video':
            break;


    }
};
*/










/* ===== append ========================================================== */
/*/
$.prototype.append = function (a) {
    return this.each(function (b) {
        b.appendChild(a[0]);
    });
};
*/










/* ===== addTo ============================================================ */
/*
$.prototype.addTo = function (a) {
    switch (a) {
        case "scene":
            app.Scene.add(app.Resources[app.Variables.curVar].object);
            break;


        default:
            break;
    }
};
*/










/* ===== attr ============================================================ */

$.prototype.attr = function (a, b) {
    console.log(`${a}: ${b}`);
    return b === []._ ? this[0].getAttribute(a) : this.each(function (c) { c.setAttribute(a, b); });
};










/* ===== css ============================================================= */
/*
$.prototype.css = function (a, b) {
    if (typeof a === "object") {
        for (var prop in a) {
            this.each(function (c) {
                c.style[prop] = a[prop];
            });
        }
        return this;
    } else {
        return b === []._ ? this[0].style[a] : this.each(function (c) { 
            c.style[a] = b;
        });
    }
};
*/










/* ===== find ============================================================ */
/*
$.prototype.find = function (selector) {
    return $(selector, this);
};
*/










/* ===== first =========================================================== */
/*
$.prototype.first = function () {
    return $(this[0]);
};
*/










/* ===== focus =========================================================== */
/*
$.prototype.focus = function () {
    return this[0].focus();
};
*/










/* ===== get =========================================================== */
/*
$.prototype.get = function (variable) {
    return eval("app.Resources[app.Variables.curVar].object." + variable);
};
*/










/* ===== parent ========================================================== */
/*
$.prototype.parent = function () {
    return this.length == 1 ? $(this[0].parentNode) : [];
};
*/










/* ===== remove ========================================================== */
/*
$.prototype.remove = function () {
    //delete app.Resources[app.Variables.curVar];
    document.querySelector($XR.curVar).remove();
};
*/










/* ===== set ============================================================= */
/*
$.prototype.set = function (variable, value) {
    let ti;
    let temp;

    switch (variable) {
        case "color":
        case "ground":
        case "material.color":
            ti = new THREE.Color(value);
            eval(
                "app.Resources[app.Variables.curVar].object." + variable + " = " +
                " new THREE.Color({ r: " + ti.r + ", " +
                " g: " + ti.g + ", " +
                " b: " + ti.b + ", " +
                " isColor: " + ti.isColor + 
                " }); "
            );
            break;

        case "position":
            eval(
                "app.Resources[app.Variables.curVar].object." + variable + " = " +
                " new THREE.Vector3({ x: " + value.x + ", " +
                " y: " + value.y + ", " +
                " z: " + value.z +
                " }); "
            );
            break;

        case "rotation.x":
        case "rotation.y":
        case "rotation.z":
            eval("app.Resources[app.Variables.curVar].object." + variable + " = " + (value * (Math.PI / 180)));
            break;

        case "scale.x":
        case "scale.y":
        case "scale.z":
            eval("app.Resources[app.Variables.curVar].object." + variable + " = " + (value * (Math.PI / 180)));
            break;

        default:
            eval("app.Resources[app.Variables.curVar].object." + variable + " = " + value);
//              console.log(eval("app.Resources[app.Variables.curVar].object." + variable));
            break;
    }
};
*/










/* ===== text ============================================================ */
/*
$.prototype.text = function (a) {
    return a === []._ ? this[0].textContent : this.each(function (b) { b.textContent = a; });
};
*/










/* ===== ajax ============================================================ */
/*
$.ajax = function (a, b, c, d) {
    var xhr = new XMLHttpRequest();
    var type = typeof b === "object" ? 1 : 0;
    var gp = ["GET", "POST"];
    xhr.open(gp[type], a, true);
    if (type == 1) {
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    }
    xhr.responseType = typeof c === "string" ? c : "";
    var cb = !type ? b : c;
    xhr.onerror = function () {
        cb(this, true);
    };
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                cb(this, false);
            } else {
                cb(this, true);
            }
        }
    };
    if (type) {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send($.param(b));
    } else {
        xhr.send();
    }
    xhr = null;
};
*/










/* ===== param =========================================================== */
/*
$.param = function (obj, prefix) {
    var str = [];
    for (var p in obj) {
        var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        str.push(typeof v == "object" ? $.param(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
    return str.join("&");
};
*/





