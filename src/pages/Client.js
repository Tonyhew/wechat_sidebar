/**
 * @description 显示用户详细信息页面
 * @author Tonyhew
 */

// import { message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Descriptions, Skeleton, message } from 'antd';
import { fmoney } from '../utils';

const Client = (props) => {
  const { qwUserList } = props;
  const { Item } = Descriptions;
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
          let b = new Date(clientInfo.birthday).getTime();
          let n = new Date().getTime();
          //一年毫秒数(365 * 86400000 = 31536000000)
          let r = Math.ceil((n - b) / 31536000000);
          setCurrentAge(r);
        }
      })
      .catch((err) => {
        clearTimeout(t);
        setDataLoading(false);
        message.error(err);
      });
  }, [clientInfo.birthday, qwUserList]);

  const items = [
    {
      key: '姓名',
      label: '姓名',
      children: clientInfo.name
    },
    {
      key: '性别',
      label: '性别',
      children: clientInfo.gender
    },
    {
      key: '会员等级',
      label: '会员等级',
      children: clientInfo.memberLevel
    },
    {
      key: '未回访天数',
      label: '未回访天数',
      children: clientInfo.noReturnVisitDays
    },
    {
      key: '电话',
      label: '电话',
      children: clientInfo.mobile
    },
    {
      key: '生日',
      label: '生日',
      children: clientInfo.birthday
    },
    {
      key: '年龄',
      label: '年龄',
      children: currentAge
    },
    {
      key: '地区',
      label: '地区',
      children: `${clientInfo.addressOne} - ${clientInfo.addressTwo}`
    },
    {
      key: '咨询意向',
      label: '咨询意向',
      children: clientInfo.consultIntention
    },
    {
      key: '消费金额',
      label: '消费金额',
      children: `${fmoney(clientInfo.totalMoney, 2)} 元`
    },
    {
      key: '顾客类型',
      label: '顾客类型',
      children: clientInfo.customerLevel
    }
  ];

  useEffect(() => {
    getClientInfo();
  }, [getClientInfo]);

  return (
    <div className={'container_child'}>
      <Skeleton active loading={dataLoading} paragraph />

      {!dataLoading && (
        <div className={'client_info'}>
          <Descriptions bordered layout={'horizontal'}>
            {items.map((item) => {
              return (
                <Item
                  key={item.key}
                  label={item.label}
                  children={item.children}
                />
              );
            })}
          </Descriptions>
        </div>
      )}
    </div>
  );
}

export default Client;
