import React, { useState, useEffect, useCallback } from 'react';
import { Timeline, Result } from 'antd';
import axios from 'axios';
import api from '../config/api.config';
// import '../assets/style/ClientProcess.scss'

// const timeLineData = [
//   {
//     id: 1,
//     time: '2021-09-01',
//     event: 'ddddddddddddddd',
//   },
//   {
//     id: 2,
//     time: '2021-09-05',
//     event: 'ddddddddddddddd',
//   },
// ];

function Payment(props) {
  const { crmId } = props;
  // 时间线（时间及详细说明）
  const [timeLine, setTimeLine] = useState([]);
  // 时间轴备注内容
  // const [tlRemark, setTLRemark] = useState('');

  const getUserPayment = useCallback(() => {
    axios({
      url: api.selectDeductionRecordList,
      method: 'POST',
      data: {
        crmId: crmId,
        // crmId: '00052306',
      },
      withCredentials: true,
      header: {
        'Acess-Control-Allow-Origin': '*',
      },
    }).then((res) => {
      console.log(res);
      const data = res.data;
      setTimeLine(data.data);
    });
  }, [crmId]);

  useEffect(() => {
    // setTimeLine(timeLineData)
    getUserPayment();
  }, [getUserPayment]);

  return (
    <div className={'timeline_main'} style={{ width: '90%', margin: '0 auto' }}>
      {timeLine.length > 0 ? (
        <Timeline mode='left'>
          {timeLine.map((item, index) => {
            return (
              <Timeline.Item key={index}>
                <>
                  <p>{item.debitDate}</p>
                  <p>医生: {item.treatingDoctor}</p>
                  <p>手术名称: {item.treatmentMethod}</p>
                  <p>状态: {item.typeOfTutoring}</p>
                  <p>金额: {`￥${item.cash}`}</p>
                </>
              </Timeline.Item>
            );
          })}
        </Timeline>
      ) : (
        <Result status={404} title={'暂无消费记录'} subTitle={'消费记录暂时还没有哦'} />
      )}
    </div>
  );
}

export default Payment;
