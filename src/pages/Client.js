/**
 * @description 显示用户详细信息页面
 * @author Tonyhew
 */

// import { message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Skeleton, message } from 'antd';
import { fmoney } from '../utils';

function Client(props) {
  const { qwUserList } = props;
  const [dataLoading, setDataLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState([]);
  const [currentAge, setCurrentAge] = useState('');

  const getClientInfo = useCallback(async () => {
    setDataLoading(true);

    let t;
    return await new Promise((resolve, reject) => {
      if (qwUserList) {
        t = setTimeout(() => {
          resolve({
            errCode: 0,
            data: qwUserList
          });
        }, 1000);
      } else {
        reject('数据请求失败');
      }
    })
      .then((res) => {
        if (res.errCode === 0) {
          clearTimeout(t);
          setDataLoading(false);
          setClientInfo(res.data);
        }
      })
      .catch((err) => {
        clearTimeout(t);
        message.error(err);
      });
  }, [qwUserList]);

  useEffect(() => {
    getClientInfo();
  }, [getClientInfo]);

  return (
    <div className={'container_child'}>
      <Skeleton active loading={dataLoading} />

      {!dataLoading && (
        <div className={'client_info'}>
          <p>姓名: {clientInfo.name}</p>
          <p>性别: {clientInfo.gender}</p>
          <p>会员等级: {clientInfo.memberLevel}</p>
          <p>未回访天数: {clientInfo.noReturnVisitDays}</p>
          <p>电话: {clientInfo.mobile}</p>
          <p>生日: {clientInfo.birthday}</p>
          <p>年龄: {currentAge} 岁</p>
          <p>
            地区: {clientInfo.addressOne} - {clientInfo.addressTwo}
          </p>
          <p>咨询意向: {clientInfo.consultIntention}</p>
          <p>消费金额: {fmoney(clientInfo.totalMoney, 2)} 元</p>
          <p>顾客类型: {clientInfo.customerLevel}</p>
        </div>
      )}
    </div>
  );
}

export default Client;
