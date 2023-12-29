import React, { useState, useEffect, useCallback } from 'react';
import { Timeline, Result, Skeleton } from 'antd';
import service from '../config/axiosConfig';
import servicePath from '../config/api.config';

const Payment = (props) => {
  const { crmId } = props;
  const [dataLoading, setDataLoading] = useState(false);
  // 时间线（时间及详细说明）
  const [timeLine, setTimeLine] = useState([]);
  // 时间轴备注内容
  // const [tlRemark, setTLRemark] = useState('');

  const getUserPayment = useCallback(() => {
    setDataLoading(true);
    service({
      url: servicePath.selectDeductionRecordList,
      method: 'POST',
      data: {
        crmId
      },
      withCredentials: true,
      header: {
        'Acess-Control-Allow-Origin': '*'
      }
    }).then((res) => {
      if (res.data.errCode === 0) {
        const data = res.data;
        setDataLoading(false);
        setTimeLine(data.data);
      }
    });
  }, [crmId]);

  useEffect(() => {
    // setTimeLine(timeLineData)
    getUserPayment();
  }, [getUserPayment]);

  return (
    <div className={'container_child'}>
      <Skeleton active loading={dataLoading} />
      {!dataLoading &&
        (timeLine.length > 0 ? (
          <Timeline mode="left">
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
          <Result
            status={404}
            title={'暂无消费记录'}
            subTitle={'消费记录暂时还没有哦'}
          />
        ))}
    </div>
  );
};

export default Payment;
