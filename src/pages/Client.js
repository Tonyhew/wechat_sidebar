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
          
          const {
            operation_record,
            name,
            wechat_name,
            gender,
            mobile,
            city,
            provice,
            city_area,
            isInteresting,
            interesting_project,
            client_job,
            client_income,
            client_isHospital,
          } = clientInfo;

          return (
            <div key={index} className={'client_info'}>
              <p>操作记录: {operation_record}</p>
              <p>真实姓名: {name}</p>
              <p>微信昵称: {wechat_name}</p>
              <p>性别: {gender === 1 ? '男' : '女'}</p>
              <p>手机号: {mobile}</p>
              <p>所在地区: {city} - {provice} - {city_area}</p>
              <p>客户意向: {isInteresting}</p>
              <p>意向项目: {interesting_project}</p>
              <p>客户职业: {client_job}</p>
              <p>收入情况: {client_income}</p>
              <p>到院情况: {client_isHospital}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Client;
