/**
 * Created by simin on 2016/11/14.
 */
window.onload = function () {
    //CK-js����  B
    BigenTop();
    function BigenTop() {
        var ckBanner = document.getElementById('ck_banner');
        var btl1 = document.getElementById('btl1');
        var ck_link1 = document.getElementById('ck_link1');
        var ck_link2 = document.getElementById('ck_link2');
        var ck_link3 = document.getElementById('ck_link3');
        var ck_suit = document.getElementById('ck_suit');


//�𺳽��ٵ�Ч��
        btl1.onclick = function () {
            animate(this, {'width': 530, 'height': 118}, function () {
                animate(btl1, {'width': 1061, 'height': 235})
            })
        }

//������ֵ��װ��Ч��
        window.onscroll = function () {
            if (window.pageYOffset > btl1.offsetTop) {
                animate(ck_suit, {'height': 510}, function () {
                    //ck_link1.style.visibility = 'visible';
                    animate(ck_link1, {'top': 800}, function () {
                        //ck_link2.style.visibility = 'visible';
                        animate(ck_link2, {'top': 800}, function () {
                            //ck_link3.style.visibility = 'visible';
                            animate(ck_link3, {'top': 800})
                        })
                    })
                });
            }
        }
        ck_link1.onmouseover = function () {
            doMove(ck_link1, 3, 776, 'top', function () {
                doMove(ck_link1, 3, 824, 'top', function () {
                    doMove(ck_link1, 3, 800, 'top');
                });
            });
        }
        ck_link1.onclick = function () {
            shake(this, 'left');
        }
        ck_link2.onmouseover = function () {
            doMove(ck_link2, 3, 776, 'top', function () {
                doMove(ck_link2, 3, 824, 'top', function () {
                    doMove(ck_link2, 3, 800, 'top');
                });
            });
        }
        ck_link2.onclick = function () {
            shake(this, 'left');
        };
        ck_link3.onmouseover = function () {
            doMove(ck_link3, 3, 776, 'top', function () {
                doMove(ck_link3, 3, 824, 'top', function () {
                    doMove(ck_link3, 3, 800, 'top');
                });
            });
        }
        ck_link3.onclick = function () {
            shake(this, 'left');
        }
//������ֵ��װ��Ч��

//��������Сͼ��
        var imgicon = document.getElementById('imgicon');
        imgicon.onmouseover = function () {
            this.style.rotation = '32';
        }

//��������Сͼ��


//�������ִ�ͼ
        var np_top = document.getElementById('np_top');
        var np1 = document.getElementById('np1');
        var np2 = document.getElementById('np2');
        var np3 = document.getElementById('np3');
        var np4 = document.getElementById('np4');
        var np5 = document.getElementById('np5');

        $(function () {
            $('#imgicon').mouseenter(function () {
                $('#np1').animate({'left': 1500}, 400, function () {
                    $('#np2').animate({'left': 1500}, 300, function () {
                        $('#np3').animate({'left': 1500}, 200, function () {
                            $('#np4').animate({'left': 1500}, 100, function () {
                                $('#np5').animate({'left': 1500}, 50, function () {
                                    $('#np5').animate({'left': 1149}, 50, function () {
                                        shake(np5, 'left');
                                        $('#np4').animate({'left': 915}, 100, function () {
                                            shake(np4, 'left');
                                            $('#np3').animate({'left': 701}, 200, function () {
                                                shake(np3, 'left');
                                                $('#np2').animate({'left': 504}, 300, function () {
                                                    shake(np2, 'left');
                                                    $('#np1').animate({'left': 261}, 400, function () {
                                                        shake(np1, 'left');
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

//�������ִ�ͼok


//��������
        function animate(obj, json, fn) {

            clearInterval(obj.timer);
            obj.timer = setInterval(function () {

                var onOff = true; //���趼�����յ�

                for (var k in json) {

                    if (k === 'opacity') { //�������͸����
                        var leader = parseInt(getStyle(obj, k)) * 100;
                        var step = (json[k] * 100 - leader) / 5;

                        step = step > 0 ? Math.ceil(step) : Math.floor(step);

                        leader = leader + step;
                        obj.style[k] = leader / 100;

                    } else if (k === 'zIndex') {
                        obj.style.index = json[k];

                    } else {
                        var leader = parseInt(getStyle(obj, k)) || 0;
                        var step = (json[k] - leader) / 5;

                        step = step > 0 ? Math.ceil(step) : Math.floor(step);

                        leader = leader + step;
                        obj.style[k] = leader + 'px';
                    }


                    if (leader != json[k]) {    //δ�����յ�
                        onOff = false;
                    }
                }

                if (onOff) {  //�����յ㣬�嶨ʱ��
                    clearInterval(obj.timer);
                    fn && fn();
                }

            }, 15)
        }

        function getStyle(obj, attr) {

            return window.getComputedStyle ? window.getComputedStyle(obj, null)[attr] :
                obj.currentStyle[attr];
        }

//��������

//����
        function shake(obj, direction, endFn) {
            var arr = new Array();
            var num = 0;
            for (var i = 20; i > 0; i -= 2) {
                arr.push(i, -i);
            }
            arr.push(0);
            var position = parseInt(getStyle(obj, direction));
            //obj.onclick=function(){
            clearInterval(obj.shaketimer);
            obj.shaketimer = setInterval(function () {
                obj.style[direction] = position + arr[num] + "px";
                num++;
                if (num == arr.length) {
                    clearInterval(obj.shaketimer);
                    num = 0;
                    endFn && endFn();
                }
            }, 50);
            //}
        }

//����


//���������ƶ�����
        function doMove(obj, dir, target, attr, endFn) {
            //obj.onclick=function(){
            dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var speed = parseInt(getStyle(obj, attr)) + dir;
                if (speed > target && dir > 0 || speed < target && dir < 0) {
                    speed = target;
                    clearInterval(obj.timer);
                    endFn && endFn();
                }
                obj.style[attr] = speed + "px";
            }, 30);
            //}
        }

//���������ƶ�����


//��������������Ч
        var div1 = document.getElementById("ckfloat_nav");
        var speedX = 0;
        var speedY = 0;
        var lastX = 0;
        var lastY = 0;

        function starmove(obj) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var w = obj.offsetWidth;
                var h = obj.offsetHeight;
                var dw = document.documentElement.clientWidth;
                var dh = document.documentElement.clientHeight;
                speedY += 3;
                var l = obj.offsetLeft + speedX;
                var t = obj.offsetTop + speedY;
                if (t > dh - h) {
                    speedY *= -0.8;
                    speedX *= 0.8;
                    t = dh - h;
                }
                if (t < 0) {
                    speedY *= -1;
                    t = 0;
                }
                if (l > dw - w) {
                    speedX *= -0.8;
                    l = dw - w;
                }
                if (l < 0) {
                    speedX *= -0.8;
                    l = 0;
                }
                if (Math.abs(speedX) < 1) {
                    speedX = 0;
                }
                if (Math.abs(speedY) < 1) {
                    speedY = 0;
                }
                if (speedX == 0 && speedY == 0 && t == dh - h) {
                    clearInterval(obj.timer);
                }
                obj.style.left = l + "px";
                obj.style.top = t + "px";
            }, 30);
        }

        function drag1(obj) {
            obj.onmousedown = function (ev) {
                var ev = ev || event;
                var disx = ev.clientX - this.offsetLeft;
                var disy = ev.clientY - this.offsetTop;
                document.onmousemove = function (ev) {
                    var ev = ev || event;
                    var l = ev.clientX - disx;
                    var t = ev.clientY - disy;
                    if (l < 30) {
                        l = 0;
                    }
                    if (l > document.documentElement.clientWidth - obj.offsetWidth - 30) {
                        l = document.documentElement.clientWidth - obj.offsetWidth;
                    }
                    if (t < 30) {//������������
                        t = 0;
                    }
                    if (t > document.documentElement.clientHeight - obj.offsetHeight - 30) {
                        t = document.documentElement.clientHeight - obj.offsetHeight;
                    }
                    speedX = l - lastX;
                    speedY = t - lastY;
                    lastX = l;
                    lastY = t;
                    obj.style.left = l + "px";
                    obj.style.top = t + "px";
                }
                document.onmouseup = function () {
                    starmove(obj);
                    document.onmousemove = document.onmouseup = null;
                }
                clearInterval(obj.timer);
                return false;
            }
        }

        drag1(div1);
        document.onkeydown = function () {
            clearInterval(div1.timer);
        }

    }

//��������������Ч
    //CK -js���� E


    // WDL -js���� B
//Top ��ʼ
    BigenBottom();
    function BigenBottom() {
        //  �����Լ۱� B
        function price() {
            var wdlTop = document.getElementById("wdl_top");
            var part2 = document.getElementById("part2");
            var inventory = document.getElementById("inventory");
            var timer = null;
            //ҵ���߼�������꾭��patt2��ʱ�򽥽������������,�뿪ʱ��ʾ����  ���ҽ����߼��ᵽ������
            part2.onmouseover = function (event) {
                animate(part2, {opacity: 0});

            }
            part2.onmouseout = function () {
                animate(part2, {opacity: 1});
            }
        }

        price();
//  �����Լ۱� E
//��ߵ��޷���� B
        function scr() {
            var leftBox = document.getElementById("leftbox");
            var ul = leftBox.children[0];
            var lis = ul.children;
            timer = setInterval(function () {
                var leader = ul.offsetLeft;
                var temp = -2;
                if (leader > -1663) {//1663
                    leader = leader + temp;
                    ul.style.left = leader + "px";
                } else {
                    ul.style.left = 0;
                }
                ul.onmouseenter = function () {
                    clearInterval(timer);
                }
                ul.onmouseleave = function () {
                    clearInterval(timer);
                    scr();
                }
            }, 15)
        }

        scr();
//��ߵ��޷���� E
//�ұߵ���ת B
        var i = 0;
        var z = 120;
        var y = 240;
        var r = 10;

        function rotation() {
            var pgm1 = document.getElementById("pgm1");
            var pgm2 = document.getElementById("pgm2");
            var pgm3 = document.getElementById("pgm3");
            var timer = null;
            var arr = [pgm1, pgm2, pgm3];
            //ҵ���߼�����СԲ�ڴ��������Բ���˶�
            //x��y��z ��ת�ĽǶ�
            timer = setInterval(function () {
                var pgm1x = Math.cos((i * Math.PI) / 180) * r;
                var pgm1y = Math.sin((i * Math.PI) / 180) * r;
                var pgm2x = Math.cos((z * Math.PI) / 180) * r;
                var pgm2y = Math.sin((z * Math.PI) / 180) * r;
                var pgm3x = Math.cos((y * Math.PI) / 180) * r;
                var pgm3y = Math.sin((y * Math.PI) / 180) * r;

                pgm1.style.left = pgm1x + "px";
                pgm1.style.top = pgm1y + "px";
                pgm2.style.left = pgm2x + "px";
                pgm2.style.top = pgm2y + "px";
                pgm3.style.left = pgm3x + "px";
                pgm3.style.top = pgm3y + "px";
                i = i + 0.7;
                if (i === 360) {
                    i = 0;
                }
                z = z + 0.7;
                if (z === 360) {
                    z = 0;
                }
                y = y + 0.7;
                if (y === 360) {
                    y = 0;
                }
                if (r <= 170) {
                    r++;
                }
            }, 15)
            for (var j = 0; j < arr.length; j++) {
                arr[j].onmouseover = function () {
                    clearInterval(timer);

                }
                arr[j].onmouseout = function () {

                    clearInterval(timer);
                    rotation();
                }
            }
        }

        rotation();
//�ұߵ���ת E
// Top����

//center ��ʼ
//ů�����տ�ʼ
        function partThree() {
            var part3 = document.getElementById("part3")
            part3.onmouseover = function () {
                animate(part3, {opacity: 0.4})
            }
            part3.onmouseout = function () {
                animate(part3, {opacity: 1})
            }
        }

        partThree();
//ů�����ս���
//win B

        var wins = document.getElementsByClassName("win");
        for (var i = 0; i < wins.length; i++) {
            win(wins[i]);
        }
        function win(obj) {
            var b = 0;
            var c = true;
            obj.timer = setInterval(fun, 50);
            function fun() {
                if (c == true) {
                    b++;
                }
                if (b == 100) {
                    b--;
                    c = false
                }
                if (b == 20) {
                    b++;
                    c = true;
                }
                if (c == false) {
                    b--;
                }
                obj.style.opacity = b / 100;

            }

            obj.onmouseover = function () {
                clearInterval(obj.timer);
                animate(obj, {opacity: 1});
            };
            obj.onmouseout = function () {
                clearInterval(obj.timer);
                c = false;
                b = 100;
                obj.timer = setInterval(fun, 50);
            };
        }

//win E
//center ����
//bottom ��ʼ
//left B
        var bottomLeft = document.getElementById("bottom_left");
        var as = bottomLeft.children;
        for (var i = 2; i < as.length; i++) {
            as[i].onmouseover = function () {
                animate(this, {opacity: 1});
            };
            as[i].onmouseout = function () {
                animate(this, {opacity: 0.3});
            }
        }
        function wave(obj) {
            obj.timer = null;
            var leader = bottomLeft.offsetHeight;
            obj.timer = setInterval(showy, 15)
            function showy() {
                var target = -obj.offsetHeight;
                var step = -2;
                leader = leader + step;
                obj.style.top = leader + "px";
                if (leader < target) {
                    leader = bottomLeft.offsetHeight;
                }
            }

            obj.onmouseover = function () {
                clearInterval(obj.timer);
            }
            obj.onmouseout = function () {
                clearInterval(obj.timer);
                obj.timer = setInterval(showy, 15)
            }
        }

        wave(as[0]);
        setTimeout(function () {
            wave(as[1])
        }, 3000);
//left E
//right B
//�Ҳ��Ϸ���ͼƬ����
        var rightpicT = document.getElementById("rightpicT");
        var lightTop = document.getElementById("lightTop");
        var lightRight = document.getElementById("lightRight");
        var lightBottom = document.getElementById("lightBottom");
        var lightLeft = document.getElementById("lightLeft");

        function ligthBorder() {
            animate(lightLeft, {height: 272}, function () {
                animate(lightTop, {width: 382}, function () {
                    animate(lightRight, {height: 272}, function () {
                        animate(lightBottom, {width: 382});//
                    });
                });
            })
        }

        function darkBorder() {
            animate(lightRight, {height: 0}, function () {
                animate(lightTop, {width: 0}, function () {
                    animate(lightLeft, {height: 0}, function () {
                        animate(lightBottom, {width: 0});//
                    })
                });
            });
        }

        rightpicT.onmouseover = function () {
            ligthBorder();
        }
        rightpicT.onmouseout = function () {
            darkBorder();
        }

        function changeSite() {
            var ul = document.getElementById("rightpicB");
            var lis = ul.children;
            var arr = [];
            for (var i = 0; i < lis.length; i++) {
                arr[i] = {left: lis[i].offsetLeft, top: lis[i].offsetTop};
            }
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.left = arr[i].left + 'px';
                lis[i].style.top = arr[i].top + 'px';
                lis[i].style.position = 'absolute';
                lis[i].index = i;
            }
            //���li��ǩ�����ƶ����li
            for (i = 0; i < lis.length; i++) {
                setDrag(lis[i]);
            }
            var iMinZindex = 2;

            function setDrag(obj) {
                obj.onmousedown = function (event) {
                    obj.style.zIndex = iMinZindex++;
                    var event = eventUtil.getEvent(event);
                    var pageX = eventUtil.getPageX(event);
                    var pageY = eventUtil.getPageY(event);
                    var objX = pageX - obj.offsetLeft;
                    var objY = pageY - obj.offsetTop;
                    document.onmousemove = function (event) {
                        var event = eventUtil.getEvent(event);
                        var pageX = eventUtil.getPageX(event);
                        var pageY = eventUtil.getPageY(event);
                        for (var i = 0; i < lis.length; i++) {
                            lis[i].className = "";
                        }
                        var near = findNearest(obj);
                        if (near) {
                            near.className = "active"; //�����������ײ������
                        }
                        //�������ں����е�λ��
                        obj.style.left = pageX - objX + "px";
                        obj.style.top = pageY - objY + "px";
                    }
                    //���һ����굯���¼� �����ɿ�����ʱ���Ӳ�������ƶ�
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                        var near = findNearest(obj);
                        if (near) {
                            near.className = "";
                            near.style.zindex = iMinZindex++;
                            animate(near, arr[obj.index]);
                            animate(obj, arr[near.index]);
                            //λ���ƶ�������������ֵҲҪ�ı�
                            var temp = obj.index;
                            obj.index = near.index;
                            near.index = temp;
                        } else {
                            animate(obj, arr[obj.index]);
                        }
                    };
                    clearInterval(obj.timer);
                    return false;
                }
            }

            //��ײ���
            function cdTest(obj1, obj2) {
                var l1 = obj1.offsetLeft;
                var r1 = obj1.offsetLeft + obj1.offsetWidth;
                var t1 = obj1.offsetTop;
                var b1 = obj1.offsetTop + obj1.offsetHeight;
                var l2 = obj2.offsetLeft;
                var r2 = obj2.offsetLeft + obj2.offsetWidth;
                var t2 = obj2.offsetTop;
                var b2 = obj2.offsetTop + obj2.offsetHeight;
                if (r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) {
                    return false;
                }
                else {
                    return true;
                }
            }

            function getDis(obj1, obj2) {
                var a = obj1.offsetLeft - obj2.offsetLeft;
                var b = obj1.offsetTop - obj2.offsetTop;

                return Math.sqrt(a * a + b * b);
            }

            function findNearest(obj)	//�ҵ����ϵģ����������
            {
                var iMin = 1000;  //����һ����Сֵ����
                var iMinIndex = -1;

                for (i = 0; i < lis.length; i++) {
                    if (obj == lis[i]) {
                        continue
                    }
                    ;

                    if (cdTest(obj, lis[i])) {
                        var dis = getDis(obj, lis[i]);

                        if (iMin > dis) {
                            iMin = dis;
                            iMinIndex = i;
                        }
                    }
                }

                if (iMinIndex == -1) {
                    return null;
                }
                else {
                    return lis[iMinIndex];
                }
            }

        }

        changeSite();
    }

//right E
//bottom ����
    //WDL -JS���� E
};
