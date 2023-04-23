//app.js
App({

  onLaunch: async function () {
    wx.cloud.init({
      // env: "其他云开发环境，也可以不填"    // 此处init的环境ID和微信云托管没有作用关系，没用就留空
    });
    const res = await wx.cloud.callContainer({
      config: {
        env: "微信云托管ID", // 微信云托管环境ID，不能为空，替换自己的
      },
      path: '/', 
      method: 'GET',
      header: {
        'X-WX-SERVICE': 'demo',
      }
    });
    console.log(res); // 在控制台里查看打印
  },
  httpClient(url, callback) {
    wx.request({
      url,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        callback(null, res.data)
      }
      , fail: function (error) {
        callback(error)
      }
    })
  },
  
  globalData: {
    httpaddr: "http://192.168.1.108:3001/",
    httpaddrv1: "http://192.168.1.108:3001/",
    httpbcaddr: 'http://192.168.1.108:3001/',
    windowheight:0,
    windowwidth:0,
    //分享者可能是一级发起人，也可能是二级发起人
    //inWeChatId: '0',//分享者身份
    userinfo:{
      weChatId: '',//用户微信id
      inWeChatId: '',//一级发起人id
      salesId:'',  
    },
  },

  refreshLoanInfo: function (that, page = 'loan', address = '../loan/loan') {


    wx.request({
      url: getApp().globalData.httpaddr + 'login/' +
        getApp().globalData.userinfo.weChatId + '/' +
        getApp().globalData.userinfo.inWeChatId + '/' +
        '0/0/0'
      ,
      header: {
        'content-type': 'application/json'
      },
      success: function (res_loginserver) {
        console.log('res_loginserver', res_loginserver);
        wx.navigateTo({
          url: address
        })
        return;
      },
      fail() {
        return
      }
    });
  }
})
