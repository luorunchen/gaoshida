import { service, service_ycy } from '../utils/request.js'

//登录接口
export function login(username, password) {
  return service({
    url: `/LoginWeb.action`,
    method: 'POST',
    params: {
      username,
      password
    }
  })
}


//首页地图接口
export function sy_map(username, type, region) {
  return service({
    url: `/WebProject/DeviceProject.action`,
    method: 'POST',
    params: {
      username,
      type,
      region
    }
  })
}
//首页报警数接口
export function push_AlarmData(username, time_zone) {
  return service({
    url: `/admin/bigdata/push_AlarmData`,
    method: 'GET',
    params: {
      username,
      time_zone
    }
  })
}
//首页报警信息接口
export function push_AlarmInfo(username, time_zone) {
  return service({
    url: `/admin/bigdata/push_AlarmInfo.action`,
    method: 'GET',
    params: {
      username,
      time_zone
    }
  })
}
//首页设备概况接口
export function push_DeviceData(username, time_zone) {
  return service({
    url: `/admin/bigdata/push_DeviceData.action`,
    method: 'GET',
    params: {
      username,
      time_zone
    }
  })
}
//首页设备类型接口
export function check_device_type(username) {
  return service({
    url: `/check_device_type.action`,
    method: 'GET',
    params: {
      username,

    }
  })
}
//首页报警数量接口
export function push_AlarmNumData(username, time_zone) {
  return service({
    url: `/admin/bigdata/push_AlarmNumData.action`,
    method: 'GET',
    params: {
      username,
      time_zone
    }
  })
}
export function push_AlarmAndFault(username, date) {
  return service({
    url: `/admin/bigdata/push_AlarmAndFault.action`,
    method: 'GET',
    params: {
      username,
      date
    }
  })
}
export function push_ProjectRegion(username, time_zone) {
  return service({
    url: `/admin/bigdata/push_ProjectRegion.action`,
    method: 'GET',
    params: {
      username,
      time_zone
    }
  })
}
//首页报警信息加载更多
export function AlarmInforMore(username, time_zone, pno, pagesize) {
  return service({
    url: `/admin/bigdata/push_AlarmInfo.action`,
    method: 'GET',
    params: {
      username,
      time_zone,
      pno,
      pagesize
    }
  })
}

