import common               from 'common';
import { fail } from 'assert';

class NativeBridge{
    
	constructor(){
        if($("#ttfund-js-bridge").length > 0) return false;

        let _script = document.createElement('iframe');
        _script.setAttribute('id', "ttfund-js-bridge");
        _script.setAttribute('style',"position:absolute;bottom:1000px;");
        return document.getElementsByTagName('body')[0].appendChild(_script);
    }

    loginStandard(callback){
        if(!$.isInApp()) return false;
        
        const _this = this;

        return _this.getNativeLoginParam((resultData)=>{
            if(!resultData["uid"]) return _this.tradeLogin();
            callback();
        });
    }

    setLoginInfo(resultData){

        const { ctoken,utoken,appv,zone,deviceid,uid } = resultData;

        common.nativeParam["ctoken"] =      ctoken;
        common.nativeParam["utoken"] =      utoken;
        common.nativeParam["v"] =           appv;
        common.nativeParam["zone"] =        zone;
        common.nativeParam["deviceid"] =    deviceid;
        common.nativeParam["uid"] =         uid;

        $.saveNativeParam();

        return common.marketCommonParams = {
                    CustomerNo :    $.getUserId(),
                    CToken:         $.getCToken(),
                    UToken:         $.getUToken(),
                    MobileKey:      $.getDeviceId(),
                    ServerVersion:  $.getAppVersion(),
                    deviceid:       $.getDeviceId(),
                    product:        "EFund",
                    plat:           "Iphone"
                };
    }

    getNativeLoginParam(callback){
        if(!$.isInApp()) return false;

        const _this = this;

        return new Promise(function(resolve,reject){

            window.getNativeLoginCallback = (resultData)=>{
                
                if(resultData["uid"]) _this.setLoginInfo(resultData);
                callback(resultData);

            };

            let loginurl = 'emfundapp:nativeLogin({"callbackMethodName": "window.getNativeLoginCallback"})';
            return document.getElementById("ttfund-js-bridge").setAttribute("src",loginurl);
			
		});

    };

    tradeLogin(){
        if(!$.isInApp()) return false;

        return new Promise(function(resolve,reject){

            const loginurl = 'emfundapp:tradeLogin({"callbackMethodName": ""})';
            document.getElementById("ttfund-js-bridge").setAttribute("src",loginurl);
            return setTimeout(()=>resolve("ok"),0);
        
        });
    }

    changeTitle(event){
        if(!$.isInApp()) return false;

        return new Promise(function(resolve,reject){
            
            window.nativeBack = function(resultData){
                let callback = event && event["leftCallback"] || (()=>history.back());
                callback();
            };

            window.nativeShare = function(resultData){
                let callback = event && event["rightCallback"] || (()=>false);
                callback();
		    };

            window.headinfocallback = function(resultData){
                let callback = event && event["shareCallback"] || (()=>false);
                callback();
            };

            const loginurl = 'emfundapp:headerInfo({"backevent": "window.nativeBack()","title": "' + 
            event["titleName"] + '","callbackMethodName": "window.headinfocallback","subtitle":"","name":"' + 
            event["rightText"] + '","event": " window.nativeShare()","vifylogin": ""})';
            
            document.getElementById("ttfund-js-bridge").setAttribute("src",loginurl);
            return setTimeout(()=>resolve("ok"),0);

		});

    }

    configShare(tempTitle,tempContent,tempImgUrl,tempUrl){

        if(!$.isInApp()){
            return $.initWeixinShare({
                        "title":    tempTitle,
                        "content":  tempContent,
                        "url":      location.href,
                        "imgUrl":   tempImgUrl
                    });
        }
        
        return new Promise(function(resolve,reject){
            
            const loginurl =  'emfundapp:wx_shareInfo({"Id":0,"Name":"0","Title":"'+ tempTitle + '","Url":"","HasWx":"true","NeedLogin":false,"WxTitle":"","WxContent":"' + tempContent + '","WxUrl":"' + encodeURIComponent(tempUrl) + '","WxImage":"'+ encodeURIComponent(tempImgUrl) +'","WxBackUrl":"","hideuid":"true"})';
            
            document.getElementById("ttfund-js-bridge").setAttribute("src",loginurl);
            return setTimeout(()=>resolve("ok"),0);

        });
    }

    backToNative(){
        if(!$.isInApp()) return false;

        return new Promise(function(resolve,reject){
            
            const loginurl = 'emfundapp:backpreviouspage({"callbackMethodName": ""})';
            document.getElementById("ttfund-js-bridge").setAttribute("src",loginurl);
            return setTimeout(()=>resolve("ok"),0);

		});
    }

    notityNativeAccountState(accoutId,state){
        if(!$.isInApp()) return false;

        return new Promise(function(resolve,reject){
            
            const loginurl = 'emfundapp:subscribestatechanged({"cfhId": "'+ accoutId +'","state":"' + state + '"})';
            document.getElementById("ttfund-js-bridge").setAttribute("src",loginurl);
            return setTimeout(()=>resolve("ok"),0);

        });
        
    }

