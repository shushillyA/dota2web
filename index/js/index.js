/**
 * Created by Administrator on 2016/11/17 0017.
 */

var radius = 120;
var dtr = Math.PI/180;
var d=300;

var mcList = [];
var active = false;
var lasta = 1;
var lastb = 1;
var distr = true;
var tspeed=1;
var size=250;

var mouseX=0;
var mouseY=0;

var howElliptical=1;

var aA=null;
var oDiv=null;
window.onload= function () {
    //刘元圣导航开始
    var lys_navul=document.getElementById("lys_navul");
    var lys_navul_li=lys_navul.children;
    for(var i= 0;i<lys_navul_li.length;i++){
        lys_navul_li[i].onmouseover=function(){
            for(var j=0;j<lys_navul_li.length;j++){
                lys_navul_li[j].children[1].style.display="none";
            }
            this.children[1].style.display="block";
        }
        lys_navul_li[i].onmouseout=function(){
            for(var j=0;j<lys_navul_li.length;j++){
                lys_navul_li[j].children[1].style.display="none";
            }
        }
    }
    //刘元圣导航结束

    //刘元圣轮播图开始
    function lunbo(){
        var box=document.getElementById("lys_lunbowrap");
        var ul=document.getElementById("lys_lunbocontent");
        var ol=document.getElementById("lys_lunbodian");
        var ullis=ul.children;
        var arrow=document.getElementById("lys_arrow");
        var left=document.getElementById("lys_arrowleft");
        var right=document.getElementById("lys_arrowright");
        var pic=0;
        var square=0;
        var timer=null;
        var ollis=ol.children;
        for(var i=0;i<ollis.length;i++){
            ollis[i].index=i;
            ollis[i].onmouseover=function(){
                //for(var j=0;j<ollis.length;j++){
                //    ollis[j].className="";
                //}
                //this.className="lys_lunboicon lys_lunboiconactive";
                animate1(ul,-this.index*1366);
                pic=square=this.index;
            }
        }
        //ollis[0].className="current";
        var firstimg=ullis[0].cloneNode(true);
        ul.appendChild(firstimg);

        //timer=setInterval(playnext,6000);
        box.onmouseover=function(){
            arrow.style.display="block";
            clearInterval(timer);
        }
        box.onmouseout=function(){
            arrow.style.display="none";
            timer=setInterval(playnext,6000);
        }
        right.onclick=function(){
            if(pic==ullis.length-1){
                ul.style.left=0;
                pic=0;
            }
            pic++;
            var target=-pic*1366;
            animate1(ul,target);
            if(square<ollis.length-1){
                square++;
            }else{
                square=0;
            }
            //for(var i=0;i<ollis.length;i++){
            //    ollis[i].className="";
            //}
            //
            //ollis[square].className="current";
        }
        left.onclick=function(){
            if(pic==0){
                ul.style.left=-(ullis.length-1)*1366+"px";
                pic=ullis.length-1;
            }
            pic--;
            var target=-pic*1366;
            animate1(ul,target);
            if(square>0){
                square--;
            }else{
                square=ollis.length-1;
            }
          ssName="current";
        }
//滚轮事件不加了
        //box.onmousewheel=function(ev){
        //    var ev=ev||event;
        //    if(ev.wheelDelta<0){
        //        right.onclick();
        //    }
        //    if(ev.wheelDelta>0){
        //        left.onclick();
        //    }
        //}

        function playnext(){
            right.onclick();
        }

        function animate1(obj,target){
            clearInterval(obj.timer);
            obj.timer=setInterval(function(){
                var leader=obj.offsetLeft;
                var step=20;
                step=leader<target?step:-step;
                if(Math.abs(target-leader)>=Math.abs(step)){
                    leader+=step;
                    obj.style.left=leader+"px";
                }else{
                    obj.style.left=target+"px";
                    clearInterval(obj.timer);
                }
            },15);
        }
        function drag1(obj){
            obj.onmousedown=function(ev){
                var clx=ev.clientX;
                var ev=ev||event;
                var disx=ev.clientX-this.offsetLeft;
                var disy=ev.clientY-this.offsetTop;
                document.onmousemove=function(ev){
                    var ev=ev||event;
                    var l=ev.clientX-disx;
                    var t=ev.clientY-disy;
                    if(l>0){
                        l=0;
                    }
                    if(l<-(4)*1366){
                        l=-(4)*1366;
                    }
                    if(t>0||t<0){
                        t=0;
                    }
                    obj.style.left=l+"px";
                    obj.style.top=t+"px";
                }
                document.onmouseup=function(ev){
                    var ev=ev||event;
                    console.log(ev.clientX-clx);
                    if(ev.clientX-clx>0){
                        left.onclick();
                    }
                    if(ev.clientX-clx<0){
                        right.onclick();
                    }
                    document.onmousemove=document.onmouseup=null;
                }
                return false;//当页面选中文字或者图片的时候进行拖拽会出问题
            }
        }
        drag1(ul);
    }
    lunbo();
    //刘元圣轮播图结束
    //右侧旋转木马
    var flag = true;
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
    };
