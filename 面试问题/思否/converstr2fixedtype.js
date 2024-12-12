/**
 * 原始字符串：
 * 
 * /*
语言,项目,键值,文本
---
输入
zh,AlarmReasonType,C2,测试预警类型
en,AlarmReasonType,C2,test alarm type
zh,AlarmReasonType,C1,忽视设备劣化
en,AlarmReasonType,C1,Ignore equipment deterioration
输出
let target = {
  zh: {
    AlarmReasonType: {
      C1: '人员缺乏培训',
      C2: '测试预警类型'
    }
  },
  en: {
    AlarmReasonType: {
      C1: 'Ignore equipment deterioration',
      C2: ''
    }
  }
}
*/

const data =
    'zh,AlarmReasonType,C2,测试预警类型\r\nen,AlarmReasonType,C2,test alarm type\r\nzh,AlarmReasonType,C1,忽视设备劣化\r\nen,AlarmReasonType,C1,Ignore equipment deterioration\r\nzh,AlarmReasonType,C2,人员缺乏培训\r\nen,AlarmReasonType,C2,Lack of personnel training\r\nzh,DataType,C1,布尔\r\nen,DataType,C1,Bool\r\nzh,DataType,C2,整数\r\nen,DataType,C2,Int\r\nzh,Dictionary,code,代码\r\nen,Dictionary,code,Code\r\nzh,EquipmentType,C1,主发电机\r\nen,EquipmentType,C1,Major dynamo\r\nzh,EquipmentType,C2,中压配电板\r\nen,EquipmentType,C2,MV main switchboard\r\nzh,EquipmentType,C3,变压器\r\nen,EquipmentType,C3,Transformer\r\nzh,EquipmentUnits,C1,流送及真空\r\nen,EquipmentUnits,C1,Fllowing and Vacuum\r\nzh,EquipmentUnits,C2,电子的\r\nen,EquipmentUnits,C2,Electrical\r\nzh,EquipmentUnits,C3,浆料混合器\r\nen,EquipmentUnits,C3,Paste Mixer\r\nzh,EquipmentUnits,C4,cccc\r\nen,EquipmentUnits,C4,aaa\r\nzh,login,title,西门子船舶智能管家\r\nzh,login,logIn,登录\r\nzh,login,username,账号\r\nzh,login,password,密码\r\nen,login,title,Siemens Ship Intelligent Management System\r\nen,login,logIn,Login\r\nen,login,username,Username\r\nen,login,password,password\r\nzh,login,available,正常\r\nzh,login,unavailable,不可用\r\nzh,login,refresh,刷新\r\nen,login,available,available\r\nen,login,unavailable,unavailable\r\nen,login,refresh,refresh\r\nzh,Module,Asset,资产管理\r\nen,Module,Asset,AssetManagement\r\nzh,Permission,A00,查看资产\r\nen,Permission,A00,Show Asset\r\nen,PropertyCatalogDefine,BasicProp,BasicProp\r\nzh,PropertyCatalogDefine,BasicProp,基本信息\r\nen,PropertyCatalogDefine,DeviceParameter,DeviceParameter\r\nzh,PropertyCatalogDefine,DeviceParameter,设备参数\r\nen,PropertyCatalogDefine,DeviceStatus,DeviceStatus\r\nzh,PropertyCatalogDefine,DeviceStatus,设备状态\r\nen,PropertyCatalogDefine,DeviceDiagnose,DeviceDiagnose\r\nzh,PropertyCatalogDefine,DeviceDiagnose,设备诊断\r\nen,PropertyCatalogDefine,Additional,Additional\r\nzh,PropertyCatalogDefine,Additional,附加信息\r\nen,PropertyCatalogDefine,DeviceUnit,DeviceUnit\r\nzh,PropertyCatalogDefine,DeviceUnit,设备单元\r\nen,PropertyCatalogDefine,DeviceCircuit,DeviceCircuit\r\nzh,PropertyCatalogDefine,DeviceCircuit,设备回路\r\nen,PropertyCultureDefine,DeviceNo,DeviceNo\r\nzh,PropertyCultureDefine,DeviceNo,设备编号\r\nzh,PropertyDefine,Current,电流\r\nen,PropertyDefine,Current,Current\r\nzh,PropertyUnit,A,安培\r\nen,PropertyUnit,A,A\r\nzh,PropertyUnit,V,伏\r\nen,PropertyUnit,V,V\r\nzh,UI,save,保存\r\nen,UI,save,Save\r\nzh,UI,AddNew,新增\r\nen,UI,AddNew,New\r\n'

const sourceArr = data.split("\r\n");
let source = {};
sourceArr.map(item => {
    if (!item) return;
    let [lan, proName, key, value] = item.split(",");
    // 已经存在的 语言
    if (source[lan]) {
        // 不存在的项目
        if (!source[lan][proName]) {
            source[lan][proName] = {};
        } 
    } else {
        source[lan] = {};
        source[lan][proName] = {};
    }
    source[lan][proName][key] = value;
});

console.log('source',source);