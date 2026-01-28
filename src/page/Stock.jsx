import { Button, Form, Input, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';

const Stock = () => {
  const [data, setData] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

    const columns = [
      {
        title: 'No',
        dataIndex: '',
        key: 'no',
      },
      {
        title: 'Name Product',
        render: (data) => <p>{data.products?.name_product}</p>,
        key: 'nameStock',
      },
      {
        title:'QTY',
        dataIndex: 'qty',
        key: 'Stock', 
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'StatusProduct',
        render: (data) => <p>{ data ? "In" : "Out" }</p>,
      },
      {
        title: 'Action',
        dataIndex: '',
        width:250,
        key: 'Action',
        render: (data) => (
          <div className='flex items-center gap-3'>
            <Button>Edit</Button>
            <Button onClick={() => handleDeleted(data.id)} >Deleted</Button>
          </div>
        )
      },
    ];

    const fetchData = async () => {
      
      const {data, error} = await supabase.from('history_products').select(`
          id,
          qty,
          type,
          products (
            name_product
          ),
          created_at,
          updated_at
        `).order("created_at", { ascending : false });

        if(error) return console.error(error.message);

        setData(data)

    };

    const handleDeleted = async (id) => {

      if(!confirm('are yout sure deleted this data??')) return;

      const { error } = await supabase.from('history_products').delete().eq('id', id);
      if(error) return console.error(error.message);

      fetchData();
      
    };

    const fetchProduct = async () => {
      const { data, error } = await supabase.from('products').select('*');
      console.log('ini product: ', data);

      if(error) return console.error(error.message);

      setDataProduct(data);
    };

    useEffect(() => {
      fetchData();
      fetchProduct();
    }, []);

  return (
    <div>
        <div className='flex items-center justify-between mb-5' >
            <h1 className='text-lg text-gray-700 font-semibold' >
              Stock History Product
            </h1>
            <Button onClick={() => setIsOpen(true)} variant='outlined' color='primary' >
              Create Stock Product
            </Button>
        </div>

        <Table 
          dataSource={data}
          columns={columns} 
        />

        <Modal
          open={isOpen}
          onCancel={() => setIsOpen(false)}
        >
          <Form
            layout='vertical'
          >
            <Form.Item
              label='Name Product'
              name={'product_id'}
            >
              <Select
                placeholder='select the product'
              >
                {
                  dataProduct.map((data) => (
                    <Select.Option 
                      key={data.id}
                      value={data.id}
                    > 
                      {data.name_product} 
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>

            <Form.Item
              label='QTY'
            >
              <Input placeholder='enter the stock emount' />
            </Form.Item>

            <Form.Item
              label='Type Stock Product'
            >
              <Select
                placeholder='select Type Stock'
              >
                <Select.Option > In </Select.Option>
                <Select.Option> Out </Select.Option>
              </Select>
            </Form.Item>
            
          </Form>
        </Modal>
    </div>
  )
}

export default Stock