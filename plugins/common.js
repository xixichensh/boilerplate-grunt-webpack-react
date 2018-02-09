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
        "productServer":            "https://unitmobapi.1234567.com.cn/gold",
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
    static environment = "dev"

    static helpTxt={
        "commonTip":"网络不给力（N001）",
        "rejectTip":"系统错误，请稍后重试（N002）",
        
        cannotOpen:'协议格式无法打开，请去网站查看',
        bankSelect:'请选择支付方式',
        payMethodSelect:'请选择到期安排',
        amountLength:'输入金额不正确，请输入两位小数以内且大于0的数字',
        volLength:'输入份额不正确，请输入两位小数以内且大于0的数字',
        witAccValPriceTips:'输入金额必须为整数或小数，小数点后不超过2位',
        witVolPriceTips:'输入份额必须为整数或小数，小数点后不超过2位',
        goodInvest:'请同意并勾选《我是合格投资者协议》',
        relativeProtocol:'请同意并勾选《相关协议与说明》',
        minVolAsk:'输入金额小于最低要求',
        maxAvaVolAsk : '输入金额大于可用额度',
        minSellVolAsk:'输入份额小于最低要求',
        maxSellAvaVolAsk : '输入份额大于可用额度',
        appendAmountRegular :'必须是追加最低购买金额的整数倍',
        pwdEmpty:'基金交易密码不能为空',
        pwdLength:'基金交易密码应为8-20个字符',
        noSellAccountNo:'没有赎回银行卡信息',
        totalVolTips:"没有最大可售份额参数",

        cashbagSelectTips:"为提升用户体验，卖基金回活期宝时，默认充值智能优选基金，您也可以选择其他活期宝关联基金。"
    }


    static marketCommonParams = {
        "deviceid":	"1234567890",
		"version":	"9.9.9",
		"product":	"EFund",
		"plat":		"Iphone"
    }
}

export default Common;