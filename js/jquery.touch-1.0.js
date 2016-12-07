(function(){
    function swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >=
            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    }
    $(document).ready(function(){
        var touch = {};
        $(document)
            .on('touchstart',function(e){
                e = e.originalEvent ? e.originalEvent : e;
                var fTouch = e.touches[0];
                touch.x1 = fTouch.pageX;
                touch.y1 = fTouch.pageY;
                touch.el = $('tagName' in fTouch.target ?
                    fTouch.target : fTouch.target.parentNode);
            })
            .on('touchmove',function(e){
                e = e.originalEvent ? e.originalEvent : e;
                var fTouch = e.touches[0];
                touch.x2 = fTouch.pageX;
                touch.y2 = fTouch.pageY;
            })
            .on('touchend',function(e){
                if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
                    (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)){
                    touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
                    touch = {}
                }
            });
    });
    ["swipeLeft","swipeRight","swipeUp","swipeDown"].forEach(function(eName){
        $.fn[eName] = function(callback){ return this.on(eName, callback) }
    });
})($);