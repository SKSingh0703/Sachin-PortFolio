import React,{useEffect} from 'react'
import Header from '../../components/Header'
import { Tabs } from 'antd';
import Adminintro from './Adminintro';
import AdminAbout from './AdminAbout';

import { useSelector } from 'react-redux'
import Experiences from './AdminExperiences';
import AdminProjects from './AdminProjects';
import AdminContact from './AdminContact';

import API_URL from '../../config'

const { TabPane } = Tabs;
function Admin() {
    const {portfolioData } = useSelector(state => state.root);

    useEffect(() =>{
        if (!localStorage.getItem("token")) {
            window.location.href = `/admin-login`;
        }
    },[]);

  return (
    <div>
        <Header />
        <div className='flex gap-10 items-center px-5 py-3 justify-between'>
            <div className='flex gap-10 items-center'>
              <h1 className='text-3xl text-Primary font-semibold'>
                  Portfolio Admin
              </h1>
              <h1 className='undeline text-primary text-xl cursor-pointer' 
               onClick={()=>{
                 localStorage.removeItem("token");
                 window.location.href = "/admin-login";
               }}
              >Logout</h1>
             </div>
        <div className='w-60 h-[1px] bg-gray-500'>

        </div>
    </div>
        {portfolioData && 
        <div className='mt-5 px-5 pb-10'>
            <Tabs defaultActiveKey='1'  >
                <TabPane tab="Intro" key="1">
                    <Adminintro />
                </TabPane>

                <TabPane tab="About" key="2">
                    <AdminAbout />
                </TabPane>

                <TabPane tab="Experiences" key="3">
                    <Experiences />
                </TabPane>

                <TabPane tab="Projects" key="4">
                    <AdminProjects />
                </TabPane>

                <TabPane tab="Contact" key="5">
                    <AdminContact />
                </TabPane>
            </Tabs>
        </div>
        }
    </div>
  )
}

export default Admin
