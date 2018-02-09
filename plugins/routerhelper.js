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

    /* operate move anaimate */
    movePage (event) {
        const callback = event && event["callback"] || (()=>false);
        const goPage = event && event["goPage"] || common.nativeParam["goPage"] || "";

        const currentView = $("div[data-pid]:visible");

        if(!goPage || currentView.length == 0) return false;
        
        const targetView = $("#" + goPage);

        $.movePageTo(currentView, targetView, 'none', ()=>callback());
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