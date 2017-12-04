
let app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  scrollTop: 0,
  error:'',
  hidden:true,
  state:false,
  toast1Hidden: true,
  notice_str: '',
  inputValue: '',
  data: {
    array: ['企业官网', '电商网站', '营销型官网', '产品展示型网站','其它功能型网站'],
    canDo:[
      { icon: './../../images/icon/do01.png', message:'您的IT专属服务部'},
      { icon: './../../images/icon/do02.png', message: '利于推广的营销型网站' },
      { icon: './../../images/icon/do03.png', message: '两周实现快速上线' },
      { icon: './../../images/icon/do04.png', message: '专业的网站建设顾问' },
      { icon: './../../images/icon/do05.png', message: '丰富的行业解决方案' }
    ],
    caseArr:[
      { title: '林德艾润', img: '../../images/case01.jpg', src:'http://www.airunchina.com/'},
      { title: '中经方略', img: '../../images/case02.jpg', src:'http://www.zjflsolution.com/'},
      { title: '万古', img: '../../images/case03.jpg', src: 'http://www.vgtech.com.cn'},
      { title: '爱车易行', img: '../../images/case04.jpg', src: 'http://www.easytoease.com/'},
      { title: '京城报业', img: '../../images/case05.jpg', src: 'http://www.jingchengmedia.com/' },
      { title: '审读网', img: '../../images/case06.jpg', src: ''},
      { title: '中飞艾维', img: '../../images/case07.jpg', src: 'http://www.airwing.net.cn/' },
      { title: '复玩', img: '../../images/case08.jpg', src: 'http://www.w-joy.net/' }
    ],
    who:[
      { img: './../../images/icon/who01.png', name:'北京中钦软件技术有限公司',text1:'成立于2002年',text2:'注册资金为1000万'},
      { img: './../../images/icon/who02.png', name: '网站建设行业专家', text1: '专业的技术团队', text2: '丰富的项目经验'},
      { img: './../../images/icon/who03.png', name: '建站人', text1: '自主建站品牌服务商', text2: '(自主品牌)'},
      { img: './../../images/icon/who04.png', name: '车店长', text1: '汽车后市场门店服务商', text2: '（孵化品牌）'}
    ]
  },
  onLoad: function(){
    
  },
  toast1Change: function (e) {
    this.setData({ toast1Hidden: false });
  },
  tit(e){
    this.setData({
      toast1Hidden: false,
      notice_str: ''
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  scroll: function (e) {//滚动事件
  },
  //发布需求
  sendNeed(e) {
    this.setData({
      scrollTop: 1500,
      toast1Hidden: false,
      notice_str: ''
    })
  }, 
  //拨打电话
  contact(){
    wx.makePhoneCall({
      phoneNumber: '010-51630796',
    })
    this.setData({
      toast1Hidden: false,
      notice_str: ''
    })
  },
  //表单提交
  formSubmit(e) {
    let that=this;
    let name=null;
    let tel=null;
    let formData;
    if(e.detail.value!=null){
      name=e.detail.value.name;
      tel=e.detail.value.tel;
      formData=e.detail.value
    }
    if(name==null){
      that.setData({
        error: '网站类型不能为空',
        hidden:false
      })
      let timer1 = setTimeout(function () {
        that.setData({
          hidden: true
        });
      }, 2000)
      return
    }else if(tel.length!=8&&tel.length!=11){
      that.setData({
        error: '请输入正确的联系方式',
        hidden: false,
        inputValue:''
      })
      let timer2 = setTimeout(function () {
        that.setData({
          hidden: true
        });
      }, 2000)
      return
    }else{
      console.log(formData)
      wx.request({
        url:'http://www.zhongqinsoft.com/jianzhanren/wx/xcx?telPhone='+tel+'&TypeName='+name,
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(1)
          if(res==1){
            this.setData({
              toast1Hidden: true,
              notice_str: '提交成功',
              inputValue: ''
            });
            let timer3 = setTimeout(function () {
              that.setData({
                toast1Hidden: false,
                notice_str: ''
              });
            }, 2000)
          }else{
            this.setData({
              toast1Hidden: true,
              notice_str: '提交失败',
              inputValue: ''
            });
            let timer3 = setTimeout(function () {
              that.setData({
                toast1Hidden: false,
                notice_str: ''
              });
            }, 2000)
          }
        },
        error: function (res) {
          console.log(2)
          //请求失败     
        }
      })
    } 
  },
  //模态框
  mask: function () {
    this.setData({
      hidden: true,
      error:''
    });
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  //转发
  onShareAppMessage(){
    let title = '建站人官网';
    return {
      title: title,
      desc:'专业定制开发，您值得首选',
      path: `/pages/index/index`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})