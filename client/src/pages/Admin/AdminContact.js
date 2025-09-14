import React from 'react'
import { Form, message  } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { ShowLoading,HideLoading } from "../../redux/rootSlice"
import axios from 'axios'
import API_URL from '../../config';
function AdminContact() {

  const {portfolioData } = useSelector(state => state.root);
  const dispatch = useDispatch();
  const instance = axios.create({
    baseURL: API_URL,
  });
  const onFinish= async (values)=>{
    try {
      dispatch(ShowLoading())
      const response = await instance.post("/update-contact",{
        ...values,
        _id:portfolioData.contact._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message)
      }
      else{
        message.error(response.data.message)
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message)
    }
  };

  return (
    <div className="bg-white dark:bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-300 transition-colors duration-300">
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.contact} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item name="name" label={<span className="text-gray-700 dark:text-gray-800 font-medium">Name</span>}>
            <input 
              placeholder='Your full name' 
              className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800"
            />
          </Form.Item>
          <Form.Item name="gender" label={<span className="text-gray-700 dark:text-gray-800 font-medium">Gender</span>}>
            <input 
              placeholder='Gender' 
              className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800"
            />
          </Form.Item>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item name="email" label={<span className="text-gray-700 dark:text-gray-800 font-medium">Email</span>}>
            <input 
              type="email"
              placeholder='your.email@example.com' 
              className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800"
            />
          </Form.Item>
          <Form.Item name="address" label={<span className="text-gray-700 dark:text-gray-800 font-medium">Address</span>}>
            <input 
              placeholder='Your address' 
              className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800"
            />
          </Form.Item>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Form.Item name="github" label={<span className="text-gray-700 dark:text-gray-800 font-medium">GitHub URL</span>}>
            <input 
              type="url"
              placeholder='https://github.com/username' 
              className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800"
            />
          </Form.Item>
          <Form.Item name="linkedin" label={<span className="text-gray-700 dark:text-gray-800 font-medium">LinkedIn URL</span>}>
            <input 
              type="url"
              placeholder='https://linkedin.com/in/username' 
              className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800"
            />
          </Form.Item>
          <Form.Item name="instagram" label={<span className="text-gray-700 dark:text-gray-800 font-medium">Instagram URL</span>}>
            <input 
              type="url"
              placeholder='https://instagram.com/username' 
              className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800"
            />
          </Form.Item>
        </div>
        
        <div className='flex justify-end w-full pt-4 border-t border-gray-200 dark:border-gray-300'> 
          <button className='btn-primary' type='submit'>Save Changes</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminContact