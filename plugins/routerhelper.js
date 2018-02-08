import common from "common";

class RouterHelper {

    constructor(){}

    getViewPageParam() {
        let parameters = {};
		
		[location.hash,location.search].map((c)=>{
			let str = c.replace(/^[\#|\?]/i,"");
			
			str.split(/[&|?]/i).map((c)=>{
				let unit = c.split("=");
				if(unit[0] && unit[1]) parameters[unit[0]] = unit[1];
			});
		});

        return parameters;
    }

    saveNativeParam(defaultPageName){
        
        const { uid:tempUid,v:tempVersion,lastPage:tempLastPage,zone:tempZone,
            ctoken:tempCToken,utoken:tempUToken,deviceid:tempdDeviceId,goPage } = common.nativeParam;

        const { lastPageKey,versionKey,uidKey,cTokenKey,uTokenKey,deviceIdKey,zoneKey,pageKey } = common.cacheKeys;

        if(tempLastPage) sessionStorage.setItem(lastPageKey,tempLastPage);

        if(tempVersion) sessionStorage.setItem(versionKey,tempVersion);
        
        if(tempUid) sessionStorage.setItem(uidKey,tempUid);
        
        if(tempCToken) sessionStorage.setItem(cTokenKey,tempCToken);

        if(tempUToken) sessionStorage.setItem(uTokenKey,tempUToken);

        if(tempdDeviceId) sessionStorage.setItem(deviceIdKey,tempdDeviceId);

        if(tempZone) this.setServerUrl(tempZone);

        sessionStorage.setItem(pageKey + "-" + (goPage || defaultPageName || "" ),JSON.stringify(common.nativeParam));

        return false;
    }

    /*set server url*/
    setServerUrl(tempZone) {
        
        common.serverList["tradeServer"] =              $.setTradeServer(tempZone);
        common.serverList["highLevelServer"] =          $.setHighLevelServer(tempZone);
        
        common.serverList["marketServer"] =             common.serverList[common.environment]["marketServer"];
        common.serverList["commonJsUrl"] =              common.serverList[common.environment]["commonJsUrl"];
        
        sessionStorage.setItem(common["cacheKeys"].zoneKey,tempZone);
        
        return false;
    }

    /* operate move anaimate */
    movePage (event) {
        const callback = event && event["callback"] || (()=>false);
        const goPage = event && event["goPage"] || common.nativeParam["goPage"] || "";

        const currentView = $("div[data-pid]:visible");

        if(!goPage || currentView.length == 0) return false;
        
        const targetView = $("#" + goPage);

        $.movePageTo(currentView, targetView, 'move', ()=>callback());
    }

    static currentIndex = 99;

    createView(viewId){
        
        if($("#" + viewId).length > 0) return false;

        const tempIndex = RouterHelper.currentIndex ++;
        const container = document.createElement('div');
        container.setAttribute("id", viewId);
        container.setAttribute("data-pid", "root/" + tempIndex);
        document.body.appendChild(container);
    }

}

export default RouterHelper;