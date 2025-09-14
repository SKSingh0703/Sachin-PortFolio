import React from 'react'
import { Form, message  } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { ShowLoading,HideLoading } from "../../redux/rootSlice"
import axios from 'axios'
import API_URL from '../../config';
function Adminintro() {

  const {portfolioData } = useSelector(state => state.root);
  const dispatch = useDispatch();
  const instance = axios.create({
    baseURL: API_URL, // Your backend URL
  });
  const onFinish= async (values)=>{
    try {
      dispatch(ShowLoading())
      const response = await instance.post("/update-intro",{
        ...values,
        _id:portfolioData.intro._id,
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
    <div className="admin-form-container transition-colors duration-300">
      <div className="admin-form-section">
        <h2 className="admin-form-title">Personal Information</h2>
        <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.intro} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item name="welcomeText" label={<span className="text-gray-700 dark:text-gray-300 font-medium">Welcome Text</span>}>
            <input 
              placeholder='Welcome Text' 
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </Form.Item>
          <Form.Item name="firstName" label={<span className="text-gray-700 dark:text-gray-300 font-medium">First Name</span>}>
            <input 
              placeholder='First Name' 
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </Form.Item>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item name="lastName" label={<span className="text-gray-700 dark:text-gray-300 font-medium">Last Name</span>}>
            <input 
              placeholder='Last Name' 
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </Form.Item>
          <Form.Item name="caption" label={<span className="text-gray-700 dark:text-gray-300 font-medium">Caption</span>}>
            <input 
              placeholder='Caption' 
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </Form.Item>
        </div>
        
        <Form.Item name="description" label={<span className="text-gray-700 dark:text-gray-300 font-medium">Description</span>}>
          <textarea 
            placeholder='Description' 
            rows={4}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
          />
        </Form.Item>
        
        <div className='flex justify-end w-full pt-6 border-t border-gray-200 dark:border-gray-600'> 
          <button className='admin-btn-primary' type='submit'>
            <i className="ri-save-line mr-2"></i>
            Save Changes
          </button>
        </div>
        </Form>
      </div>
    </div>
  )
}

export default Adminintro
