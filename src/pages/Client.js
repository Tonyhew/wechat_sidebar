/**
 * @description 显示用户详细信息页面
 * @author Tonyhew
 */

import React, { useEffect, useState } from 'react';

// mock data
// const client = [
//   {
//     operation_record: '新增跟进',
//     name: 'hhh',
//     wechat_name: 'ddd',
//     gender: 2,
//     mobile: '13916627096',
//     city: '上海市',
//     provice: '上海市',
//     city_area: '浦东新区',
//     isInteresting: '很感兴趣',
//     interesting_project: '皮肤科',
//     client_job: '学生',
//     client_income: '10k',
//     client_isHospital: '未到院',
//   }
// ]

function Client(props) {

  const [clientInfo, setClientInfo] = useState([])

  useEffect(() => {
    setClientInfo(props.qwUserList)

  }, [])

  return (
    <div className={'container_child'}>
      {
        <div className={'client_info'}>
          <p>真实姓名: {clientInfo.name}</p>
          <p>性别: {clientInfo.gender}</p>
          <p>手机号: {clientInfo.mobile}</p>
          <p>所在地区: {clientInfo.addressOne} - {clientInfo.addressTwo}</p>
          <p>到院情况: {clientInfo.visitStatus}</p>
        </div>
      }
    </div>
  )
}

export default Client;
