/**
 * Created by 孙书娴 on 2016/11/20.
*/
var ssx_one = document.getElementsByClassName("ssx_one");
for(var i = 0 ; i < ssx_one.length;i ++){
    ssx_one[i].onmouseover = function(){
            animate(this.children[0],{"opacity":1});
    };
}

for(var i = 0 ; i < ssx_one.length;i ++){
    ssx_one[i].onmouseout = function(){
        animate(this.children[0],{"opacity":0});
    };
}
window.onload = function () {
    var ssx_news = document.getElementById("ssx_news");
    var ssx_as=ssx_news.children;
    var ssx_ps=ssx_news.getElementsByClassName("ssx_zhezhao");
    for(var i=0;i<ssx_ps.length;i++){
        ssx_as[i].onmouseover=function(){
            for(var j=0;j<ssx_ps.length;j++){
                ssx_ps[j].style.background="";
            }
            this.children[0].style.opacity="1";
        }
        ssx_as[i].onmouseout=function(){
            animate(this.children[0],{"opacity":0});
        }
    }


//右侧旋转木马
    var flag = true;//表示节流阀是打开的
    var config = [
        {
            "width": 100,
            "top": 45,
            "left": 97,
            "opacity": 0.2,
            "zIndex": 2
        },//0
        {
            "width": 150,
            "top": 65,
            "left": 64,
            "opacity": 0.8,
            "zIndex": 3
        },//1
        {
            "width": 206,
            "top": 95,
            "left": 115,
            "opacity": 1,
            "zIndex": 4
        },//2
        {
            width: 150,
            top: 65,
            left: 213,
            opacity: 0.8,
            zIndex: 3
        },//3
        {
            "width": 100,
            "top": 45,
            "left": 225,
            "opacity": 0.2,
            "zIndex": 2
        }//4
    ];

    var ssx_content = document.getElementById("ssx_content");
    var ul = ssx_content.getElementsByTagName('ul')[0];
    var lis = ul.children;
    var arrLeft = document.getElementById("arrLeft");
    var arrRight = document.getElementById("arrRight");


    ssx_content.onmouseover = function(){
        animate(arrLeft,{"opacity":1});
        animate(arrRight,{"opacity":1});

    };
    ssx_content.onmouseout = function () {
        animate(arrLeft,{"opacity":0});
        animate(arrRight,{"opacity":0});
    };//移入鼠标显示箭头

    //各就各位
    function assgin(){
        for ( var i=0;i<lis.length;i++){
            animate(lis[i], config[i]);
        }
    }
    assgin();

    arrLeft.onclick = function (){
        config.push(config.shift());
        assgin();
    }
    arrRight.onclick = function (){
        config.unshift(config.pop());
        assgin();
    }
};
//右侧旋转木马


//animate
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15);
}
//animate

