import React, { useEffect } from "react";


const Main = () => {

    useEffect(()=>{
        document.body.style.backgroundColor = '#000';

        var canvas = document.getElementById('canvas');
        var arr_touches = [];
        var radius = 10;
        var blur = 0;
        var draggin = true;
        var ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.lineWidth = radius * 2;
        ctx.strokeStyle = '#111111';
        ctx.fillStyle = '#111111';
        ctx.shadowColor = '#111111';
        var setRadiusPoint = function(newRadius) {
        radius = newRadius;
        ctx.lineWidth = radius * 2;
        };
        setRadiusPoint(40);
        var setRadiusBlur = function(newBlur) {
        blur = newBlur;
        ctx.shadowBlur = blur;
        };
        setRadiusBlur(60);
        var changeColor = function(newColor) {
        ctx.strokeStyle = newColor;
        ctx.fillStyle = newColor;
        ctx.shadowColor = newColor;
        };

        function colorsVary (){
            var saturation = 1;
            var i = setInterval(function(){
                changeColor(`hsl(${saturation},100%,50%)`);
                saturation++;
                if(saturation === 360) {
                    clearInterval(i);
                    colorsVary();
                }
            }, 20);
            
        }
        colorsVary();

        var putPoint = function(e) {
        if(draggin) {
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
        }
        };
        function handleStart(evt) {
        var touches = evt.changedTouches;
        for(var i = 0; i < touches.length; i++) {
            if(isValidTouch(touches[i])) {
            evt.preventDefault();
            arr_touches.push(copyTouch(touches[i]));
            ctx.beginPath();
            ctx.fill();
            }
        }
        }
        function handleTouchMove(evt) {
        var touches = evt.changedTouches;
        var offset = findPos(canvas);
        for (var i = 0; i < touches.length; i++) {
            if(isValidTouch(touches[i])) {
            evt.preventDefault();
            var idx = ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
                ctx.lineTo(touches[i].clientX-offset.x, touches[i].clientY-offset.y);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(touches[i].clientX-offset.x, touches[i].clientY-offset.y, radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(arr_touches[idx].clientX-offset.x, arr_touches[idx].clientY-offset.y);
                arr_touches.splice(idx, 1, copyTouch(touches[i]));
            }   
            }
        }
        }
        function handleEnd(evt) {
        var touches = evt.changedTouches;
        var offset = findPos(canvas);
        for (var i = 0; i < touches.length; i++) {
            if(isValidTouch(touches[i])) {
            evt.preventDefault();
            var idx = ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
                ctx.beginPath();
                ctx.moveTo(arr_touches[idx].clientX-offset.x, arr_touches[idx].clientY-offset.y);
                ctx.lineTo(touches[i].clientX-offset.x, touches[i].clientY-offset.y);
                arr_touches.splice(i, 1);
            } 
            }
        }
        }
        function handleCancel(evt) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            arr_touches.splice(i, 1);
        }
        }
        function copyTouch(touch) {
        return {identifier: touch.identifier,clientX: touch.clientX,clientY: touch.clientY};
        }
        function ongoingTouchIndexById(idToFind) {
        for (var i = 0; i < arr_touches.length; i++) {
            var id = arr_touches[i].identifier;
            if (id === idToFind) {
            return i;
            }
        }
        return -1;
        }
        function isValidTouch(touch) {
        var curleft = 0, curtop = 0;
        var offset = 0;
        if (canvas.offsetParent) {
            do {
            curleft += canvas.offsetLeft;
            curtop += canvas.offsetTop;
            } while (touch === canvas.offsetParent);
            offset = { x: curleft-document.body.scrollLeft, y: curtop-document.body.scrollTop };
        }
        if(touch.clientX-offset.x > 0 &&
            touch.clientX-offset.x < parseFloat(canvas.width) &&
            touch.clientY-offset.y >0 &&
            touch.clientY-offset.y < parseFloat(canvas.height)) {
            return true;
        }else {
            return false;
        }
        }
        function findPos(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
            } while (obj === obj.offsetParent);
            return { x: curleft-document.body.scrollLeft, y: curtop-document.body.scrollTop };
        }
        }
        window.addEventListener('mousemove', (e)=>{
        setTimeout(()=>{
            putPoint(e);
        },100);
        });
        window.addEventListener("touchstart", handleStart, false);
        window.addEventListener("touchend", handleEnd, false);
        window.addEventListener("touchcancel", handleCancel, false);
        window.addEventListener("touchleave", handleEnd, false);
        window.addEventListener("touchmove", handleTouchMove, false);
    },[]);

    return(
        <>
            <p className="canvas-para">Paint Your imagination<sup>by Saurabh</sup></p>
            <canvas id="canvas">
                Sorry, your browser is rubbish.
            </canvas>
        </>
    );
};
export default Main;