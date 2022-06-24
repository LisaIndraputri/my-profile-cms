import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input, Upload, message, Select, Radio } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { projectQuery } from '../../features/projectList/projectListSlice';
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  API_CREATE_PROJECT,
  API_UPDATE_PROJECT
} from '../../constants/apis'
import {
  request
} from '../../utils/request'

function ModalAddProjectList({isEdit = false, data = {}}) {
  const { TextArea } = Input;
  const {projectCategory} = useSelector(state => state.project)
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);
  const [desc, setDesc] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const dispatch = useDispatch()

  const { Option } = Select;

  useEffect(()=> {
    form.setFieldsValue({
      name: data.name || '',
      description: data.description || '',
      category: data.category,
      urlLink: data.urlLink
    });
    setImageUrl(data.projectImg || '')
    setDesc(data.description || '')
  }, [form, data])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsLoading(true)
    const {name, category, background_image, urlLink} = form.getFieldsValue()
    const params = {
      name,
      description: desc,
      projectImg: value === 1 ? imageUrl : background_image,
      category,
      urlLink
    }
    let API_PROJECT = API_CREATE_PROJECT
    if (isEdit) {
      params.id = data._id
      API_PROJECT = API_UPDATE_PROJECT
    }
    const response = await request(API_PROJECT, params, 'POST')
    if (response.success) {
      await dispatch(projectQuery())
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
  const onChange = (value) => {
  };

  const onChangeRadio = (e) => {
    setValue(e.target.value);
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
            name="urlLink"
            label="URL Link"
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
            <CKEditor 
              editor={ Editor }
              data={desc}
              onReady={editor => {
                console.log('editor is ready to use', editor)
              }}
              onChange={(event, editor) => {
                const data = editor.getData()
                setDesc(data)
              }}
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a category"
              onChange={onChange}
            >
              {
                projectCategory.map(itm => <Option value={itm.slug} key={itm.slug}>{itm.name}</Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <Radio.Group onChange={onChangeRadio} value={value}>
              <Radio value={1}>Image</Radio>
              <Radio value={2}>GIF</Radio>
            </Radio.Group>
          </Form.Item>
          {
            value === 1 ? 
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
              </Form.Item> : 
              <Form.Item
                name="background_image"
                label="Background Image"
              >
                <TextArea rows={4} />
              </Form.Item>            
          }
        </Form>
      </Modal>
    </>
  )
}

ModalAddProjectList.propTypes = {
  isEdit: PropTypes.bool,
  data: PropTypes.object,
}

export default ModalAddProjectList
