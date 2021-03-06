import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { projectCategoryQuery } from '../../features/project/projectSlice';
import {
  API_CREATE_PROJECT_CATEGORY,
  API_UPDATE_PROJECT_CATEGORY
} from '../../constants/apis'
import { request } from '../../utils/request'

function ModalAddProjectCategory({isEdit = false, data = {}}) {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const dispatch = useDispatch()

  useEffect(()=> {
    form.setFieldsValue({
      name: data.name || '',
      description: data.description || '',
    });
    setImageUrl(data.projectImg || '')
  }, [form, data])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsLoading(true)
    const {name, description} = form.getFieldsValue()
    const params = {
      name,
      description,
      projectImg: imageUrl
    }
    let API_PROJECT = API_CREATE_PROJECT_CATEGORY
    if (isEdit) {
      params.id = data._id
      API_PROJECT = API_UPDATE_PROJECT_CATEGORY
    }
    const response = await request(API_PROJECT, params, 'POST')
    if (response.success) {
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
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
  
    const isLt2M = file.size / 1024 / 1024 < 2;
  
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
  
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingImg(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoadingImg(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
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
          <Form.Item
            name="background_image"
            label="Background Image"
          >
            <Upload
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/31402637-7225-4f56-8e34-b7907c556bae"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="project-category" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
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
