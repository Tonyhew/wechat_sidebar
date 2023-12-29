// 已划扣
export const customerHistoryDeductionColumns = [
  {
    title: '划扣时间',
    dataIndex: 'debitDate',
    key: 'debitDate',
    width: 60
    // fixed: 'left'
  },
  {
    key: 'deductionQuantity',
    title: '次数',
    dataIndex: 'deductionQuantity',
    width: 40
  },
  {
    title: '手术方法详情',
    dataIndex: 'treatmentMethod',
    key: 'treatmentMethod',
    width: 120
  },
  {
    title: '手术医生',
    dataIndex: 'treatingDoctor',
    key: 'treatingDoctor',
    width: 60,
    render: (v) => {
      return v ? v : '-';
    }
  },
  {
    key: 'treatingNurse',
    title: '配台护士',
    dataIndex: 'treatingNurse',
    width: 50,
    render: (v) => {
      return v ? v : '-';
    }
  }
];

// 未划扣
export const customerDeductionColumns = [
  {
    title: '最后划扣时间',
    dataIndex: 'debitDate',
    key: 'debitDate',
    width: 120,
    fixed: 'left',
    render: (v) => {
      return v !== '' && v != null ? v : '-';
    }
  },
  {
    title: '部位',
    dataIndex: 'projectType',
    key: 'projectType',
    width: 120
  },
  {
    title: '手术方法',
    dataIndex: 'treatmentMethod',
    key: 'treatmentMethod',
    width: 150
  },
  {
    title: '详情',
    dataIndex: 'details',
    key: 'details',
    width: 100
  },
  {
    title: '总次数',
    dataIndex: 'total',
    key: 'total',
    width: 100,
    render: (i) => {
      return `${i} 次`;
    }
  },
  {
    title: '剩余次数',
    dataIndex: 'residueNumber',
    key: 'residueNumber',
    width: 100,
    render: (i) => {
      return `${i} 次`;
    }
  },
  {
    title: '结算日期',
    dataIndex: 'purchaseTime',
    key: 'purchaseTime',
    width: 150
  }
];
