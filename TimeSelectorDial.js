/**
 * @name 时间选择器-移动端_转盘
 */

/**
 * @name 转盘时间选择器
 * @type Class
 */
const TimeSelectorDial=(()=>
{
/*成员*/
    const Css=
    `
        .TimeSelectorDial
        {
            z-index:100;

            width:100vw;

            font-size:16px;
            color:grey;
        }

        .TimeSelectorDial_Mask
        {
            visibility:hidden;
            position:fixed;
            left:0;
            top:0;

            width:100%;
            height:100vh;
            padding:0;
            border:none;

            background-color:hsla(0,0%,0%,0.5);
            opacity:0;

            transition:visibility 0.5s,opacity 0.5s;
        }

        .TimeSelectorDial.show>.TimeSelectorDial_Mask
        {
            visibility:visible;
            opacity:1;
        }

        .TimeSelectorDial_Main
        {
            overflow:hidden;
            display:flex;
            position:fixed;
            left:0;
            bottom:-191px;

            width:100%;
            height:200px;

            background-color:white;

            transition:bottom 0.5s;
        }

        .TimeSelectorDial.show>.TimeSelectorDial_Main
        {
            bottom:0;
        }

        .TimeSelectorDial_Date
        {
            display:flex;
            flex-direction:column;
            justify-content:center;

            padding:1em 0 1em 1.5em;
        }

        .TimeSelectorDial_Date>div
        {
            padding:0.15em 1em;

            font-size:1em;
            line-height:1.5;
            vertical-align:middle;
        }
        .TimeSelectorDial_Date>div:not(:last-child)
        {
            border-bottom:1px solid skyblue;
        }

        .TimeSelectorDial_Date>div.select
        {
            background-color:skyblue;
            
            color:white;
        }

        .TimeSelectorDial_Date>div>span:last-child
        {
            float:right;
            margin-left:1em;
        }

        .TimeSelectorDial_Dial
        {
            flex:1;
            display:flex;
            justify-content:center;
            align-items:center;
        }

        .TimeSelectorDial_Dial_Svg
        {
            width:8em;
            height:8em;

            color:#0099CC;

            transform-origin:50% 50%;
        }

        .TimeSelectorFial_Control
        {
            display:flex;
            flex-direction:column;
            justify-content:space-between;
        }

        .TimeSelectorFial_Control_Confirm,.TimeSelectorFial_Control_Cancel
        {
            width:3em;
            height:3em;
        }

        .TimeSelectorFial_Control_Confirm
        {
            fill:green;
        }

        .TimeSelectorFial_Control_Cancel
        {
            fill:red;
        }
    `;
    const Html=
    `
        <div class='TimeSelectorDial_Mask'></div>
        <div class='TimeSelectorDial_Main'>
            <div class='TimeSelectorDial_Date'>
                <div class='select'><span>年</span><span>0000</span></div>
                <div><span>月</span><span>00</span></div>
                <div><span>日</span><span>00</span></div>
                <div><span>时</span><span>00</span></div>
                <div><span>分</span><span>00</span></div>
                <div><span>秒</span><span>00</span></div>
            </div>
            <div class='TimeSelectorDial_Dial'>
                <svg class='TimeSelectorDial_Dial_Svg' viewBox='-500 -500 1000 1000' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
                    <defs>
                        <marker id='TimeSelectorDial_Dial_MarkerArrow' markerWidth='10' markerHeight='10' refx='5' refy='5' orient='auto' markerUnits='strokeWidth'>  
                            <path d='M2,2 L2,8 L8,5 Z' fill='currentColor'/>  
                        </marker>
                    </defs>
                    <g>
                        <circle cx=0 cy=0 r=400 fill='currentColor'></circle>
                        <circle cx=0 cy=0 r=350 fill='white'></circle>
                        <circle cx=375 cy=0 r=70 fill='currentColor' stroke='white' stroke-width=40 transform='rotate(-20)'></circle>
                        <path d='M 100 0 A 100 100 0 1 1 0 -100' fill='none' stroke='currentColor' stroke-width=10 marker-end='url(#TimeSelectorDial_Dial_MarkerArrow)'></path>
                    </g>
                </svg>
            </div>
            <div class='TimeSelectorFial_Control'>
                <svg class='TimeSelectorFial_Control_Confirm' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='200' height='200'><path d='M723.5046 384.434649c-7.766894-7.767917-17.84953-11.570523-28.0171-11.975752-11.277858-0.466628-22.682605 3.332908-31.326473 11.975752l-194.121186 194.10072L359.856369 468.353944c-8.641821-8.642844-20.064988-12.44238-31.348985-11.975752-10.165524 0.405229-20.22974 4.207835-27.993564 11.975752-7.765871 7.743358-11.546987 17.825994-11.973706 27.991518-0.445138 11.283997 3.334955 22.709211 11.973706 31.327496l139.865491 139.864468c8.193613 8.192589 18.928095 12.300141 29.661553 12.300141 10.733459 0 21.467941-4.107551 29.68202-12.300141l223.783763-223.783763c8.618285-8.617261 12.421914-20.043499 11.954263-31.327496C735.051587 402.261667 731.250004 392.179031 723.5046 384.434649z'></path></svg>
                <svg class='TimeSelectorFial_Control_Cancel' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M679.453315 383.633401c-0.409322-10.153244-4.200672-20.195971-11.954263-27.948539-7.751544-7.749498-17.767666-11.517311-27.947516-11.954263-11.301394-0.436952-22.709211 3.330862-31.335682 11.954263l-96.099708 96.127338-96.100732-96.127338c-8.625448-8.623401-20.034289-12.391215-31.333636-11.954263-10.152221 0.436952-20.195971 4.204765-27.948539 11.954263-7.752568 7.751544-11.544941 17.795295-11.954263 27.948539-0.464581 11.299347 3.327792 22.708188 11.954263 31.333636l96.099708 96.127338-96.099708 96.074126c-8.626471 8.625448-12.418844 20.034289-11.954263 31.333636 0.409322 10.152221 4.201695 20.195971 11.954263 27.948539 7.751544 7.751544 17.795295 11.57257 27.948539 11.95631 11.299347 0.490164 22.708188-3.330862 31.333636-11.95631l96.100732-96.073102 96.099708 96.073102c8.626471 8.625448 20.034289 12.44545 31.335682 11.95631 10.178827-0.38374 20.194948-4.203742 27.947516-11.95631 7.752568-7.751544 11.543917-17.796318 11.954263-27.948539 0.463558-11.299347-3.327792-22.708188-11.954263-31.333636l-96.099708-96.074126 96.099708-96.127338C676.125523 406.341588 679.916872 394.932748 679.453315 383.633401z'></path></svg>
            </div>
        </div>
    `;
    /**
     * @name 绑定拖动旋转功能
     * @type Function
     * @see TimeSelectorDial
     * @description 微分模式
     * @param {Object} element 元素
     * @param {Function} startCallback 起始回调函数。传入当前角度
     * @param {Function} moveCallback 过程回调函数。传入当前角度和角度变化
     * @param {Function} endCallback 终止回调函数。传入当前角度
     */
    const BindDragRotate=(function()
    {
    /*成员*/
        /**
         * @name 取得点击事件位置相对于元素中央的位置
         * @type Function
         * @see TimeSelectorDial-BindTouchRotateFunction
         * @param {Object} element 元素
         * @param {Object} mousePosition 鼠标位置，{x:float,y:float}
         * @return {Object} 相对位置，{x:float,y:float}
        */
        const getRelativePosition=function(element,mousePosition)
        {
            let position=element.getBoundingClientRect();

            return {
                x:mousePosition.x-(position.left+position.width/2),
                y:mousePosition.y-(position.top+position.height/2)
            };
        };
        /**
         * @name 计算角度
         * @type Function
         * @see TimeSelectorDial-BindTouchRotateFunction
         * @param {Object} position 位置
         * @return {float} 角度  
        */
        const toAngle=function(position)
        {
            let x=position.x;
            let y=position.y;

            let angle;
            if(x==0 && y==0)
                angle=0;
            else
                angle = Math.atan(y / x);  

            if (x<0)
                angle = Math.PI + angle;
            else if(x >= 0 && y<0)
                angle= Math.PI*2 + angle;

            return angle/(Math.PI*2)*360;
        };

    /*构造*/
        return function(element,startCallback,moveCallback,endCallback)
        {
            let angle=0;
            let lastAngle;
            let handlerTouchStart=function(ev)
            {
                lastAngle=toAngle(getRelativePosition(this,{x:ev.touches[0].clientX,y:ev.touches[0].clientY}));
        
                if(startCallback!=null)
                    startCallback({currentAngle:angle});
            };
            let handlerTouchMove=function(ev)
            { 
                let currentAngle=toAngle(getRelativePosition(this,{x:ev.changedTouches[0].clientX,y:ev.changedTouches[0].clientY}));
                let deltaAngle=currentAngle-lastAngle;
                angle+=deltaAngle;
                lastAngle=currentAngle;
        
                element.style.transform=`rotate(${angle}deg)`;
        
                if(moveCallback!=null)
                    moveCallback({currentAngle,deltaAngle});
            };           
            let handlerTouchEnd=function()
            {
                if(endCallback!=null)
                    endCallback({currentAngle:angle});
            };

            element.addEventListener('touchstart',handlerTouchStart);
            element.addEventListener('touchmove',ThrottleLock(handlerTouchMove,25));
            element.addEventListener('touchend',handlerTouchEnd);
        };
    })();
    /**
     * @name 函数节流锁定
     * @type Function
     * @see TimeSelectorDial
     * @description 使得函数在调用一次后锁定，time时间才能再次被调用
     * @param {Function} method 函数
     * @param {Number} time 锁定时间，单位ms
     * @param {Object} context 运行上下文
     * @return {Function} 节流函数
     */
    const ThrottleLock=function(method,time,context=null)
    {
        let enable=true;

        return function()
        {
            if(enable)
            {
                enable=false;
                setTimeout(()=>
                {
                    enable=true;
                },time);

                if(context===null)
                    return method.apply(this,arguments);
                else
                    return method.apply(context,arguments);
            }
        };
    };
    

/*接口*/
    /**
     * @name 类
     * @type Class
     * @see TimeSelectorDial
     */
    const TimeSelectorDial=class
    {
    /*构造*/
        /**
         * @name 构造方法
         * @type Constructor Function
         * @see TimeSelectorDial-TimeSelectorDial
         */
        constructor()
        {
            this.dom;
            this.date;
            this.dateSpan;
            this.dateType;
            this.hideCallback;

            let dom=document.createElement('div');
            this.dom=dom;
            dom.className='TimeSelectorDial';
            dom.innerHTML=Html;

            this.dateSpans=Array.from(dom.querySelectorAll('.TimeSelectorDial_Date>div>span:last-child'));
            let that=this;
            this.date={
                year_m:null,
                set year(value)
                {
                    value= value < 0 ? 0 : value;
                    this.year_m=value;
                    that.dateSpans[0].innerText=value;
                },
                get year(){return this.year_m;},
                month_m:null,       //0~11
                set month(value)
                {
                    let temp=value%12;
                    value=temp < 0 ? temp+12 : temp;

                    this.month_m=value;
                    that.dateSpans[1].innerText=value+1;

                    this.day=this.day;
                },
                get month(){return this.month_m;},
                day_m:null,     //0~
                set day(value)
                {
                    let date=new Date();
                    date.setFullYear(this.year,this.month+1,0);
                    let monthDays=date.getDate();

                    let temp=value%monthDays;
                    value=temp < 0 ? temp+monthDays : temp;

                    this.day_m=value;
                    that.dateSpans[2].innerText=value+1;
                },
                get day(){return this.day_m;},
                hour_m:null,
                set hour(value)
                {
                    let temp=value%24;
                    value=temp < 0 ? temp+24 : temp;

                    this.hour_m=value;
                    that.dateSpans[3].innerText=value;
                },
                get hour(){return this.hour_m;},
                minute_m:null,
                set minute(value)
                {
                    let temp=value%60;
                    value=temp < 0 ? temp+60 : temp;

                    this.minute_m=value;
                    that.dateSpans[4].innerText=value;
                },
                get minute(){return this.minute_m;},
                second_m:null,
                set second(value)
                {
                    let temp=value%60;
                    value=temp < 0 ? temp+60 : temp;

                    this.second_m=value;
                    that.dateSpans[5].innerText=value;
                },
                get second(){return this.second_m;},
            };
            let dateDiv=Array.from(dom.querySelectorAll('.TimeSelectorDial_Date>div'));     //日期类型选择
            let dateString=['year','month','day','hour','minute','second'];
            for(let i=0;i<dateDiv.length;i++)
            {
                let el=dateDiv[i];
                el.addEventListener('click',()=>
                {
                    for(let el of dateDiv)
                        el.classList.remove('select');
                    el.classList.add('select');
                    this.dateType=dateString[i];
                });
            }

            dom.getElementsByClassName('TimeSelectorDial_Mask')[0].addEventListener('click',()=>
            {
                this.hide(false);
            });

            BindDragRotate(dom.getElementsByClassName('TimeSelectorDial_Dial_Svg')[0],()=>
            {
                this.accumulativeAngle=0;
            },({deltaAngle})=>
            {
                const activatehreshold=60;       //旋转触发阈值
                if(deltaAngle<90 && deltaAngle>-90)     //错误判断
                {
                    this.accumulativeAngle+=deltaAngle;
                    if(this.accumulativeAngle > activatehreshold)
                    {
                        this.date[this.dateType]=this.date[this.dateType]+1;
                        this.accumulativeAngle=0;
                    }
                    else if(this.accumulativeAngle < -activatehreshold)
                    {
                        this.date[this.dateType]=this.date[this.dateType]-1;
                        this.accumulativeAngle=0;
                    }
                }
            });

            dom.getElementsByClassName('TimeSelectorFial_Control_Confirm')[0].addEventListener('click',()=>
            {
                this.hide(true);
            });
            dom.getElementsByClassName('TimeSelectorFial_Control_Cancel')[0].addEventListener('click',()=>
            {
                this.hide(false);
            });
        }

    /*成员*/
        /**
         * @name 隐藏
         * @type Function
         * @see TimeSelectorDial-TimeSelectorDial
         * @param {Boolean} type 类型
         *      true: 确认
         *      false: 取消
         */
        hide(type)
        {
            this.dom.classList.remove('show');
            if(type)
                this.hideCallback && this.hideCallback(Object.assign({},this.date));
            else
                this.hideCallback && this.hideCallback(null);
        }
        /**
         * @name 初始化日期
         * @type Function
         * @see TimeSelectorDial-TimeSelectorDial
         */
        initiateDate()
        {
            let now=new Date();
            this.date.year=now.getFullYear();
            this.date.month=now.getMonth();
            this.date.day=now.getDate()-1;
            this.date.hour=now.getHours();
            this.date.minute=now.getMinutes();
            this.date.second=now.getSeconds();

            this.dateType='year';
        }

    /*接口*/
        /**
         * @name 隐藏
         * @type Function
         * @see TimeSelectorDial-TimeSelectorDial
         * @param {Function} hideCallback 回调函数。void Function({year,month,day,hour,minute,second})
         */
        show(hideCallback=null)
        {
            this.initiateDate();
            this.dom.classList.add('show');
            this.hideCallback=hideCallback;
        }
    };

/*构造*/
    let style=document.createElement('style');
    style.innerHTML=Css;

    window.addEventListener('load',()=>
    {
        document.head.appendChild(style);
    });    

    return TimeSelectorDial;
})();