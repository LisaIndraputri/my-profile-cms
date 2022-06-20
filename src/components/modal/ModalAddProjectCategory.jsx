import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input } from 'antd';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { projectCategoryQuery } from '../../features/project/projectSlice';

function ModalAddProjectCategory({isEdit = false, data = {}}) {
  const {user} = useSelector(state => state.auth)
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()

  useEffect(()=> {
    form.setFieldsValue({
      name: data.name || '',
      description: data.description || ''
    });
  }, [form, data])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsLoading(true)
    const {name, description} = form.getFieldsValue()
    const params = {
      name,
      description
    }
    let API_PROJECT = `${process.env.REACT_APP_BASE_URL}/api/project-category/create`
    if (isEdit) {
      params.id = data._id
      API_PROJECT = `${process.env.REACT_APP_BASE_URL}/api/project-category/update`
    }
    const response = await axios.post(API_PROJECT, params, {
      headers: {
        'Authorization': `Bearer ${user && user.token}`,
        'Content-Type': 'application/json',
      }
    })
    if (response.data && response.data.success) {
      await dispatch(projectCategoryQuery())
      setIsModalVisible(false);
    } else {
      toast.error('Failed to Save!')
    }
    setIsLoading(false)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button className='btn-custom btn' type="primary" onClick={showModal}>
        {isEdit ? 'EDIT' : 'ADD'}
      </Button>
      <Modal 
        forceRender
        title="Add Project Category" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button 
            key="back" 
            onClick={handleCancel}
            >
            RETURN
          </Button>,
          <Button
            key="submit"
            className='btn-custom btn'
            type="primary"
            onClick={handleOk}
            htmlType="submit"
            loading={isLoading}
          >
            {isEdit ? 'EDIT' : 'ADD'}
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

ModalAddProjectCategory.propTypes = {
  isEdit: PropTypes.bool,
  data: PropTypes.object,
}

export default ModalAddProjectCategory
