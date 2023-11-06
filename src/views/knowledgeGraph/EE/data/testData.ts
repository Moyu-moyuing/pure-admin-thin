const testData = [
  {
    text: "雀巢裁员4000人：时代抛弃你时，连招呼都不会打！",
    events: {
      event_type: "组织关系-裁员",
      trigger: {
        keywords: "裁员",
        position: "2:4"
      },
      arguments: [
        {
          entity: "雀巢",
          position: "0:2",
          role: "裁员方"
        },
        {
          entity: "4000人",
          position: "4:9",
          role: "裁员人数"
        }
      ]
    },
    sent_id: "409389c96efe78d6af1c86e0450fd2d7"
  },
  {
    text: "美国“未来为”子公司大幅度裁员，这是为什么呢？任正非正式回应",
    events: {
      event_type: "组织关系-裁员",
      trigger: {
        keywords: "裁员",
        position: "13:15"
      },
      arguments: [
        {
          entity: "美国“未来为”子公司",
          position: "0:10",
          role: "裁员方"
        }
      ]
    },
    sent_id: "5aec2b5b759c5f8f42f9c0156eb3c924"
  },
  {
    text: "印度孟买降雨引发墙体垮塌致16人死亡（16）",
    events: {
      event_type: "灾害/意外-坍/垮塌",
      trigger: {
        keywords: "垮塌",
        position: "10:12"
      },
      arguments: [
        {
          entity: "墙体",
          position: "8:10",
          role: "坍塌主体"
        },
        {
          entity: "16人死亡",
          position: "13:18",
          role: "死亡人数"
        }
      ]
    },
    sent_id: "99b6c3f9106702a955c06fb240c94380"
  },
  {
    text: "就在刚刚，江苏无锡312国道上海方向锡港路上跨桥路段出现桥面垮塌，现场有多辆轿车被完全压扁，并有多辆车掉落桥下，具体伤亡情况不详！",
    events: {
      event_type: "灾害/意外-坍/垮塌",
      trigger: {
        keywords: "垮塌",
        position: "30:32"
      },
      arguments: [
        {
          entity: "刚刚",
          position: "2:4",
          role: "时间"
        },
        {
          entity: "江苏无锡312国道上海方向锡港路上跨桥路段",
          position: "5:26",
          role: "坍塌主体"
        }
      ]
    },
    sent_id: "27ef4d6dc33606def0ab002d39be6317"
  },
  {
    text: "女明星大闹车站被解约，参拍的两部网剧还没来得及上映，可惜了！",
    events: {
      event_type: "组织关系-解约",
      trigger: {
        keywords: "解约",
        position: "8:10"
      },
      arguments: [
        {
          entity: "女明星",
          position: "0:3",
          role: "被解约方"
        }
      ]
    },
    sent_id: "b35cd88212af4ad103a4381a50e5543e"
  },
  {
    text: "继杨幂解约范思哲之后，关晓彤已停止双方合作，不愧是国民闺女",
    events: {
      event_type: "组织关系-解约",
      trigger: {
        keywords: "解约",
        position: "3:5"
      },
      arguments: [
        {
          entity: "范思哲",
          position: "5:8",
          role: "被解约方"
        },
        {
          entity: "杨幂",
          position: "1:3",
          role: "解约方"
        }
      ]
    },
    sent_id: "c8545be4b7e99de9bc1300e7d565af78"
  },
  {
    text: "蔚来因车辆自燃召回4803辆ES8，特斯拉会紧随其后吗？",
    events: {
      event_type: "产品行为-召回",
      trigger: {
        keywords: "召回",
        position: "7:9"
      },
      arguments: [
        {
          entity: "蔚来",
          position: "0:2",
          role: "召回方"
        },
        {
          entity: "4803辆ES8",
          position: "9:17",
          role: "召回内容"
        }
      ]
    },
    sent_id: "955099de4a3ec461cd4b11efcbd132c7"
  },
  {
    text: "据新华社报道，针对智能电视强行植入开机广告的问题，10日江苏省消保委结合智能电视开机广告消费调查情况，依法约谈海信、创维、夏普、长虹、小米、海尔、乐视7家电视企业，并提出履行售前告知开机广告、提供广告一键关闭功能等整改要求。",
    events: {
      event_type: "司法行为-约谈",
      trigger: {
        keywords: "约谈",
        position: "53:55"
      },
      arguments: [
        {
          entity: "江苏省消保委",
          position: "28:34",
          role: "约谈发起方"
        },
        {
          entity: "海信",
          position: "55:57",
          role: "约谈对象"
        },
        {
          entity: "创维",
          position: "58:60",
          role: "约谈对象"
        },
        {
          entity: "夏普",
          position: "61:63",
          role: "约谈对象"
        },
        {
          entity: "长虹",
          position: "64:66",
          role: "约谈对象"
        },
        {
          entity: "小米",
          position: "67:69",
          role: "约谈对象"
        },
        {
          entity: "海尔",
          position: "70:72",
          role: "约谈对象"
        },
        {
          entity: "乐视",
          position: "73:75",
          role: "约谈对象"
        }
      ]
    },
    sent_id: "72711db2fa9e2aa1fec453221a22ee75"
  },
  {
    text: "8月23日，李女士讲述了两位公交司机发现汽车尾部冒烟，冷静处理险情，及时疏散旅客，保障了整车人的安全。为此李女士夫妇专门写了感谢信，除了向他们致谢之外，也想向社会传递正能量。",
    events: {
      event_type: "交往-感谢",
      trigger: {
        keywords: "感谢信",
        position: "62:65"
      },
      arguments: [
        {
          entity: "李女士夫妇",
          position: "53:57",
          role: "致谢人"
        },
        {
          entity: "两位公交司机",
          position: "12:18",
          role: "被感谢人"
        }
      ]
    },
    sent_id: "43b6a0f3d2f2179a312c06ed82aed04f"
  },
  {
    text: "菲律宾南部发生爆炸7人受伤",
    events: {
      event_type: "灾害/意外-爆炸",
      trigger: {
        keywords: "爆炸",
        position: "7:9"
      },
      arguments: [
        {
          entity: "菲律宾南部",
          position: "0:5",
          role: "地点"
        },
        {
          entity: "7人",
          position: "10:12",
          role: "受伤人数"
        }
      ]
    },
    sent_id: "3120a277528d5c2c0b432745af4820a6"
  },
  {
    text: "苹果新机起售价直降千元：5G赛道落后，已四度降价促销",
    events: {
      event_type: "财经/交易-降价",
      trigger: {
        keywords: "直降",
        position: "7:9"
      },
      arguments: [
        {
          entity: "苹果",
          position: "0:2",
          role: "降价方"
        },
        {
          entity: "新机",
          position: "2:4",
          role: "降价物"
        }
      ]
    },
    sent_id: "3381910233fcb3933ec3f8bbb702d333"
  },
  {
    text: "日本广播公司(NHK)刚刚消息，当地时间27日9时20分左右，特朗普夫妇来到皇居，会见日本新天皇德仁夫妇。",
    events: {
      event_type: "交往-会见",
      trigger: {
        keywords: "会见",
        position: "41:43"
      },
      arguments: [
        {
          entity: "当地时间27日9时20分左右",
          position: "16:30",
          role: "时间"
        },
        {
          entity: "特朗普夫妇",
          position: "31:36",
          role: "会见主体"
        },
        {
          entity: "皇居",
          position: "38:40",
          role: "地点"
        },
        {
          entity: "日本新天皇德仁夫妇",
          position: "43:52",
          role: "会见对象"
        }
      ]
    },
    sent_id: "9ae517611f82ae4f3c0633bd003849da"
  },
  {
    text: "王毅会见东帝汶外长巴博",
    events: {
      event_type: "交往-会见",
      trigger: {
        keywords: "会见",
        position: "2:4"
      },
      arguments: [
        {
          entity: "王毅",
          position: "0:2",
          role: "会见主体"
        },
        {
          entity: "东帝汶外长巴博",
          position: "4:10",
          role: "会见对象"
        }
      ]
    },
    sent_id: "99e24ab008ea14deaf300a78a0ead2a0"
  },
  {
    text: "惠若琪谈退役原因落泪，直言：当有健康的时候，就想要回到球场上",
    events: {
      event_type: "竞赛行为-退役",
      trigger: {
        keywords: "退役",
        position: "4:6"
      },
      arguments: [
        {
          entity: "惠若琪",
          position: "0:3",
          role: "退役者"
        }
      ]
    },
    sent_id: "e9b4a87f5a8126b94ac218d28aafc442"
  },
  {
    text: "名宿纪敏尚之子！广东队20岁小将纪祥宣布退役",
    events: {
      event_type: "竞赛行为-退役",
      trigger: {
        keywords: "退役",
        position: "20:22"
      },
      arguments: [
        {
          entity: "广东队20岁小将纪祥",
          position: "8:18",
          role: "退役者"
        }
      ]
    },
    sent_id: "840eadb892ddea95d40123545c677ea0"
  },
  {
    text: "两个真心相爱的人，王祖蓝和李亚男在去年12月得偿所愿，生下了女儿王天韵，夫妇二人那是喜笑颜开，不过也有一个很大的顾虑，王祖蓝害怕自己基因太强大，天韵小朋友会像爸爸一样有一个大鼻子和短小的身形。",
    events: {
      event_type: "人生-产子/女",
      trigger: {
        keywords: "生下",
        position: "27:29"
      },
      arguments: [
        {
          entity: "去年12月",
          position: "17:21",
          role: "时间"
        },
        {
          entity: "李亚男",
          position: "13:16",
          role: "产子者"
        },
        {
          entity: "女儿王天韵",
          position: "30:35",
          role: "出生者"
        }
      ]
    },
    sent_id: "07816628fe32121c30bb5ef14c23ab4a"
  },
  {
    text: "海峡两岸信息服务创新大赛总决赛福州举行22个项目获一等奖",
    events: {
      event_type: "产品行为-获奖",
      trigger: {
        keywords: "获一等奖",
        position: "25:29"
      },
      arguments: [
        {
          entity: "获一等奖",
          position: "25:29",
          role: "奖项"
        }
      ]
    },
    sent_id: "cec74e353f3cd44023fc0049ec243f62"
  },
  {
    text: "徐州8岁女孩做了个问卷调查，居然获省二等奖！她还有这些才华",
    events: {
      event_type: "产品行为-获奖",
      trigger: {
        keywords: "获省二等奖",
        position: "16:21"
      },
      arguments: [
        {
          entity: "徐州8岁女孩",
          position: "0:6",
          role: "获奖人"
        },
        {
          entity: "省二等奖",
          position: "17:21",
          role: "奖项"
        }
      ]
    },
    sent_id: "6a18fd04696700d5cd5a002fc922c406"
  }
];
export default testData;
