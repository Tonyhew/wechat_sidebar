import React, { useState, useCallback, useEffect } from 'react';
import { Table, message } from 'antd';
import service from '../config/axiosConfig';
import servicePath from '../config/api.config';

/**
 * 回访记录
 * @author Tonyhe
 * @returns
 */
const ReturnVisit = (props) => {
  const { crmId } = props;
  const [dataLoading, setDataLoading] = useState(false);
  const [returnVisitList, setReturnVisitList] = useState([]);

  const getReturnVisitList = useCallback(() => {
    setDataLoading(true);
    service({
      method: 'POST',
      url: servicePath.VisitHistoryList,
      data: {
        crmId
      }
    })
      .then((res) => {
        if (res.data.errCode === 0) {
          const data = res.data;
          setDataLoading(false);
          setReturnVisitList(data.data);
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
      getReturnVisitList();
    }
  }, [getReturnVisitList, crmId]);

  const visitHistoryListColumns = [
    {
      title: '回访内容',
      dataIndex: 'content',
      width: 60,
      ellipsis: true,
      render: (v) => {
        return v ? v : '-- 无 --'
      }
    },
    {
      title: '回访时间',
      dataIndex: 'visitTime',
      width: 40
    },
    {
      title: '回访人',
      dataIndex: 'staffName',
      width: 40
    }
  ];

  return (
    <div className="container_child">
      <Table
        // title={() => '回访记录'}
        loading={dataLoading}
        dataSource={returnVisitList}
        columns={visitHistoryListColumns}
        rowKey={(v) => v.visitId}
        scroll={{ x: 350, y: 500 }}
        expandable={{
          columnWidth: 15,
          expandedRowRender: (a) => a.content,
          rowExpandable: (e) => e.content.length > 10
        }}
      />
    </div>
  );
};

export default ReturnVisit;
