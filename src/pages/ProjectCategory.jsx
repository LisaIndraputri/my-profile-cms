/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import { MenuOutlined } from '@ant-design/icons';
import { Button, Card, Space, Table } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import '../styles/Common.scss';
import '../styles/Project.scss';
import {request} from '../utils/request'
import ModalAddProjectCategory from '../components/modal/ModalAddProjectCategory';
import { projectCategoryQuery } from '../features/project/projectSlice';
import {
  API_URL_UPDATE_SORT
} from '../constants/apis'

function ProjectCategory() {
  const {projectCategory, isSuccess, isError, message} = useSelector(state => state.project)
  const [datas, setDatas] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    fetchList()
  }, [])
  useEffect(() => {
    setDatas(projectCategory)
  }, [projectCategory])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success('Success!')
    }
  }, [isError, isSuccess, message])

  const fetchList = async () => {
    setIsLoading(true)
    await dispatch(projectCategoryQuery())
    setIsLoading(false)
  }
  const updateSort = async () => {
    setIsLoading(true)
    const res = await request(API_URL_UPDATE_SORT,{
      list: datas
    }, 'POST')
    if (res.success) {
      await dispatch(projectCategoryQuery())
    } else {
      toast.error('Failed to Update!')
    }
    setIsLoading(false)
  }
  const DragHandle = SortableHandle(() => (
    <MenuOutlined
      style={{
        cursor: 'grab',
        color: '#999',
      }}
    />
  ));
  const columns = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      key: 'image',
      render: (_, record) => (
        <div style={{backgroundImage: `url('${record.projectImg}')`, height: '65px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <ModalAddProjectCategory 
            isEdit={true}
            data={record}
          />
          <Button type="primary" danger className='btn-custom btn'>
            DELETE
          </Button>
        </Space>
      ),
    },
  ];
  const SortableItem = SortableElement((props) => <tr {...props} />);
  const SortableBody = SortableContainer((props) => <tbody {...props} />);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(datas.slice(), oldIndex, newIndex).filter(
        (el) => !!el,
      );
      setDatas(newData);
    }
  };

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = datas.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  return (
    <Card className="project-category" title="Project Category" style={{ width: '100%' }}>
      <div className='btn-section'>
        <ModalAddProjectCategory />
      </div>
      <div className='table-section'>
        <Table
          columns={columns}
          dataSource={datas}
          pagination={false}
          rowKey="index"
          loading={isLoading}
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow,
            },
          }}
        />
      </div>
      <div className='btn-section'>
        <Button type="primary" className='btn-custom btn' onClick={updateSort}>
          SAVE
        </Button>
      </div>
    </Card>
  )
}

export default ProjectCategory