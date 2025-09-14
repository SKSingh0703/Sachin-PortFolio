import React from 'react'
import { Form, message  } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { ShowLoading,HideLoading } from "../../redux/rootSlice"
import axios from 'axios'
import API_URL from '../../config';
function AdminAbout() {

  const {portfolioData } = useSelector(state => state.root);
  const dispatch = useDispatch();
  const instance = axios.create({
    baseURL: API_URL, 
  });
  const onFinish= async (values)=>{
    try {
      const tempSkills = values.skills.split(",");
      values.skills=tempSkills;
      dispatch(ShowLoading())
      const response = await instance.post("/update-about",{
        ...values,
        _id:portfolioData.about._id,
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
      <Form onFinish={onFinish} layout='vertical' initialValues={{...portfolioData.about,
        skills:portfolioData.about.skills.join(" , ")
      }} className="space-y-6">
        <Form.Item name="lottieURL" label={<span className="text-gray-700 dark:text-gray-800 font-medium">Lottie URL</span>}>
          <input 
            placeholder='Enter Lottie animation URL' 
            className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800"
          />
        </Form.Item>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item name="description1" label={<span className="text-gray-700 dark:text-gray-800 font-medium">Description 1</span>}>
            <textarea 
              placeholder='First description paragraph' 
              rows={4}
              className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800 resize-none"
            />
          </Form.Item>
          <Form.Item name="description2" label={<span className="text-gray-700 dark:text-gray-800 font-medium">Description 2</span>}>
            <textarea 
              placeholder='Second description paragraph' 
              rows={4}
              className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800 resize-none"
            />
          </Form.Item>
        </div>
        
        <Form.Item name="skills" label={<span className="text-gray-700 dark:text-gray-800 font-medium">Skills (comma-separated)</span>}>
          <textarea 
            placeholder='Enter skills separated by commas (e.g., React, Node.js, MongoDB)' 
            rows={3}
            className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800 resize-none"
          />
        </Form.Item>
        
        <div className='flex justify-end w-full pt-4 border-t border-gray-200 dark:border-gray-300'> 
          <button className='btn-primary' type='submit'>Save Changes</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminAbout