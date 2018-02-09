import  "reset";
import  "app";
import  "ttfund.less";

import  "jquery";
import  "ttfund.js";

import  common          from "common";

import  RouterHelper    from "routerhelper";
const   routerHelper =  new RouterHelper();

import  ShowTrade       from "trade/showtrade";

import  NativeBridge    from 'nativebridge';
const   nativeBridge =  new NativeBridge();

class RouterWorkSpace{
    constructor(){
        const _this = this;

        $("#loadingContent").remove();

        if($.isInApp()){
            nativeBridge.loginStandard(()=>{
                
                _this.loadIndex();
                window.addEventListener('hashchange', function(e) {
                    return _this.loadIndex();
                }, false);

            });
        }
        else {

            _this.loadIndex();
            window.addEventListener('hashchange', function(e) {
                return _this.loadIndex();
            }, false);

        }
    }

    loadIndex(){
        const _this = this;

        common.nativeParam = routerHelper.getViewPageParam();

        const { goPage }  = common.nativeParam;

        $.saveNativeParam(goPage || "indexView");

        common.marketCommonParams = {
            CustomerNo :    $.getUserId(),
            CToken:         $.getCToken(),
            UToken:         $.getUToken(),
            MobileKey:      $.getDeviceId(),
            ServerVersion:  $.getAppVersion(),
            deviceid:       $.getDeviceId(),
            version:        $.getAppVersion(),
            product:        "EFund",
            plat:           "Iphone"
        };

        /* navigator view router */
        switch (goPage) {
            case "indexView":
                return _this.createView(goPage,()=>ShowTrade(true,goPage));            
            default:
                history.replaceState({},document.title,"#goPage=indexView");
                _this.createView("indexView",()=>ShowTrade(true,"indexView"));  
                break;
        }
        
    }

    createView(viewId,callback=()=>false){
        routerHelper.createView(viewId);
        callback();
        routerHelper.movePage();
        return $("#" + viewId).show();
    }

}

new RouterWorkSpace();