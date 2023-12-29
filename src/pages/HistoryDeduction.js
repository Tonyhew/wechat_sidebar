import React, { useCallback, useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { customerHistoryDeductionColumns } from '../components/deductionColumns.d.js';
import service from '../config/axiosConfig.js';
import servicePath from '../config/api.config';

/**
 * 已划扣记录
 * @returns
 */
const HistoryDeduction = (props) => {
  const { crmId } = props;
  const [dataLoading, setDataLoading] = useState(false);
  const [historyDeductionList, setHistoryDeductionList] = useState([]);

  const getHistoryDeduction = useCallback(() => {
    setDataLoading(true);
    service({
      method: 'POST',
      url: servicePath.selectDeductionRecordList,
      data: {
        crmId
      }
    }).then((res) => {
      if (res.data.errCode === 0) {
        const data = res.data;
        setDataLoading(false);
        setHistoryDeductionList(data.data);
      } else {
        setDataLoading(false);
        message.error('数据获取失败, 请稍后刷新重试!');
      }
    })
    .catch(() => {
      setDataLoading(false);
      message.error('数据获取失败, 请稍后刷新重试!');
    });;
  }, [crmId]);

  useEffect(() => {
    if (crmId) {
      getHistoryDeduction();
    }
  }, [getHistoryDeduction, crmId]);

  return (
    <div className="container_child">
      <Table
        loading={dataLoading}
        columns={customerHistoryDeductionColumns}
        dataSource={historyDeductionList}
        scroll={{ x: 600, y: 500 }}
      />
    </div>
  );
};

export default HistoryDeduction;
