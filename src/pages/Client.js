import React, { useEffect, useState } from 'react';

// mock data
const client = [
  {
    operation_record: '新增跟进',
    name: 'hhh',
    wechat_name: 'ddd',
    gender: 2,
    mobile: '13916627096',
    city: '上海市',
    provice: '上海市',
    city_area: '浦东新区',
    isInteresting: '很感兴趣',
    interesting_project: '皮肤科',
    client_job: '学生',
    client_income: '10k',
    client_isHospital: '未到院',
  }
]

function Client() {

  const [clientInfo, setClientInfo] = useState([])

  useEffect(() => {
    setClientInfo(client)

  }, [])

  return (
    <div className={'container_child'}>
      {
        clientInfo.map((clientInfo, index) => {
          return (
            <div key={index} className={'client_info'}>
              <p>操作记录: {clientInfo.operation_record}</p>
              <p>真实姓名: {clientInfo.name}</p>
              <p>微信昵称: {clientInfo.wechat_name}</p>
              <p>性别: {clientInfo.gender === 1 ? '男' : '女'}</p>
              <p>手机号: {clientInfo.mobile}</p>
              <p>所在地区: {clientInfo.city} - {clientInfo.provice} - {clientInfo.city_area}</p>
              <p>客户意向: {clientInfo.isInteresting}</p>
              <p>意向项目: {clientInfo.interesting_project}</p>
              <p>客户职业: {clientInfo.client_job}</p>
              <p>收入情况: {clientInfo.client_income}</p>
              <p>到院情况: {clientInfo.client_isHospital}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Client;
