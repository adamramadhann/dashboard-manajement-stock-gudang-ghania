import { Button, Table } from 'antd';
import React from 'react'

const Stock = () => {
    const columns = [
        {
          title: 'No',
          dataIndex: '',
          key: 'no',
        },
        {
          title: 'Name Product',
          dataIndex: 'name_product',
          key: 'nameStock',
        },
        {
          title: 'Stock Stock',
          dataIndex: 'stock_product',
          key: 'Stock',
        },
        {
          title: 'Status Product',
          dataIndex: 'status_product',
          key: 'StatusProduct',
        },
        {
          title: 'Action',
          dataIndex: '',
          key: 'Action',
        },
      ];

    const data = [
        {
            name_product: "Momogi",
            stock_product: 10,
            status_product: "Out"
        }
    ];
  return (
    <div>
         <div className='flex items-center justify-between mb-5' >
            <h1 className='text-lg text-gray-700 font-semibold' >
            Stock History Product
            </h1>
            <Button variant='outlined' color='primary' >
            Create Stock Product
            </Button>
        </div>
        <Table 
            dataSource={data}
            columns={columns} 
        />
    </div>
  )
}

export default Stock