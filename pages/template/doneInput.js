Page({
  data: {
    commonFunction: null,
    myInfo: null,
    clearHidden: false,
    newName: '',
    canSubmit: false,
    focus: true,
    sexs: [
      {
        name: '男',
        value: 1,
        checked: false
      }, {
        name: '女',
        value: 2,
        checked: false
      }
    ]
  },
  onLoad: function () {
    var app = getApp().globalData;
    this.commonFunction = app.commonFunction;
    this.commonFunction.getUserInfo.call(this);
    var sexs = this.data.sexs;
    sexs[this.data.myInfo.wx_gender - 1].checked = true;
    this.setData({
      myInfo: this.data.myInfo,
      API_URL: app.API_URL,
      sexs: sexs
    })
  },
  onShow: function () {
    this.commonFunction.getUserInfo.call(this);
    var sexs = this.data.sexs;
    sexs[this.data.myInfo.wx_gender - 1].checked = true;
    this.setData({
      myInfo: this.data.myInfo,
      sexs: sexs
    })
  },
  //提交修改
  radioChange: function (e) {
    var that = this;
    var newgender = e.detail.value; //获取点击是哪个性别
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
        // success
      }
    })
    if (newgender != that.data.myInfo.wx_gender) {//如果有更改性别则告诉服务器更新数据库，同时更新本地缓存
      wx.setStorageSync('wx_gender', newgender);
      wx.request({
        url: this.data.API_URL + 'changeSex',
        data: {
          wx_gender: newgender,
          user_id: that.data.myInfo.user_id
        },
        method: 'GET',
        success: function (res) {
          console.log('更改用户性别成功')
        }
      })
    }
  }
});