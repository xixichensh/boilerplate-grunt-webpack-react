class Common {
    
    constructor(){}
    
    /*url parameters*/
    static nativeParam = {}

     /* client cache server*/
    static cacheKeys = {
        
        uidKey:         "EastMoney-TTFund-FundEmbedH5-Global-Uid",

        lastPageKey:    "EastMoney-TTFund-FundEmbedH5-Global-LastPage",

        zoneKey:        "EastMoney-TTFund-FundEmbedH5-Global-Zone",

        versionKey:     "EastMoney-TTFund-FundEmbedH5-Global-Version",

        deviceIdKey:    "EastMoney-TTFund-FundEmbedH5-Global-DeviceId",

        cTokenKey:      "EastMoney-TTFund-FundEmbedH5-Global-CToken",

        uTokenKey:      "EastMoney-TTFund-FundEmbedH5-Global-UToken",

        pageKey:        "EastMoney-TTFund-FundEmbedH5-Global-Page"

    }
        
        /* server api list */
    static serverList = {

        "tradeServer":              "https://tradeapineice6.1234567.com.cn",
        "highLevelServer":          "https://tradeapineice6.1234567.com.cn",
        
        "debugServer":              "https://tradeapineice6.1234567.com.cn",

        "marketServer":             "https://fundmobapitest.eastmoney.com",
        "commonJsUrl":              "https://appunit.1234567.com.cn",
        "cdnJsUrl":                 "https://img.1234567.com.cn",
        "gaoduanUrl":               "https://gaoduanmob.1234567.com.cn",
       
        "release": {
            "marketServer":         "https://fundmobapi.eastmoney.com",
            "commonJsUrl":          "https://appunit.1234567.com.cn",
            "gaoduanUrl":           "https://gaoduanmob.1234567.com.cn"
        },

        "dev": {
            "marketServer":         "https://fundmobapitest.eastmoney.com",
            "commonJsUrl":          "https://appunittest.1234567.com.cn",
            "gaoduanUrl":           "http://gaoduanmobtest.1234567.com.cn"
        },

        "debug": {
            "marketServer":         "https://fundmobapitest.eastmoney.com",
            "commonJsUrl":          "https://gaoduanmobtest.1234567.com.cn",
            "gaoduanUrl":           "https://gaoduanmobtest2.1234567.com.cn"
        }

    }
    

    //dev、debug、release
    static environment = "debug"

    static helpTxt={
        "commonTip":"网络不给力（N001）",
        "rejectTip":"系统错误，请稍后重试（N002）"
    }


    static marketCommonParams = {
        "deviceid":	"1234567890",
		"version":	"9.9.9",
		"product":	"EFund",
		"plat":		"Iphone"
    }
}

export default Common;