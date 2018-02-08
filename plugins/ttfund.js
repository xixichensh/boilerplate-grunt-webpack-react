import common from "common";

define(function(require, exports, module) {

    (function($) {

        //将Date型format成("yyyy年MM月dd日hh小时mm分ss秒");
        Date.prototype.format = (format)=>{
            /*
             * eg:format="YYYY-MM-dd hh:mm:ss";
             使用方法:
             var testDate = new Date();
             var testStr = testDate.format("yyyy年MM月dd日hh小时mm分ss秒");
             alert(testStr);
             */
            let o = {
                "M+": this.getMonth() + 1, //month
                "d+": this.getDate(), //day
                "h+": this.getHours(), //hour
                "m+": this.getMinutes(), //minute
                "s+": this.getSeconds(), //second
                "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                "S": this.getMilliseconds() //millisecond
            }

            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }


        //timeoutFun 空函数用来填充某些逻辑
        let timeoutFun = ()=>false;

        // 侦听整个页面input的focus和blur事件，使其在转场的时候失去焦点
        let inputFocus = {
            init: ()=>$("input").on("focus blur", this.inputEvents),

            inputEvents: (e)=>{
                inputFocus.isFocus = e.type === "focus" ? true : false;
                inputFocus.elem = e.type === "focus" ? this : null;
            },

            isFocus: false,
            element: null
        };

        //转场动画变量
        let pageToVars = {
            current: null,
            target: null,
            type: null,
            callback: null,
            hover: null,
            pageRelative: 1,
            back: null,
            isCurrentPageFinish: false,
            isTargetPageFinish: false,
            timeout: 0,
            runTime: 0.4,
            ease: "ease-out",
            // 根据pid属性判断两个页面的关系
            // 1表示目标页为后页, -1表示目标页为前页, 0表示两页不在同一层级

            catchId(current,target){

                if (!current || !target) return 1; 
                
                let  _current = current.split('/'), _target = target.split('/');
                
                if (_current.length != _target.length)
                    return current.indexOf(target) != -1 ? -1 : (target.indexOf(current) != -1 ? 1 : 0);
                else
                    return _current.length > 2 && _current.slice(0, _current.length - 1) != _target.slice(0, _target.length - 1) && _target[_target.length - 1] - _current[_current.length - 1] == 0 ? 0 :(_target[_target.length - 1] - _current[_current.length - 1] > 0 ? 1 : -1);

            },

            start(){
                let _this = this;
                // 如果正在转场，不执行动画
                if ($.isPageMoving) return false;
                $.isPageMoving = true;

                // 如果转场动画为none或者设备为android2.x|3.x
                if (_this.type == "none") {
                    this.end();
                    return false;
                }

                // 如果有高亮，添加
                if (_this.hover) {
                    clearTimeout(_this.hover.attr("hoverTimeout"));
                    _this.hover.removeAttr("hoverTimeout");
                    _this.hover.attr("hover", "on");
                }

                // 如果没有设置过back参数，判断两页面的关系
                _this.pageRelative = _this.back === undefined ? _this.catchId(_this.current.data("pid"), _this.target.data("pid")) : _this.back ? -1 : 1;

                // 初始化动画完成的布尔
                _this.isCurrentPageFinish = false;
                _this.isTargetPageFinish = false;

                // 开始做转场动画
                _this.current.css({ "display": "block","z-index": "1","opacity": "1" }).on("webkitAnimationEnd", pageToVars.onAnimateEnd);
                _this.target.css({ "display": "block","z-index": "2","opacity": "1"}).on("webkitAnimationEnd", pageToVars.onAnimateEnd);

                 //开始定义动画
                 var moveAnimateFrame = $("#_moveAnimateFrame_");
                 if (moveAnimateFrame != null) moveAnimateFrame.remove();

                 let _styleCss = "<style id='_moveAnimateFrame_'>";

                switch (pageToVars.type) {
                    case "move":
                        pageToVars.runTime = 0.3;
                        pageToVars.ease = "ease-out";
                        if (pageToVars.pageRelative != -1) {
                            _styleCss += "@-webkit-keyframes pageAnimateRunCurrent { from {-webkit-transform: translate3d(0px, 0px, 0px);} to {-webkit-transform: translate3d(-100%, 0px, 0px);} }";
                            _styleCss += "@-webkit-keyframes pageAnimateRunTarget { from {-webkit-transform: translate3d(100%, 0px, 0px);} to {-webkit-transform: translate3d(0px, 0px, 0px);} }";
                        } else {
                            _styleCss += "@-webkit-keyframes pageAnimateRunCurrent { from {-webkit-transform: translate3d(0px, 0px, 0px);} to {-webkit-transform: translate3d(100%, 0px, 0px);} }";
                            _styleCss += "@-webkit-keyframes pageAnimateRunTarget { from {-webkit-transform: translate3d(-100%, 0px, 0px);} to {-webkit-transform: translate3d(0px, 0px, 0px);} }";
                        }
                        break;
                    case "fade":
                        pageToVars.runTime = 0.3;
                        pageToVars.ease = "ease-out";
                        _styleCss += "@-webkit-keyframes pageAnimateRunCurrent { from {opacity: 1;} to {opacity: 0;} }";
                        _styleCss += "@-webkit-keyframes pageAnimateRunTarget { from {opacity: 0;} to {opacity: 1;} }";
                        break;
                }


                _styleCss += "</style>";

                $("head").append(_styleCss);

                // 添加animation样式，动画形式为scale或poker时，target暂时不添加，并隐藏
                let vendor = $.getBrowserVendor();

                switch (_this.type) {
                    default: 
                        _this.current.css("-" + vendor + "-animation", "pageAnimateRunCurrent " + pageToVars.runTime + "s " + pageToVars.ease);
                        _this.target.css("-" + vendor + "-animation", "pageAnimateRunTarget " + pageToVars.runTime + "s " + pageToVars.ease);
                    break;
                }

                // 动画安全锁，2秒后动画未结束，自动结束
                clearTimeout(_this.timeout);

                let animateTime = 2000;;

                _this.timeout = setTimeout(()=>{
                    if ($.pageToing) return false;

                    pageToVars.current.off("webkitAnimationEnd", pageToVars.onAnimateEnd);
                    pageToVars.target.off("webkitAnimationEnd", pageToVars.onAnimateEnd);
                    pageToVars.end();

                },animateTime)
            },

            onAnimateEnd(e){
                if(e.type != "webkitAnimationEnd") return pageToVars.end();

                // 如果事件对象是current，说明current的动画已经完成
                // current隐藏，删除侦听，并删除动画时添加的样式
                // 如果转场动画为scale或poker，执行下半部分动画
                if (e.target == pageToVars.current[0]) {
                    pageToVars.isCurrentPageFinish = true;
                    pageToVars.current.hide();
                    pageToVars.current.off("webkitAnimationEnd", pageToVars.onAnimateEnd);
                    if (pageToVars.isTargetPageFinish) {
                        pageToVars.end();
                    }
                } else if (e.target == pageToVars.target[0]) {
                    pageToVars.isTargetPageFinish = true;
                    pageToVars.target.off("webkitAnimationEnd", pageToVars.onAnimateEnd);
                    if (pageToVars.isTargetPageFinish) {
                        pageToVars.end();
                    }
                }

            },

            end(){
                if ($.isPageMoving) $.isPageMoving = false;
                
                // 如果有高亮，去除
                if (this.hover) this.hover.removeAttr("hover");

                let vendor = $.getBrowserVendor();

                // 去除动画样式
                pageToVars.current.removeCss("-" + vendor + "-animation");
                pageToVars.target.removeCss("-" + vendor + "-animation");

                // 转出去的页隐藏，转进来的页显示
                this.current.hide();
                this.target.show();

                // 如果有回调函数，回调
                if (this.callback) this.callback();

            }

        };

        $.extend($, {

            /*get device system type name*/
            getDeviceType(){
                return $.os.android ? "android" : ($.os.ios ? "ios" : "windows")
            },

            isInWeChat(){
                return navigator.userAgent.indexOf('MicroMessenger') > -1; 
            },

            loadJS(url,callback){
                let head = document.getElementsByTagName("head")[0];
                let script = document.createElement("script");
                script.src = url;
                let done = false;
                script.onload = script.onreadystatechange = function() {
                    if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                        done = true;
                        callback();
                        script.onload = script.onreadystatechange = null;
                        head.removeChild(script);
                    }
                };
                head.appendChild(script)
            },

            getFundColor(field){
                return field < 0 ? " ttjj_green" : field == 0 ? " ttjj_black" : " ttjj_red"; 
            },


            setTradeServer(tempZone){
                switch(common.environment){
                    case "debug":
                        return tempZone > 1 ? ("https://tradeapi" + tempZone + ".1234567.com.cn") : "https://tradeapi.1234567.com.cn";
                        break;
                    case "dev":
                        return tempZone > 1 ? ("https://tradeapineice" + tempZone + ".1234567.com.cn") : "http://61.129.84.232:8000";
                        break;
                    default:
                        return tempZone > 1 ? ("https://tradeapilvs" + tempZone + ".1234567.com.cn") : "https://tradeapilvs.1234567.com.cn";
                        break;
                }
            },

            setHighLevelServer(tempZone){
                switch(common.environment){
                    case "debug":
                        return tempZone > 1 ? ("https://tradeapi" + tempZone + ".1234567.com.cn") : "https://tradeapi.1234567.com.cn";
                        break;
                    case "dev":
                        return tempZone > 1 ? ("https://tradeapineice" + tempZone + ".1234567.com.cn") : "http://61.129.84.232:8000";
                        break;
                    default:
                        return tempZone > 1 ? ("https://gaoduanmobapi" + tempZone + ".1234567.com.cn") : "https://gaoduanmobapi.1234567.com.cn";
                        break;
                }
            },

            resolveRejectError(error){
                //let callback = ()=>false;
                
                //let tempErrorMsg = error && error["ErrorMessage"] || error["CodeMessage"] || error["ErrMsg"] ||  common.helpTxt["rejectTip"];
                
                /* if(error["ErrorCode"] == "103"){
                    nativeBridge.backToLogin();
                    return false;
                } */

                //requestModel.recordError(tempData["requestUrl"],tempData["requestParams"],tempData["responseData"]);
                
                //ShowAlert(true,tempErrorMsg,callback);
                
                //return error["ErrorCode"] == "103" ? nativeBridge.backToLogin() : ShowAlert(true,tempErrorMsg + tempLink,callback);
            },
            
            fmoney(s, n) {
                if(s == 0) return n == 4 ? "0.0000" : "0.00"
    
                if(isNaN(parseInt(s)) || s == "") return s;
                
                let unit = /%/.test(s) ? "%" : "";
    
                s = parseFloat(s);
    
                let assignMentflag = s < 0 ? true : false;

                if (s<0)  s=-1*s;

                n = n > 0 && n <= 20 ? n : 2;
    
                s = assignMentflag ? (Math.ceil(Number(s) * Math.pow(10,n) - 0.0001) / Math.pow(10,n)).toFixed(n): (Math.floor(Number(s) * Math.pow(10,n) + 0.0001) / Math.pow(10,n)).toFixed(n);    
        
                let l = s.split(".")[0].split("").reverse(),r = s.split(".")[1];
                let t = "";

                for (let i = 0; i < l.length; i++) {
                    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                }
    
                return assignMentflag ? ('-' + t.split("").reverse().join("") + "." + r + unit) : (t.split("").reverse().join("") + "." + r + unit);
            },            

            /* 四舍五入获取小数位 */
            getFormatMoney(d,n=2) {                
                return parseFloat(d).toFixed(n);
            },

            /* 大额截取，无需四舍五入以及科学计数法 */
            getFormatPrice(d,n=2){
                return d < 0 ? (Math.ceil(Number(d) * Math.pow(10,n) - 0.0001) / Math.pow(10,n)).toFixed(n) : (Math.floor(Number(d) * Math.pow(10,n) + 0.0001) / Math.pow(10,n)).toFixed(n);
            },

            isEmpty(value, allowEmptyString){
                return (value === null) || 
                (value === undefined) || 
                (!allowEmptyString ? value === '' : false) || 
                (this.isArray(value) && value.length === 0) || 
                (value == "null") || 
                (value == "--");
            },

            simplePageLink(target,current,parameters = ""){
                const tempLastPage = current.attr("id");
                const targetId = target.attr("id");
                target.data("lastpage",tempLastPage);
                location.href = location.origin + location.pathname + "#goPage=" + targetId + "&lastPage=" + tempLastPage + parameters;
                return false;
            },

            isInApp(){
                return (navigator.userAgent.toLowerCase()).indexOf("ttjj") > 0;
            },

            mergeJsonObject(jsonbject1, jsonbject2){
                let resultJsonObject={};
                
                for(let attr in jsonbject1){
                    resultJsonObject[attr] = jsonbject1[attr];
                }

                for(let attr in jsonbject2){
                    resultJsonObject[attr] = jsonbject2[attr];
                }
                
                return resultJsonObject;
            },

            getUserId(){
                return  sessionStorage.getItem(common.cacheKeys["uidKey"]) || common.nativeParam["uid"];
            },

            getCToken(){
                return  sessionStorage.getItem(common.cacheKeys["cTokenKey"]) || common.nativeParam["ctoken"];
            },

            getUToken(){
                return  sessionStorage.getItem(common.cacheKeys["uTokenKey"]) || common.nativeParam["utoken"];
            },

            getDeviceId(){
                return sessionStorage.getItem(common.cacheKeys["deviceIdKey"]) || common.nativeParam["deviceid"];
            },

            getLastPage(){
                return sessionStorage.getItem(common.cacheKeys["lastPageKey"]) || common.nativeParam["lastPage"];
            },

            getZone(){
                return sessionStorage.getItem(common.cacheKeys["zoneKey"]) || common.nativeParam["zone"];
            },

            /*get app version*/
            getAppVersion(){
                /*get version from sesstionStorage and cache*/
                return sessionStorage.getItem(common.cacheKeys["versionKey"]) || common.nativeParam["version"];
            },

            splitDateTime(dateStr){
                var arr = dateStr.split(/[- :]/);
                return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
            },

            /*change page to another*/
            movePageTo(start, end, animate, callback, hoverBtn, isBack) {
                return start.pageTo({ target:end,type:animate,hover:hoverBtn,back:isBack,callback:callback });
            },

            height(){
                return (window.webviewHeight && window.webviewHeight / window.devicePixelRatio) || (document.documentElement.offsetHeight);
            },

            width(){
                return (window.webviewWidth && window.webviewWidth / window.devicePixelRatio) || (document.documentElement.offsetWidth);
            },

            /* 按照设计iphone 6的设计规格 */
            relativeHeight(tempHeight){
                return this.width() / 375 * this.height() * tempHeight / 667;
            },

            getBrowserVendor(){
                return (/webkit/i).test(navigator.appVersion) ? 'webkit' :
                    (/firefox/i).test(navigator.userAgent) ? 'Moz' :
                    (/trident/i).test(navigator.userAgent) ? 'ms' :
                    'opera' in window ? 'O' : '';
            },

            cookie: (key, value, options)=> {

                let days, time, result, decode;

                if (arguments.length > 1 && String(value) !== "[object Object]") {

                    options = $.extend({}, options);

                    if (value === null || value === undefined) options.expires = -1;

                    if (typeof options.expires === 'number') {
                        days = (options.expires * 24 * 60 * 60 * 1000);
                        time = options.expires = new Date();

                        time.setTime(time.getTime() + days)
                    }

                    value = String(value);

                    return (document.cookie = [
                        encodeURIComponent(key), '=',
                        options.raw ? value : encodeURIComponent(value),
                        options.expires ? '; expires=' + options.expires.toUTCString() : '',
                        options.path ? '; path=' + options.path : '',
                        options.domain ? '; domain=' + options.domain : '',
                        options.secure ? '; secure' : ''
                    ].join(''))
                }

                options = value || {};

                decode = options.raw ? (s)=>{
                    return s
                } : decodeURIComponent;

                return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
            }

        });

        $.extend($.fn, {

            pageTo(event){
                // 如果在转场时有input的获焦状态，则取消
                if (inputFocus.isFocus) {
                    $(inputFocus.element).blur();
                    inputFocus.isFocus = false;
                    inputFocus.element = null;
                }

                if(event && event.target){
                    pageToVars.current = this;
                    pageToVars.target = event.target;
                    pageToVars.type = event.type;
                    pageToVars.callback = event.callback;
                    pageToVars.hover = event.hover;
                    pageToVars.back = event.back;
                    pageToVars.start();
                }
            },

            removeCss(cssKey){
                if (cssKey) {
                    this.css(cssKey, "");
                    if (this.css(cssKey) == null) this.removeAttr("style");
                } 
                else
                    this.removeAttr("style");
                
                return this;
            }


        });

    })($);

});