    shareApp(){
        if(!$.isInApp()) return false;

        return new Promise(function(resolve,reject){

            const loginurl = 'emfundapp:ttjj-huodong-weixin-share';
            document.getElementById("ttfund-js-bridge").setAttribute("src",loginurl);
            return setTimeout(()=>resolve("ok"),0);

		});
    }


    backToLogin(){
        if(!$.isInApp()) return false;

        return new Promise(function(resolve,reject){
            
            const loginurl = 'emfundapp:backtologin({"callbackMethodName": ""})';
            document.getElementById("ttfund-js-bridge").setAttribute("src",loginurl);
            return setTimeout(()=>resolve("ok"),0);

		});
    }
 
    openNewWindowForNative(event) {
        const newUrl = event["url"];
        if(!newUrl) return false;
        if(!$.isInApp()) return location.href = newUrl;
            
        const openUrl = 'emfundapp:gonewpage({"oldwinrelease":false,"url":"' + newUrl + '"})';
        return document.getElementById("ttfund-js-bridge").setAttribute("src",openUrl);
    }

    openNaiveNewsDetail(code,type=10){
        if(!$.isInApp()) return false;

        const tempLink =  'emfundapp:newsdetail({"newsid":"' + code + '","type":"'+ type +'"})';
        return document.getElementById("ttfund-js-bridge").setAttribute("src",tempLink);
    }

    openCallMenu(){
        if(!$.isInApp()) return false;

        const tempLink =  'emfundapp:callnativephone({"shareInfo":"95021,400-9918-918"})';
        return document.getElementById("ttfund-js-bridge").setAttribute("src",tempLink);
    }

    openFeedback(){
        if(!$.isInApp()) return false;

        const tempLink =  'emfundapp:ttjj-feedback';
        return document.getElementById("ttfund-js-bridge").setAttribute("src",tempLink);
    }

    openFundDetail(fundCode,fundName=""){
        if(!$.isInApp()) return false;

        const tempLink =  "emfundapp:ttjj-funddetail?name=" + fundName + "&id=" + fundCode;
        return document.getElementById("ttfund-js-bridge").setAttribute("src",tempLink);
    }

    goNativeBuyFund(fundName="",fundCode){
        if(!$.isInApp()) return false;

        const tempLink =  "emfundapp:ttjj-normal-buy?name=" + fundName + "&id=" + fundCode;
        return document.getElementById("ttfund-js-bridge").setAttribute("src",tempLink);
    }

    getNativePassportLoginParam(callback){
        if(!$.isInApp()) return false;

        window.nativePassportLoginCallback = (resultData)=>callback(resultData);
        const loginurl = 'emfundapp:nativepassportlogin({"callbackMethodName": "window.nativePassportLoginCallback"})';
        return document.getElementById("ttfund-js-bridge").setAttribute("src",loginurl);
    }
        
    passportLogin(){
        if(!$.isInApp()) return false;

        const loginurl = 'emfundapp:passportlogin({"callbackMethodName":""})';
        return document.getElementById("ttfund-js-bridge").setAttribute("src",loginurl);
    }

    /* 忘记密码短链 */
    forgetPassword(){
        if(!$.isInApp()) return false;

        const loginurl = 'emfundapp:findfundpwd({"callbackMethodName":""})';
        return document.getElementById("ttfund-js-bridge").setAttribute("src",loginurl);
    }

    bankSelect(event){
        if(!$.isInApp()) return false;

        const isAppointment = event && event['isAppointment'];
        const laterFun = event &&  event["laterFun"];
        const minBusinLimit = isAppointment ? 0 : (event && event["minBusinLimit"]);
        const currentCardNo = event && event["currentCardNo"];
        const isHqb = event && event["isHqb"];
        const currentInputValue = isAppointment ? 0 : (event && event['currentInputValue']);

        const url = 'emfundapp:h5selectpayway({"callbackMethodName":"window.bankinforesult","currentCardNo":"'+currentCardNo+'","isHqb":'+isHqb+',"minPayLimit":'+minBusinLimit+',"currentInputValue":'+currentInputValue+',"isAppointment":'+isAppointment+'})';
        
        window.bankinforesult = (resultData)=> laterFun && laterFun(resultData);
        return document.getElementById("ttfund-js-bridge").setAttribute("src",url);
    }

    openNewPage(newUrl){
        if(!$.isInApp()) location.href = newUrl;

        const tempLink = 'emfundapp:gonewpage({"oldwinrelease":false,"noparam":true,"url":"' + encodeURIComponent(newUrl) + '"})';
        return document.getElementById("ttfund-js-bridge").setAttribute("src",tempLink);        
    }

    // 定投
    openInvest(tempFundName,tempFundCode,tempPeriodType="每日(工作日)",tempPeriod="每日(工作日)"){
        if(!$.isInApp()) return false;

		const tempLink = 'emfundapp:ttjj-scheduled-oper?periodtype='+ tempPeriodType +'&period='+ tempPeriod +'&name='+ tempFundName +'&id='+ tempFundCode;
        return document.getElementById("ttfund-js-bridge").src = tempLink;
    }

}


export default NativeBridge;