//��꾭��ͼƬ��������
var entersl = document.getElementById("entersl");
var lis = entersl.children;
var entersr = document.getElementById("entersr");
var lisr = entersr.children;
var timer = null;
for(var i = 0 ; i < lis.length; i++){
    lis[i].onmouseover = function(){
        animate(this,{"opacity":1})
    }
    lis[i].onmouseout = function(){
        animate(this,{"opacity":0})
    }
}
for( var j = 0 ; j < lisr.length ; j++){
    lisr[j].onmouseover = function(){
        animate(this,{"opacity":1})
    }
    lisr[j].onmouseout = function(){
        animate(this,{"opacity":0})
    }
}

function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {//opacityҪ���⴦��
                //opacityû�е�λ ���������Զ�ת������ֵ ���Բ���parsetInt
                //ȡֵ��Χ 0-1 0.1 0.33 33 Ϊ������ǰ�ļ��㹫ʽ��Ч Ҫ����100��
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;//opacityû�е�λ
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];//�㼶����Ҫ���� ֱ�����ü���
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
//ȫ�����Զ�����Ŀ��ֵ�������
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
//����Ч��


//�������
window.onload = function () {
    var canv = document.getElementById('canv');
    var context = canv.getContext('2d');
       var ball = [];
    /* context.fillStyle = 'black';*/
    context.fillRect(0, 0, canv.width, canv.height);
    setInterval(function () {
        /* context.fillStyle = 'black';*/
        context.fillRect(0, 0, canv.width, canv.height);
        //����ball����ĳ��� ������С��
        for (var i = 0; i < ball.length; i++) {
            context.save();
            context.beginPath();
            //С���style ��ɫ �뾶 ͸���ȵ� ������
            context.fillStyle = ball[i].randomColor(ball[i].r, ball[i].g, ball[i].b, ball[i].opacity);
            context.moveTo(ball[i].x, ball[i].y);
            context.arc(ball[i].x, ball[i].y, ball[i].radius, 0, 360 * Math.PI / 180, false);
            context.fill();
            context.closePath();
            context.restore();//���ر����·����״̬
            //С��ĵķ���
            ball[i].x += ball[i].speedX;
            ball[i].y += ball[i].speedY;
            ball[i].opacity = (ball[i].opacity);
            if (ball[i].opacity < 0) {
                ball.splice(i, 1);
            }
        }
    }, 15);

    canv.onmousemove = function (ev) {
        var ev = ev || window.event;
        //���ÿ�δ��� ������ball������Ӷ���
        //�������������Ӧ�� ��ɫ �뾶 ͸���ȵ�����ֵ
        for (var i = 0; i < 5; i++) {
            ball.push({
                x: ev.clientX - canv.offsetLeft,
                y: ev.clientY - canv.offsetTop,
                radius: Math.floor(Math.random() * 12+1),
                r: Math.floor(Math.random() * 256),
                b: Math.floor(Math.random() * 256),
                g: Math.floor(Math.random() * 256),
                opacity: Math.random(),
                randomColor: function (r, g, b, opacity) {
                    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
                },
                speedX: (Math.random() * 11 + (-5)) / 1.5,
                speedY: -(ev.clientY - canv.offsetTop) / 50
            });
        }
    }
};

//center ���ӵ���俪
var box=document.getElementById("box");
var yi=document.getElementById("yi");
var er=document.getElementById("er");
var san=document.getElementById("san");
var si=document.getElementById("si");
var wu=document.getElementById("wu");
var liu=document.getElementById("liu");
var qi=document.getElementById("qi");
var ba=document.getElementById("ba");
var jiu=document.getElementById("jiu");
var shi=document.getElementById("shi");
var shiyi=document.getElementById("shiyi");
var shier=document.getElementById("shier");
box.ondblclick=function(){
    yi.style.transform="scale3d(1.2, 1.2, 1.2) rotateX(90deg) translateZ(100px)";
    er.style.transform="scale3d(1.2, 1.2, 1.2) rotateX(0deg) translateZ(100px)";
    san.style.transform="scale3d(1.2, 1.2, 1.2) rotateX(-90deg) translateZ(100px)";
    si.style.transform="scale3d(1.2, 1.2, 1.2) rotateY(180deg) translateZ(100px)";
    wu.style.transform="scale3d(1.2, 1.2, 1.2) rotateY(90deg) translateZ(100px)";
    liu.style.transform="scale3d(1.2, 1.2, 1.2) rotateY(270deg) translateZ(100px)";
    shiyi.style.transform="scale3d(0.8, 0.8, 0.8) rotateY(90deg) translateZ(100px)";
    shier.style.transform="scale3d(0.8, 0.8, 0.8) rotateY(270deg) translateZ(100px)";
    qi.style.transform="scale3d(0.8, 0.8, 0.8) rotateX(90deg) translateZ(100px)";
    ba.style.transform="scale3d(0.8, 0.8, 0.8) rotateX(0deg) translateZ(100px)";
    jiu.style.transform="scale3d(0.8, 0.8, 0.8) rotateX(-90deg) translateZ(100px)";
    shi.style.transform="scale3d(0.8, 0.8, 0.8) rotateY(180deg) translateZ(100px)";
    yi.style.display="block";
    san.style.display="block";
}
box.onclick=function(){
    er.style.transform="scale3d(1.2, 1.2, 1.2) rotateX(-45deg) translateZ(100px)";
    si.style.transform="scale3d(1.2, 1.2, 1.2) rotateX(225deg) translateZ(100px)";
    yi.style.display="none";
    san.style.display="none";
    liu.style.transform="scale3d(1.2, 1.2, 1.2) rotateX(405deg) translateZ(100px)";
    wu.style.transform="scale3d(1.2, 1.2, 1.2) rotateX(135deg) translateZ(100px)";
    qi.style.transform="scale3d(0.8, 0.8, 0.8) rotateX(90deg) translateZ(50px)";
    ba.style.transform="scale3d(0.8, 0.8, 0.8) rotateX(0deg) translateZ(50px)";
    jiu.style.transform="scale3d(0.8, 0.8, 0.8) rotateX(-90deg) translateZ(50px)";
    shi.style.transform="scale3d(0.8, 0.8, 0.8) rotateY(180deg) translateZ(50px)";
    shiyi.style.transform="scale3d(1.2, 1.2, 1.2) rotateY(90deg) rotate(45deg)translateZ(100px)";
    shier.style.transform="scale3d(1.2, 1.2, 1.2) rotateY(270deg) rotate(45deg) translateZ(100px)";
}