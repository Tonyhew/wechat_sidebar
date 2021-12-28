import React, { useState, useEffect } from 'react';
import { Card, Avatar, Select, Tag, Cascader } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import '../assets/style/UserInfo.scss'

function UserInfo() {

  const data = {
    "data": [
      {
        'avatar': 'https://joeschmoe.io/api/v1/random',
        'name': 'tt',
        'mobile': '13916627096',
        'gender': '女'
      }
    ]
  }

  const clientS = [
    {
      id: 1,
      source: '手动添加',
      isSuccess: true
    }
  ]

  const isH = [
    {
      value: '未到院',
    }
  ]

  const tagData = [
    {
      value: 'shanghai',
      label: 'shanghai',
    },
    {
      value: 'nanjing',
      label: 'nanjing',
    },
    {
      value: 'shandong',
      label: 'shandong',
    },
    {
      value: 'zhejiang',
      label: 'zhejiang',
    },
    {
      label: 'Bamboo',
      value: 'bamboo',
      children: [

        {
          label: 'Toy Fish',
          value: 0,
        },
        {
          label: 'Toy Cards',
          value: 1,
        },
        {
          label: 'Toy Bird',
          value: 2,
        },

      ],
    },
  ]


  const { Meta } = Card;

  // 客户详细信息（头像、姓名、手机号）
  const [wxUserList, setWxUserList] = useState([]);
  // 客户来源
  const [clientSource, setClientSource] = useState([]);
  // 到院情况（字符串）
  const [isHospital, setIshospital] = useState('');
  // 客户标签
  const [clientTag, setClientTag] = useState([]);
  // 已选择的标签
  const [chooseTag, setChooseTag] = useState([])


  useEffect(() => {
    getData(data);
    setClientTag(tagData);
    setClientSource(clientS);
    setIshospital(isH[0].value);
    // setHospitalList(hlList.list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chooseTag])

  // mock客户数据
  const getData = (data) => {
    let res = data.data
    setWxUserList(res)
  }

  // 编辑客户信息
  const handleEdit = (e) => {
    console.log('edit', e)
  }

  // 打招呼
  const handleChat = (e) => {
    console.log('chat', e)
  }

  // 客户标签循环
  const tagRender = (props) => {
    const { label } = props;
    const onPreventMouseDown = e => {
      e.preventDefault();
      e.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        style={{ marginRight: 3, color: '#333', }}
      >
        {label}
      </Tag>
    );
  }

  const handleTagChange = (tagArr) => {
    setChooseTag(tagArr)
    console.log(chooseTag)
  }

  return (
    <>

      <Card
        bordered={false}
        className="userInfo-list"
      >
        {
          wxUserList.map((wxUserList, index) => {
            return (
              <div key={index} className={'userInfo-left'}>
                <Meta
                  avatar={<Avatar src={wxUserList.avatar} />}
                  title={
                    <h2 className={'user-name'}>{wxUserList.name}</h2>
                  }
                  description={
                    <>
                      <div>
                        <span className={'user-mobile'}>电话：{wxUserList.mobile}</span>
                        <span className={'user-gender'}>性别：{wxUserList.gender}</span>
                      </div>
                    </>
                  }
                />

              </div>
            )
          })
        }

        <div className={'userInfo-right'}>
          <span className={'user-edit'} onClick={handleEdit}>
            <FormOutlined />
          </span>

          <span className={'user-sayhi'} onClick={handleChat}>
            打招呼
          </span>
        </div>

      </Card>

      <div className={'clientInfo'}>

        <span className={'cTag'}>
          客户来源
          <p className={'clientSource tagSelect'}>
            {
              clientSource.map((item, index) => {
                return (
                  <span key={index}>{item.source}</span>
                )
              })
            }
          </p>
        </span>

        <span className={'cTag'}>
          到院情况
          <Select
            disabled
            showArrow={false}
            bordered={false}
            value={isHospital}
            className={'isHospital tagSelect'}
          />
        </span>

        <span className={'cTag clientTag'}>
          客户标签
          <Cascader
            showArrow
            multiple
            bordered={false}
            allowClear={false}
            options={clientTag}
            tagRender={tagRender}
            placeholder={'添加标签'}
            onChange={handleTagChange}
            className={'tagSelect tag-c'}
            dropdownClassName={'client_tag_dropdown'}
          />
        </span>

        <div style={{ 'clear': 'both' }}></div>
      </div>

    </>
  )

}


export default UserInfo;




