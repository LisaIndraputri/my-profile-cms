import React, {useEffect, useState} from 'react'
import { Table, Card } from 'antd';
import { request } from '../utils/request'
import { toast } from 'react-toastify';
import moment from 'moment'
import {
  API_GET_REFERENCE
} from '../constants/apis'

function Home() {
  useEffect(() => {
    fetchList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const [datas, setDatas] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <div>{moment(text).format('DD MM YYYY - HH:mm')}</div>,
    }
  ];
  const fetchList = async () => {
    setIsLoading(true)
    const response = await request(API_GET_REFERENCE)
    if (response.success) {
      response.data.map(item => {
        return item.key = item._id
      })
      setDatas(response.data)
    } else {
      toast.error('Failed to Fetch!')
    }
    setIsLoading(false)
  }
  return (
    <div>
      <Card title="Reference List" style={{ width: '100%' }}>
        <Table columns={columns} dataSource={datas} loading={isLoading}/>
      </Card>
    </div>
  )
}

export default Home