import  "reset";
import  "app";
import  "ttfund.less";

import  "jquery";
import  "ttfund.js";

import  common          from "common";

import  RouterHelper    from "routerhelper";
const   routerHelper =  new RouterHelper();

import  ShowTrade       from "trade/showtrade";

class RouterWorkSpace{
    constructor(){
        const _this = this;

        $("#loadingContent").remove();

        _this.loadIndex();

        window.addEventListener('hashchange', function(e) {
            _this.loadIndex();
        }, false);
    }

    loadIndex(){
        const _this = this;

        common.nativeParam = routerHelper.getViewPageParam();

        const { goPage }  = common.nativeParam;

        routerHelper.saveNativeParam(goPage || "indexView");

        common.marketCommonParams = {
            CustomerNo :    $.getUserId(),
            CToken:         $.getCToken(),
            UToken:         $.getUToken(),
            MobileKey:      $.getDeviceId(),
            ServerVersion:  $.getAppVersion(),
            deviceid:       $.getDeviceId(),
            product:        "EFund",
            plat:           "Iphone"
        };

        /* navigator view router */
        switch (goPage) {
            case "tradeView":
                return _this.createView(goPage,()=>ShowTrade(true,goPage));            
                break;
            default:
                history.replaceState({},document.title,"#goPage=tradeView");
                _this.createView("tradeView",()=>ShowTrade(true,"tradeView"));  
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