//右侧旋转木马
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
    var lys_newslist=document.getElementById("lys_newslist");
    var lys_lis=lys_newslist.children;
    var lys_ps=lys_newslist.getElementsByClassName("lys_zhezhao");
    toShow(lys_newslist);
    function toShow(obj){
        var aDiv = obj.getElementsByTagName('div');
        var iNow = 0;
        var timer = null;
        var timer1=null;
        var bBtn = true;
        timer1=setInterval(function(){
            toChange();
        },3000);
        obj.onmouseover=function(){
            clearInterval(timer1);
        }
        obj.onmouseout=function(){
            timer1=setInterval(function(){
                toChange();
            },4000);
        }
        function toChange(){
            timer = setInterval(function(){
                if(iNow==aDiv.length){
                    clearInterval(timer);
                    iNow = 0;
                    bBtn = !bBtn;
                }
                else if(bBtn){
                    animate(aDiv[iNow],{top:0});
                    iNow++;
                }
                else{
                    animate(aDiv[iNow],{top:-45});
                    iNow++;
                }
            },100);
        }
    }
    for(var i=0;i<lys_ps.length;i++){
        lys_lis[i].onmouseover=function(){
            for(var j=0;j<lys_ps.length;j++){
                lys_ps[j].style.background="";
            }
            this.children[0].style.opacity="1";
        }
        lys_lis[i].onmouseout=function(){
            animate(this.children[0],{"opacity":0});
        }
    }
    var i=0;
    var oTag=null;

    oDiv=document.getElementById('div1');

    aA=oDiv.getElementsByTagName('a');

    for(i=0;i<aA.length;i++)
    {
        oTag={};

        oTag.offsetWidth=aA[i].offsetWidth;
        oTag.offsetHeight=aA[i].offsetHeight;

        mcList.push(oTag);
    }

    sineCosine( 0,0,0 );

    positionAll();

    oDiv.onmouseover=function ()
    {
        active=true;
    };

    oDiv.onmouseout=function ()
    {
        active=false;
    };

    oDiv.onmousemove=function (ev)
    {
        var oEvent=window.event || ev;

        mouseX=oEvent.clientX-(oDiv.offsetLeft+oDiv.offsetWidth/2);
        mouseY=oEvent.clientY-(oDiv.offsetTop+oDiv.offsetHeight/2);

        mouseX/=1;
        mouseY/=1;
    };

    setInterval(update, 15);

}
function positionAll()
{
    var phi=0;
    var theta=0;
    var max=mcList.length;
    var i=0;

    var aTmp=[];
    var oFragment=document.createDocumentFragment();

    //随机排序
    for(i=0;i<aA.length;i++)
    {
        aTmp.push(aA[i]);
    }

    aTmp.sort
    (
        function ()
        {
            return Math.random()<0.5?1:-1;
        }
    );

    for(i=0;i<aTmp.length;i++)
    {
        oFragment.appendChild(aTmp[i]);
    }

    oDiv.appendChild(oFragment);

    for( var i=1; i<max+1; i++){
        if( distr )
        {
            phi = Math.acos(-1+(2*i-1)/max);
            theta = Math.sqrt(max*Math.PI)*phi;
        }
        else
        {
            phi = Math.random()*(Math.PI);
            theta = Math.random()*(2*Math.PI);
        }
        //坐标变换
        mcList[i-1].cx = radius * Math.cos(theta)*Math.sin(phi);
        mcList[i-1].cy = radius * Math.sin(theta)*Math.sin(phi);
        mcList[i-1].cz = radius * Math.cos(phi);

        aA[i-1].style.left=mcList[i-1].cx+oDiv.offsetWidth/2-mcList[i-1].offsetWidth/2+'px';
        aA[i-1].style.top=mcList[i-1].cy+oDiv.offsetHeight/2-mcList[i-1].offsetHeight/2+'px';
    }
}
function update()
{
    var a;
    var b;

    if(active)
    {
        a = (-Math.min( Math.max( -mouseY, -size ), size ) / radius ) * tspeed;
        b = (Math.min( Math.max( -mouseX, -size ), size ) / radius ) * tspeed;
    }
    else
    {
        a = lasta * 0.98;
        b = lastb * 0.98;
    }

    lasta=a;
    lastb=b;

    if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
    {
        return;
    }

    var c=0;
    sineCosine(a,b,c);
    for(var j=0;j<mcList.length;j++)
    {
        var rx1=mcList[j].cx;
        var ry1=mcList[j].cy*ca+mcList[j].cz*(-sa);
        var rz1=mcList[j].cy*sa+mcList[j].cz*ca;

        var rx2=rx1*cb+rz1*sb;
        var ry2=ry1;
        var rz2=rx1*(-sb)+rz1*cb;

        var rx3=rx2*cc+ry2*(-sc);
        var ry3=rx2*sc+ry2*cc;
        var rz3=rz2;

        mcList[j].cx=rx3;
        mcList[j].cy=ry3;
        mcList[j].cz=rz3;

        per=d/(d+rz3);

        mcList[j].x=(howElliptical*rx3*per)-(howElliptical*2);
        mcList[j].y=ry3*per;
        mcList[j].scale=per;
        mcList[j].alpha=per;

        mcList[j].alpha=(mcList[j].alpha-0.6)*(10/6);
    }

    doPosition();
    depthSort();
}

