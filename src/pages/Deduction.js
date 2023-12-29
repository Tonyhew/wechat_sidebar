import React, { useCallback, useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { customerDeductionColumns } from '../components/deductionColumns.d.js';
import service from '../config/axiosConfig.js';
import servicePath from '../config/api.config';

/**
 * 未划扣记录
 * @returns
 */
const Deduction = (props) => {
  const { crmId } = props;
  const [dataLoading, setDataLoading] = useState(false);
  const [deductionList, setDeductionList] = useState([]);

  const getDeductionList = useCallback(() => {
    setDataLoading(true);
    service({
      method: 'POST',
      url: servicePath.selectOrdersNotDeducteds,
      data: {
        crmId
      }
    })
      .then((res) => {
        if (res.data.errCode === 0) {
          const data = res.data;
          setDataLoading(false);
          setDeductionList(data.data);
        } else {
          setDataLoading(false);
          message.error('数据获取失败, 请稍后刷新重试!');
        }
      })
      .catch(() => {
        setDataLoading(false);
        message.error('数据获取失败, 请稍后刷新重试!');
      });
  }, [crmId]);

  useEffect(() => {
    if (crmId) {
      getDeductionList();
    }
  }, [getDeductionList, crmId]);

  return (
    <div className="container_child">
      <Table
        loading={dataLoading}
        columns={customerDeductionColumns}
        dataSource={deductionList}
        scroll={{ x: 600, y: 500 }}
      />
    </div>
  );
};

export default Deduction;
