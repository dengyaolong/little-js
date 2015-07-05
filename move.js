function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    return getComputedStyle(obj, false)[attr];
}
function updateAttr(obj, attr, value) {
    if (attr == 'opacity') {
        obj.style.filter = 'alpha(opacity:' + value + ')';
        obj.style.opacity = value / 100;
    } else {
        obj.style[attr] = value + 'px';

    }
}
function startBufferMove(obj, json, step, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var isOver = true;
        for (var key in json) {
            if (key == 'opacity') {
                var iAttr = Math.round(parseFloat(getStyle(obj, key)) * 100);
            } else {
                var iAttr = parseInt(getStyle(obj, key));

            }
            var speed = (json[key] - iAttr) / step;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (Math.abs(iAttr - json[key]) <= Math.abs(speed)) {

                updateAttr(obj, key, json[key]);
            } else {
                isOver = false;
                updateAttr(obj, key, iAttr + speed);
            }
        }

        if (isOver) {
            clearInterval(obj.timer);
            if (fn) fn();

        }
    }, 30);
}

function startMove(obj, json, speed, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var isOver = true;
        for (var key in json) {
            if (key == 'opacity') {
                var iAttr = Math.round(parseFloat(getStyle(obj, key)) * 100);
            } else {
                var iAttr = parseInt(getStyle(obj, key));

            }
            speed = (json[key] - iAttr) * speed > 0 ?  speed : -speed;
            if (Math.abs(iAttr - json[key]) <= Math.abs(speed)) {

                updateAttr(obj, key, json[key]);
            } else {
                isOver = false;
                updateAttr(obj, key, iAttr + speed);
            }
        }

        if (isOver) {
            clearInterval(obj.timer);
            if (fn) fn();

        }
    }, 30);
}