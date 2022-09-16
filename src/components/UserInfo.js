/**
 * @description 用户信息组件，展示用户基本信息
 * @author Tonyhew
 */

import React, { useState, useEffect } from 'react'
import { Card, Avatar, Select, Tag, Cascader, Skeleton, message } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { hideMobileNum } from '../utils/index'
import '../assets/style/UserInfo.scss'

function UserInfo(props) {
  const qwUserList = props.qwUserList

  const { Meta } = Card

  const [userListSkeleton, setUserListSkeleton] = useState(true)

  // 到院情况（字符串）
  const [isHospital, setIshospital] = useState('')
  // 客户标签
  const [clientTag, setClientTag] = useState([])
  // 已选择的标签
  const [chooseTag, setChooseTag] = useState([])

  useEffect(() => {
    if (qwUserList.length !== 0 && userListSkeleton) {
      setUserListSkeleton(false)
    }

    // 客户标签
    setClientTag(qwUserList.tagRecordsList)
    // 是否已到院
    setIshospital(qwUserList.visitStatus)
    // setHospitalList(hlList.list);
    handleTagChange(chooseTag)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chooseTag, isHospital, qwUserList, userListSkeleton])

  // 编辑客户信息
  const handleEdit = (e) => {
    console.log('edit:', e)
  }

  // 打招呼
  const handleChat = () => {
    message.info('开发中')
  }

  // 客户标签循环
  const tagRender = (props) => {
    const { label } = props
    const onPreventMouseDown = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        style={{ marginRight: 3, color: '#333' }}
      >
        {label}
      </Tag>
    )
  }

  // 获取已被选中的客户标签（数组）
  const handleTagChange = (tagArr) => {
    setChooseTag(tagArr)
  }

  return (
    <>
      <Skeleton
        active
        avatar={{
          shape: 'square',
          size: 'large',
        }}
        loading={userListSkeleton}
      >
        <Card bordered={false} className='userInfo-list'>
          <div className={'userInfo-left'}>
            <Meta
              avatar={<Avatar src={qwUserList.avatar} />}
              title={<h2 className={'user-name'}>{qwUserList.name}</h2>}
              description={
                <>
                  <div>
                    <span className={'user-mobile'}>
                      电话: {hideMobileNum(qwUserList.mobile)}
                    </span>
                    <span className={'user-gender'}>
                      性别: {qwUserList.gender}
                    </span>
                  </div>
                </>
              }
            />
          </div>

          <div className={'userInfo-right'}>
            {userListSkeleton ? (
              <Skeleton.Button
                active
                shape={'circle'}
                size={'small'}
                className={'user-edit'}
              ></Skeleton.Button>
            ) : (
              <span className={'user-edit'} onClick={handleEdit}>
                <FormOutlined />
              </span>
            )}

            {/* {userListSkeleton ? (
              <Skeleton.Button
                active
                shape={'circle'}
                size={'small'}
                className={'user-sayhi'}
              ></Skeleton.Button>
            ) : (
              <span className={'user-sayhi'} onClick={() => handleChat()}>
                快捷回复
              </span>
            )} */}
          </div>
        </Card>
      </Skeleton>

      <Skeleton active paragraph={{ rows: 3 }} loading={userListSkeleton}>
        <div className={'clientInfo'}>
          <span className={'cTag'}>
            客户来源
            <p className={'clientSource tagSelect'}>
              <span>{qwUserList.middleClass}</span>
              {/* {
                clientSource.map((item, index) => {
                  return (
                    <span key={index}>{item.source}</span>
                  )
                })
              } */}
            </p>
          </span>

          <span className={'cTag'}>
            到院情况
            <Select
              disabled
              showArrow={false}
              bordered={false}
              value={
                isHospital !== '' && isHospital !== null ? isHospital : '未到院'
              }
              className={'isHospital tagSelect'}
            />
          </span>

          <span className={'cTag'}>
            所属顾问
            <span style={{ float: 'right' }}>
              {qwUserList.consultant ? qwUserList.consultant : '-'}
            </span>
          </span>

          <span className={'cTag'}>
            开发人
            <span style={{ float: 'right' }}>
              {qwUserList.developer ? qwUserList.developer : '-'}
            </span>
          </span>

          {/* <span className={'cTag clientTag'}>
            客户标签
            {
              
            }
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
          </span> */}

          <div style={{ clear: 'both' }}></div>
        </div>
      </Skeleton>
    </>
  )
}

export default UserInfo
