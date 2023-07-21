import { addIcon } from "@iconify/vue/dist/offline";

/**
 * 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
 */

// 本地菜单图标，后端在路由的icon中返回对应的图标字符串并且前端在此处使用addIcon添加即可渲染菜单图标
import HomeFilled from "@iconify-icons/ep/home-filled";
import InformationLine from "@iconify-icons/ri/information-line";
import Lollipop from "@iconify-icons/ep/lollipop";

//二次开发
import NodeIndex from "@iconify-icons/ant-design/node-index-outlined";
import SafetyCertificate from "@iconify-icons/ant-design/safety-certificate-outlined";
import Robot from "@iconify-icons/ant-design/robot-outlined";
import Bug from "@iconify-icons/ant-design/bug-filled";
import NER from "@iconify-icons/ri/character-recognition-line";

//pureadmin源码
addIcon("homeFilled", HomeFilled);
addIcon("informationLine", InformationLine);
addIcon("lollipop", Lollipop);

//二次开发
addIcon("nodeIndex", NodeIndex);
addIcon("safetyCertificate", SafetyCertificate);
addIcon("robot", Robot);
addIcon("bug", Bug);
addIcon("ner", NER);