function depthSort()
{
    var i=0;
    var aTmp=[];

    for(i=0;i<aA.length;i++)
    {
        aTmp.push(aA[i]);
    }

    aTmp.sort
    (
        function (vItem1, vItem2)
        {
            if(vItem1.cz>vItem2.cz)
            {
                return -1;
            }
            else if(vItem1.cz<vItem2.cz)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
    );

    for(i=0;i<aTmp.length;i++)
    {
        aTmp[i].style.zIndex=i;
    }
}
function doPosition()
{
    var l=oDiv.offsetWidth/2;
    var t=oDiv.offsetHeight/2;
    for(var i=0;i<mcList.length;i++)
    {
        aA[i].style.left=mcList[i].cx+l-mcList[i].offsetWidth/2+'px';
        aA[i].style.top=mcList[i].cy+t-mcList[i].offsetHeight/2+'px';

        aA[i].style.fontSize=Math.ceil(12*mcList[i].scale/2)+8+'px';

        aA[i].style.filter="alpha(opacity="+100*mcList[i].alpha+")";
        aA[i].style.opacity=mcList[i].alpha;
    }
}

function sineCosine( a, b, c)
{
    sa = Math.sin(a * dtr);
    ca = Math.cos(a * dtr);
    sb = Math.sin(b * dtr);
    cb = Math.cos(b * dtr);
    sc = Math.sin(c * dtr);
    cc = Math.cos(c * dtr);
}