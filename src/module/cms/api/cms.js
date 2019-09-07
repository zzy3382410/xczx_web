import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
//页面查询
export const page_list = (page,size,params) =>{
  //请求服务端的页面查询接口
  let query = querystring.stringify(params)
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size+'/?'+query);
}

export const page_add =params =>{
  return http.requestPost(apiUrl+'/cms/page/add',params)
}

export const page_get = id =>{
  return http.requestQuickGet(apiUrl+'/cms/page/get/'+id)
}

export const page_edit = (id,params)=>{
  return http.requestPut(apiUrl+'/cms/page/edit/'+id,params)
}

export const page_del = id =>{
  return http.requestDelete(apiUrl+'/cms/page/del/'+id)
}
