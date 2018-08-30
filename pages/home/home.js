var app = getApp();
Page({ //通过Page方法注册页面实例
  data:{
    inTheaters: [],
    comingsoon:[]
  },
  onLoad (option) {
    wx.showToast({
      title: '请稍等',
      icon: 'loading',
      duration: 5000
    })
    var url = app.globalData.doubanBase + app.globalData.inTheater + '?start=0&count=10';
    var _url = app.globalData.doubanBase + app.globalData.comingSoon + '?start=0&count=10';
    // var Url = app.globalData.doubanBase + app.globalData.getData + clickId;
    // console.log(clickId)
    this.getMovieLists(url);
    this._getMovieLists(_url);
    // this.getLists(url);
  },
  bindToSearch: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  getMovieLists(url,msg) {
    wx.request({
        url,
        method: 'GET',
        header: { 'content-type': 'json' }, //没有json不会被正常解析，为小程序的bug  applycation-json
        success: res => {
          this.setData({inTheaters: res.data.subjects}) //把拿来的数据绑定到当前页面
        },
        fail (err) {
          console.log(err)
        },
        complete() {
          wx.hideToast();
        }
    })
  },
  _getMovieLists(url) {
    wx.request({
      url,
      method: 'GET',
      header: { 'content-type': 'json' }, //没有json不会被正常解析，为小程序的bug  applycation-json
      success: res => {
        this.setData({ comingsoon: res.data.subjects }) //把拿来的数据绑定到当前页面
      },
      fail(err) {
        console.log(err)
      },
      complete() {
        wx.hideToast();
      }
    })
  },
  bindToMore (e) {
    wx.navigateTo({
      url: '../more/more?typeId=' + e.target.dataset.typeId,
    })
  },
 bindToClick (e) {
   wx.navigateTo({
     url: '../details/details?clickId=' + e.target.dataset.clickId,
   })
 }
})