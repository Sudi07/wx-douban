var app = getApp();
Page({
  data: {
    movieLists: [] //存储当前页面的数据
  },
  bindToHome(){
    wx.navigateBack({
      url:'../home/home'
    })  
  },
  getSearchData(e) {
    // console.log(e.detail.value);
    var value = e.detail.value;
    var url = app.globalData.doubanBase + app.globalData.searchUrl + value;
    // var url = 'http://localhost/v2/movie/search?q='+ value;
    wx.request({
      url,
      method: 'GET',
      header: {"content-type":"json"},
      success: res => this.arrangeData(res.data.subjects),
      fail: err => console.log(err)
    })
  },
  arrangeData(lists) {
    var movieLists = [];
    lists.forEach(item => {
      var allDirs = item.directors.map(i => i.name).join('/')  //和foreach的区别是返回的为数组
      var desc = item.rating.average + '分/' + item.year +'/' + allDirs
      movieLists.push({
        image: item.images.small,
        title: item.title,
        desc
      })
    })
    // console.log(MovieLists)
    this.setData({movieLists});
  }
})