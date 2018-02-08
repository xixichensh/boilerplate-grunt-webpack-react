import common 					from 'common';
import fetchJsonp 		        from 'fetch-jsonp';

class RequestModel{

    constructor(){}

    sendJsonpRequest(params,serverUrl){
		const _this = this;

		const tempParams = $.mergeJsonObject(params,common.marketCommonParams);

		return new Promise(function(resolve,reject){

			fetchJsonp(serverUrl + _this.objectToStr(tempParams) ,{
				timeout: 15000,
				jsonpCallback: 'callback'
			})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch((ex) => reject(ex));

		});
	}

    sendPostRequest(params,serverUrl){
		const _this = this;
		const tempParams = $.mergeJsonObject(params,common.marketCommonParams);

		return new Promise(function(resolve,reject){

			fetch(serverUrl,{
				method: 'POST',
				body: _this.objToFormData(tempParams)
			})
			.then(response =>response.json())
			.then(json => resolve(json))
			.catch(ex=>reject(ex))

		});
	}

	sendGetRequest(params,serverUrl){
		const _this = this;
		const tempParams = $.mergeJsonObject(params,common.marketCommonParams);

		return new Promise(function(resolve,reject){
			fetch(serverUrl + _this.objectToStr(tempParams))
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(ex => reject(ex))
		});
	}


	objToFormData(obj){
		const form = new FormData()
		for(let key in obj) form.append(key, obj[key])
		return form;
	}

	objectToStr(obj){
		let form = "?";
		for(let key in obj) form = form + (key + "=" + obj[key] + "&");
		return form.substr(0,form.length - 1);
	}
}

export default RequestModel;