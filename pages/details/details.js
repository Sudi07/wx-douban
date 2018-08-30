// pages/details/details.js
var app = getApp();
Page({
  data: {
    information:{}
  },
  onLoad: function (options) {
    wx.showToast({  
      title: '请稍等',
      icon: 'loading',
      duration: 5000
    })
    var url = app.globalData.doubanBase + app.globalData.getData + options.clickId;
    this.getLists(url);
  },
  getLists: function (url) {
    wx.request({
      url,
      method: 'Get',
      header: {'content-type':'json'},
      success: res => {
        console.log(res);
        var _data = res.data;
        this.setData({information: {
          image: _data.images.small,
          name: _data.original_title,
          genre: _data.year +'/' + _data.genres.slice(0).join('/'),
          ak: _data.aka.slice(0).join('/'),
          country: _data.countries.slice(0).join('/'),
          score: _data.rating.average,
          fg: _data.collect_count
          }})  
      },
      fail(err) {
        console.log(err)
      },
      complete() {
        wx.hideToast();
      }
    })
  }
})