//隐患进度整改接口
export function getIndexReport(username) {
  return service({
    url: `/getIndexReport.action`,
    method: 'GET',
    params: {
      username,

    }
  })
}
//今日报警接口
export function DeviceAlarm(username, type, region) {
  return service({
    url: `/WebProject/DeviceAlarm.action`,
    method: 'GET',
    params: {
      username,
      type,
      region
    }
  })
}
//接入设备接口
export function DeviceNum(username, type, region) {
  return service({
    url: `/WebProject/DeviceNum.action`,
    method: 'GET',
    params: {
      username,
      type,
      region
    }
  })
}
//接入设备报警查看接口
export function getAlarmDevice(username, PageNo, alarm, PageSize, object) {
  return service({
    url: `/WebProject/getAlarmDevice.action`,
    method: 'GET',
    params: {
      username,
      PageNo,
      alarm,
      PageSize,
      object
    }
  })
}
//接入设备在线设备查看接口
export function getDeviceStatus(my_username, PageNo, alarm, PageSize, object, type, username, status) {
  return service({
    url: `/WebProject/getDeviceStatus.action`,
    method: 'GET',
    params: {
      my_username,
      PageNo,
      alarm,
      PageSize,
      object,
      type,
      username,
      status
    }
  })
}
//今日报警详情查看接口
export function SElec_DetailElecDevice(pid) {
  return service({
    url: `/admin/project/SElec_DetailElecDevice.action`,
    method: 'POST',
    data: `pid=${pid}`


  })
}
//今日报警详情查看接口
export function GetMapData(pid, type, username) {
  return service({
    url: `/admin/project/GetMapData.action`,
    method: 'GET',
    params: {
      pid,
      type,
      username
    }
  })
}
//今日报警详情查看接口
export function getDeviceByPid(pid, type, pagetype, username) {
  return service({
    url: `/admin/project/getDeviceByPid.action`,
    method: 'GET',
    params: {
      pid,
      type,
      pagetype,
      username
    }
  })
}
//接入设备->报警查看图表接口
export function ElectricDeviceDate(devId, lstDate) {
  return service({
    url: `/admin/device/ElectricDeviceDate.action`,
    method: 'GET',
    params: {
      devId,
      lstDate,

    }
  })
}
//接入设备->报警查看详细接口
export function ElecData(devId, lstDate) {
  return service({
    url: `/admin/device/ElecData.action`,
    method: 'GET',
    params: {
      devId,
      lstDate,

    }
  })
}
//消防水位详情接口
export function ElecData_type(devId, type) {
  return service({
    url: `/admin/device/ElecData.action`,
    method: 'GET',
    params: {
      devId,
      type,

    }
  })
}
//接入设备->报警=>解除报警接口
export function WebeditFileimageServlet(username, cause) {
  return service({
    url: `/WebeditFileimageServlet`,
    method: 'GET',
    params: {
      username,
      cause,

    }
  })
}
//接入设备->报警=>数据详情接口
export function getDeviceByDevId(devid) {
  return service({
    url: `/admin/device/getDeviceByDevId.action`,
    method: 'GET',
    params: {
      devid,

    }
  })
}
//接入设备->报警=>数据详情接口
export function ReadParameterApi(id) {
  return service({
    url: `/ReadParameterApi.action`,
    method: 'GET',
    params: {
      id,

    }
  })
}
//接入设备->报警=>设备设置(保险单号)接口
export function putMessToDevice(imei, content) {
  return service({
    url: `/admin/project/putMessToDevice.action`,
    method: 'GET',
    params: {
      imei,
      "content=InsuranceNo": content
    }
  })
}
//接入设备->报警=>设备设置(远程断电/消音)接口
export function resetclose(imei, states) {
  return service({
    url: `/resetclose.action`,
    method: 'GET',
    params: {
      imei,
      states
    }
  })
}
//接入设备->报警=>设备设置(远程复位)接口
export function resetclosefuwei(imei, states) {
  return service({
    url: `/resetclose.action`,
    method: 'GET',
    params: {
      imei,
      states
    }
  })
}
//接入设备->报警=>设备设置(远程开/关机)接口
export function putMessToDeviceOn(imei, content) {
  return service({
    url: `/admin/project/putMessToDevice.action`,
    method: 'GET',
    params: {
      imei,
      content
    }
  })
}
//接入设备->报警=>设备设置(授权)接口
export function insertClouddog(devices) {
  return service({
    url: `/WebProject/insertClouddog.action`,
    method: 'GET',
    params: {
      devices,

    }
  })
}
//接入设备->报警=>设备设置(开启屏蔽器)接口
export function updateShutdown(devices, my_username) {
  return service({
    url: `/WebProject/updateShutdown`,
    method: 'GET',
    params: {
      devices,
      my_username
    }
  })
}
//接入设备->报警=>设备设置(阀值设置)接口
export function SetParameterApi(devSignature, parNine, parTen, parEleven,
  parTwelve, parThirteen, parFourteen, parFifteen, parSixteen, parSeventeen, parEighteen, parNineteen) {
  return service({
    url: `/SetParameterApi.action`,
    method: 'GET',
    params: {
      devSignature, parNine, parTen, parEleven,
      parTwelve, parThirteen, parFourteen, parFifteen, parSixteen, parSeventeen, parEighteen, parNineteen
    }
  })
}
//接入设备->报警=>设备设置(报警推送)接口
export function UpdateDevicePush(devicename, app, username, sms, deviceId, phone) {
  return service({
    url: `/WebProject/UpdateDevicePush.action`,
    method: 'GET',
    params: {
      devicename,
      app,
      username,
      sms,
      deviceId,
      phone
    }
  })
}
//接入设备->报警=>设备设置(报警推送)接口
export function getHistoryFault(deviceId, lodDate, newDate) {
  return service({
    url: `/WebProject/getHistoryFault`,
    method: 'GET',
    params: {

      deviceId,
      lodDate,
      newDate
    }
  })
}
//地图点
export function DeviceProjectNew(username, type, region) {
  return service({
    url: `/WebProject/DeviceProjectNew.action`,
    method: 'GET',
    params: {
      username,
      type,
      region
    }
  })
}
//萤石云视频
export function getvideo() {
  return service({
    url: `/getvideo.action`,
    method: 'GET',

  })
}
//烟感获取详情
export function getHisDeviceData(imei) {
  return service({
    url: `/admin/device/getHisDeviceData.action`,
    method: 'GET',
    params: {
      imei
    }
  })
}
//电力检测获取详情
export function fracture(did, my_username, st_date, en_date) {
  return service({
    url: `/fracture.action`,
    method: 'GET',
    params: {
      did, my_username, st_date, en_date
    }
  })
}
//高视达接口---------------------------------------------------------
//设备管理
export function getAllDeviceWeb(username, cp, col, state, kw, ls, deviceName, dSid) {
  return service({
    url: `/admin/device/getAllDeviceWeb.action`,
    method: 'GET',
    params: {
      username, cp, col, state, kw, ls, deviceName, dSid
    }
  })
}
//项目管理
export function getAllProjecForState(username, cp, col, state, kw, ls, pname) {
  return service({
    url: `/admin/project/getAllProjecForState.action`,
    method: 'GET',
    params: {
      username, cp, col, state, kw, ls, pname
    }
  })
}
//编辑设备
export function updateDeviceSim(devId, remark, my_username, installLocation) {
  return service({
    url: `/admin/device/check/updateDeviceSim.action`,
    method: 'GET',
    params: {
      devId, remark, my_username, installLocation
    }
  })
}
//删除设备
export function deleDevice(devId, username) {
  return service({
    url: `/admin/device/check/deleDevice.action`,
    method: 'GET',
    params: {
      devId, username
    }
  })
}
//删除项目
export function deleProject(devId, username) {
  return service({
    url: `/admin/project/check/deleProject.action`,
    method: 'GET',
    params: {
      devId, username
    }
  })
}
//获取消防员/责任人数据
export function getLegalFireMan(state, object) {
  return service({
    url: `/getLegalFireMan.action`,
    method: 'GET',
    params: {
      state, object
    }
  })
}
//删除消防员/责任人数据
export function deletegalFireMan(pid) {
  return service({
    url: `/admin/project/check/deletegalFireMan.action`,
    method: 'GET',
    params: {
      pid
    }
  })
}
//新增设备
export function addDevice(projName, devSignature, username, installLocation, long_lat, devtype, device_name, place, superiorEquipme, loopNumber, devId, devRemark, sms) {
  return service({
    url: `/admin/device/check/addDevice.action`,
    method: 'GET',
    params: {
      projName, devSignature, username, installLocation, long_lat, devtype, device_name, place, superiorEquipme, loopNumber, devId, devRemark, sms
    }
  })
}
//新增人员
export function addLegalFireMan(state, fname, username, fphone, tel, long_lat, long_latbai, ftelephone) {
  return service({
    url: `/admin/project/check/addLegalFireMan.action`,
    method: 'GET',
    params: {
      state, fname, username, fphone, tel, long_lat, long_latbai, ftelephone
    }
  })
}
//新增项目
export function addProject(username, projName, projLocation, fireGuardId, legalPersonId, projRemark, long_lat, placetype, code, gridmanId, street_charge) {
  return service({
    url: `/admin/project/check/addProject.action`,
    method: 'GET',
    params: {
      username, projName, projLocation, fireGuardId, legalPersonId, projRemark, long_lat, placetype, code, gridmanId, street_charge
    }
  })
}
//新增项目
export function newUpdateProjectSim(pid, projLocation, userName, userTel, resPeople, resTel, long_lat, projName, gridmanname, gridman, street_chargenanem, street_charge, long_latbai) {
  return service({
    url: `/admin/project/check/newUpdateProjectSim.action`,
    method: 'GET',
    params: {
      pid, projLocation, userName, userTel, resPeople, resTel, long_lat, projName, gridmanname, gridman, street_chargenanem, street_charge, long_latbai
    }
  })
}
//新增项目
export function getAllAlarmOrFault(username, type, proName, imei) {
  return service({
    url: `/getAllAlarmOrFault.action`,
    method: 'GET',
    params: {
      username, type, proName, imei
    }
  })
}
//单位管理信息获取
export function getProvince(username, otherParam, code) {
  return service({
    url: `/region/getProvince.action`,
    method: 'GET',
    params: {
      username, otherParam, code
    }
  })
}
//单位管理信息获取
export function getRegionList(username, pageSize, pno, region) {
  return service({
    url: `/region/getRegionList.action`,
    method: 'GET',
    params: {
      username, pno, pageSize, region
    }
  })
}
//单位管理信息获取
export function findRegion(username, region, pname) {
  return service({
    url: `region/findRegion.action`,
    method: 'GET',
    params: {
      username, region, pname
    }
  })
}
//功率管理
export function setPower(maxPower, minPower, devSignature) {
  return service({
    url: `setPower.action`,
    method: 'GET',
    params: {
      maxPower, minPower, devSignature
    }
  })
}


