import React, {useEffect, useState} from 'react'
import { Table, Card } from 'antd';
import { useSelector } from 'react-redux';
import axios from "axios"
import { toast } from 'react-toastify';
import moment from 'moment'

function Home() {
  useEffect(() => {
    fetchList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const {user} = useSelector(state => state.auth)
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
    const API_GET_REFERENCE = `${process.env.REACT_APP_BASE_URL}/api/references/query`
    const response = await axios.get(API_GET_REFERENCE, {
      headers: {
        'Authorization': `Bearer ${user && user.token}`,
        'Content-Type': 'application/json',
      }
    })
    if (response.data && response.data.success) {
      response.data.data.map(item => {
        return item.key = item._id
      })
      setDatas(response.data.data)
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