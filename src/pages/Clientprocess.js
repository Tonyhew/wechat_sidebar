import React, { useState, useEffect } from 'react';
import { Timeline, Button, Modal, Input } from 'antd';
import axios from 'axios';
import api from '../config/api.config';
import '../assets/style/ClientProcess.scss';

const firstToFollowup = [
  {
    id: 1,
    fTime: '2021-10-1'
  }
];

const lastFollowUpData = [
  {
    id: 1,
    lTime: '2021-12-05'
  }
];

const timeLineData = [
  {
    id: 1,
    time: '2021-09-01',
    event: 'ddddddddddddddd'
  }, {
    id: 2,
    time: '2021-09-05',
    event: 'ddddddddddddddd'
  },
];

function ClientProcess() {

  // 第一次跟进说明
  const [firstFollowUp, setFirstFollowUp] = useState([]);
  // 最后一次跟进说明
  const [lastFollowUp, setLastFollowUp] = useState([]);
  // 时间线（时间及详细说明）
  const [timeLine, setTimeLine] = useState([]);
  // 弹窗显示（TRUE：显示，FALSE：不显示）
  const [addTLModal, setAddTLModal] = useState(false);
  // 时间轴备注内容
  const [tlRemark, setTLRemark] = useState('')

  useEffect(() => {
    setFirstFollowUp(firstToFollowup);
    setLastFollowUp(lastFollowUpData);
    setTimeLine(timeLineData);

  }, [timeLine]);


  // 点击弹出弹窗
  const addTimeLine = () => {
    setAddTLModal(true)
  }

  // 弹窗点击取消后关闭弹窗
  const cancelModal = () => {
    setAddTLModal(false)
  }

  const changeInputValue = (e) => {
    setTLRemark(e.target.value)
  }

  // 
  const onOkModal = (e) => {
    const dataset = {
      event: tlRemark,
    }
    console.log(timeLine)

    axios({
      url: api.getTken,
      data: dataset,
      withCredentials: true,
      header: {
        'Acess-Control-Allow-Origin': '*',
      }
    }).then(
      res => {
        console.log(res)
        timeLine.push(
          { event: tlRemark }
        )
        setTLRemark('')
        setAddTLModal(false)
      }
    )
  }

  const modal_addTimeline = () => {
    return (
      <Modal
        closable={false}
        className={'timeline-modal'}
        visible={addTLModal}
        onCancel={cancelModal}
        onOk={onOkModal}
        okText={'提交'}
        cancelText={'取消'}
      >
        <span className={'timeline-addContent'}>
          跟进内容: 
          <Input
            value={tlRemark}
            onChange={changeInputValue}
            placeholder={'请填写时间轴中显示的内容'}
          />
        </span>
      </Modal>
    )
  }

  return (
    <div className={'container_child'}>
      <div className={'process-time'}>
        <p>首次跟进时间: {firstFollowUp.map((item) => {
          return item.fTime
        })}</p>

        <p>最后一次跟进时间: {lastFollowUp.map((item) => {
          return item.lTime
        })}</p>
      </div>

      <Button
        className={'addTimeline'}
        type={'primary'}
        onClick={addTimeLine}
      >添加跟进</Button>

      <div className={'timeline_main'}>

        <Timeline
          reverse
          mode="left"
        >
          {
            timeLine.map((item, index) => {
              return (
                <Timeline.Item

                  key={index}
                >
                  <>
                    <p>{item.time}</p>
                    <p>{item.event}</p>
                  </>
                </Timeline.Item>
              )
            })
          }
        </Timeline>
      </div>

      {modal_addTimeline()}

    </div>
  )

}

export default ClientProcess;
