import { HomeOutlined, ProductFilled, StockOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [toogle, setTogle] = useState(false);

    const items = [
        {
            key: '/',
            icon: <HomeOutlined/>,
            label: "Home"
        },
        {
            key: '/product',
            icon: <ProductFilled/>,
            label: "Product"
        },
        {
            key: '/history-stock',
            icon: <StockOutlined/>,
            label: "History Stock"
        },
        {
            key: '/profile',
            icon: <UserOutlined/>,
            label: "Profile"
        },
    ];

  return (
    <div className={`${toogle ? 'w-[80px]' : 'w-[200px]'} transition-all duration-500 h-full flex flex-col items-center py-5 bg-[#001529]`} >
        <h1 onClick={() => setTogle(!toogle)} className='text-xl font-bold text-shadow-md text-white mb-5' >
            { toogle ? "GT" : "Ghania Toko"}
        </h1>

        <Menu
            items={items}
            mode='inline'
            className='w-full p-2!'
            theme='dark'
            defaultSelectedKeys={'/'}
            onClick={({ key }) => navigate(key)}
            selectedKeys={[location.pathname]}
            inlineCollapsed={toogle}
        />
    </div>
  ) 
}

export default Sidebar