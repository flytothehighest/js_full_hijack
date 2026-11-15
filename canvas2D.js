// ==UserScript==
// @name         Canvas 2D Hijacker
// @namespace    http://tampermonkey.net/
// @version      2026-11-15
// @description  try to take over the world!
// @author       ReducedRadius
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var hack = function(objs = ["CanvasRenderingContext2D"]){
    localStorage.setItem('hack',true)
    window.execCode = [];
    objs.forEach(e =>{
        var qobjs = Object.keys(new Function(`return globalThis.${e}.prototype`)())
        _priv_hack(qobjs,e)
    })
}


var _priv_hack = function(qobjs,objname){
    qobjs.forEach(function(objame){
        var code = `
        let ph = ${objname}.prototype.${objame};
        ${objname}.prototype.${objame} = function(...args){
         window.execCode.push('${objname}.prototype.${objame}('+args+')')
         return ph.apply(this,args)
        }
        `
        try{
        new Function(code)()
        }catch(e){

        }
     })
}
    //Change parameters here.e.g. hack(['EventTarget'])
hack()
   
})();
