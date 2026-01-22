import { Button, Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Product = () => {
  const [ data, setdata ] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'No',
      dataIndex: '',
      key: 'no',
      render: (_, __, index) => <p>{index + 1}</p>
    },
    {
      title: 'Name Product',
      dataIndex: 'name_product',
      key: 'name_product',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Status Product',
      dataIndex: 'status_product',
      key: 'status_product',
      render: (status) => <p>{status ? "Tersedia" : "Belum Tersedia"}</p>
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      width: 100,
      render: (data) => (
        <div className='flex items-center gap-3' >
          <Button type='primary' >
            <EditOutlined />
          </Button>
          <Button 
            danger 
            type='primary' 
            onClick={() => handleDeleted(data.id)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      )
    },
  ];

  const fetchData = async ()  =>  {
    const { data, error } = await supabase.from('products').select('*');

    if(error) {
      console.error(error.message);
    } else {
      setdata(data)
    }
  };

  const handleDeleted = async (id) => {
    if(!confirm('are you sure, delet this product?? ')) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);

    if(error) {
      console.error(error.message);
    } else {
      fetchData();
      alert('delete product succesfully');
    }
  };

  const handleSubmit = async (values) => {
    const payload = {
      name_product: values.nameProduct,
      stock: values.stockProduct,
      price: values.priceProduct,
      status_product: values.statusProduct,
    }

    const { error } = await supabase.from('products').insert(payload);

    if(error) return console.error(error.message);

    fetchData();
    setIsOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='w-full h-full' >
      <div className='flex items-center justify-between mb-5' >
        <h1 className='text-lg text-gray-700 font-semibold' >
          Product Table
        </h1>
        <Button onClick={() => setIsOpen(true)} variant='outlined' color='primary' >
          Create Product
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
      />
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => form.submit()}
        okText="submit"
      >
        <Form 
          form={form}
          onFinish={handleSubmit}
          layout='vertical'
        >
          {/* input name product */}
          <Form.Item
            label="Name Product"
            name={'nameProduct'}
            rules={[{
              required: true,
              message: "input name product can not be empity"
            }]}
          >
            <Input placeholder='input name product' />
          </Form.Item>

          {/* input price product */}
          <Form.Item
            label="Price Product"
            name={'priceProduct'}
            rules={[{
              required: true,
              message: "input price product can not be empity"
            }]}
          >
            <InputNumber style={{ width: '100%'}} placeholder='input price product' />
          </Form.Item>

           {/* input stock product */}
           <Form.Item
            label="Stock Product"
            name={'stockProduct'}
            rules={[{
              required: true,
              message: "input stock product can not be empity"
            }]}
          >
            <InputNumber style={{ width: '100%'}} placeholder='input stock product' />
          </Form.Item>

          {/* input stock product */}
          <Form.Item
            label="Status Product"
            name={'statusProduct'}
            rules={[{
              required: true,
              message: "select status product can not be empity"
            }]}
          >
            <Select
              placeholder='select status product'
            >
              <Select.Option
                value={true}
              >
                avaliable
              </Select.Option>
              <Select.Option
                value={false}
              >
                Not avaliable
              </Select.Option>
            </Select>
          </Form.Item> 
        </Form>
      </Modal>
    </div>
  )
}

export default Product