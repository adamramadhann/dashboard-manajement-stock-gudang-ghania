import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';

const Product = () => {
  const [ data, setdata ] = useState([])
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
  ];

  const fetchData = async ()  =>  {
    const { data, error } = await supabase.from('products').select('*');

    if(error) {
      console.error(error.message);
    } else {
      setdata(data)
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
      />
    </div>
  )
}

export default Product