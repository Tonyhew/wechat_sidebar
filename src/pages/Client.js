/**
 * @description 显示用户详细信息页面
 * @author Tonyhew
 */

import React, { useEffect, useState } from 'react'

function Client(props) {
  const [clientInfo, setClientInfo] = useState([])
  const [currentAge, setCurrentAge] = useState('')

  useEffect(() => {
    setClientInfo(props.qwUserList)
    let b = new Date(clientInfo.birthday).getTime()
    var n = new Date().getTime()
    //一年毫秒数(365 * 86400000 = 31536000000)
    let r = Math.ceil((n - b) / 31536000000)
    setCurrentAge(r)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientInfo])

  function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2
    // eslint-disable-next-line no-useless-escape
    s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
    var l = s.split('.')[0].split('').reverse(),
      r = s.split('.')[1],
    t = ''
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '')
    }
    return t.split('').reverse().join('') + '.' + r
  }

  return (
    <div className={'container_child'}>
      {
        // ，，，
        <div className={'client_info'}>
          <p>姓名: {clientInfo.name}</p>
          <p>性别: {clientInfo.gender}</p>
          <p>电话: {clientInfo.mobile}</p>
          <p>生日: {clientInfo.birthday}</p>
          <p>年龄: {currentAge} 岁</p>
          <p>
            地区: {clientInfo.addressOne} - {clientInfo.addressTwo}
          </p>
          <p>咨询意向: {clientInfo.consultIntention}</p>
          <p>消费金额: {fmoney(clientInfo.totalMoney, 2)} 元</p>
          <p>顾客类型: {clientInfo.customerLevel}</p>
          <p>会员等级: {clientInfo.memberLevel}</p>
          <p>未回访天数: {clientInfo.noReturnVisitDays}</p>
        </div>
      }
    </div>
  )
}

export default Client
