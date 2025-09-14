import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, message, Modal } from 'antd'
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
import API_URL from "../../config";

function Experiences() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector(state => state.root);
  const { experiences } = portfolioData;
    const [showAddEditModal , setShowAddEditModal] = React.useState(false);
    const[selectedItemForEdit , setSelectedItemForEdit ] = React.useState(null);
    const[type = "add" , setType] = React.useState("add");
    const instance = axios.create({
        baseURL: API_URL, // Your backend URL
    });

   const onFinish = async (values) =>{
    try {
        dispatch(ShowLoading())
        let response
        if(selectedItemForEdit){
            response = await instance.post("/update-experience",{
                ...values,
                _id:selectedItemForEdit._id,
            });
        }
        else {
            response = await instance.post("/add-experience",values);
        }
        dispatch(HideLoading());
        if (response.data.success) {
          message.success(response.data.message);
          setShowAddEditModal(false);
          setSelectedItemForEdit(null);
          dispatch(HideLoading());
          dispatch(ReloadData(true));
        }
        else{
          message.error(response.data.message)
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message)
      }
};

const onDelete = async (item)=>{
    try {
        dispatch(ShowLoading());
        const response = await instance.post("/delete-experience",{
            _id: item._id,
        });
        
        dispatch(HideLoading());
        if (response.data.success) {
            message.success(response.data.message);
            dispatch(HideLoading());
            dispatch(ReloadData(true));
        }
        else{
            message.error(response.data.message);
        }
    } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
    }
};
  return (
    <div className="space-y-6">
        <div className='flex justify-end' >
            <button className='btn-primary' onClick={()=>{
                setSelectedItemForEdit(null);
                setShowAddEditModal(true);
            }}> 
                Add Experience
            </button>
        </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {experiences.map((experience, index) => (
          <div key={index} className='bg-white dark:bg-gray-50 shadow-lg border border-gray-200 dark:border-gray-300 p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105' >
            <h1 className='text-primary dark:text-primary-light text-xl font-bold mb-4' >{experience.period}</h1>
            <div className="space-y-3 mb-4">
              <h2 className="text-gray-700 dark:text-gray-800"><span className="font-semibold">Company:</span> {experience.company}</h2>
              <h2 className="text-gray-700 dark:text-gray-800"><span className="font-semibold">Role:</span> {experience.title}</h2>
              <p className='text-gray-600 dark:text-gray-700 text-sm'> <span className="font-semibold">Description:</span> {experience.description}</p>
            </div>
            <div className='flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-300'>
              <button className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium' type='submit'
              onClick={()=>{
                  onDelete(experience);
              }
              } >Delete</button>
              <button className='px-4 py-2 bg-tertiary dark:bg-tertiary-light hover:bg-tertiary-light dark:hover:bg-tertiary text-white dark:text-white rounded-lg transition-colors duration-200 text-sm font-medium' type='submit' onClick={()=>{
                  setSelectedItemForEdit(experience);
                  setShowAddEditModal(true);
                  setType("edit");
              }} >Edit</button>
            </div>
          </div>
        ))}
      </div>

        {
            (type==="add" ||selectedItemForEdit) &&
        
      <Modal 
        visible={showAddEditModal}
        title={<span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{selectedItemForEdit ? "Edit Experience" : "Add Experience"}</span>}
        footer={null}
        onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
        }}
        className="admin-modal"
        width={600}
      >
        <Form layout='vertical' onFinish={onFinish}
            initialValues={selectedItemForEdit}
            className="space-y-4"
        >
            <Form.Item name='period' label={<span className="text-gray-700 dark:text-gray-300 font-medium">Period</span>}>
                <input 
                  placeholder='e.g., Jan 2023 - Dec 2023' 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
            </Form.Item>
            <Form.Item name='company' label={<span className="text-gray-700 dark:text-gray-300 font-medium">Company</span>}>
                <input 
                  placeholder='Company name' 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
            </Form.Item>
            <Form.Item name='title' label={<span className="text-gray-700 dark:text-gray-300 font-medium">Job Title</span>}>
                <input 
                  placeholder='Your job title' 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
            </Form.Item>
            <Form.Item name='description' label={<span className="text-gray-700 dark:text-gray-300 font-medium">Description</span>}>
                <textarea 
                  placeholder='Describe your role and responsibilities' 
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                />
            </Form.Item>

            <div className='flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600'>
                <button 
                  className='btn-secondary' 
                  onClick={()=>{
                    setShowAddEditModal(false);
                    setSelectedItemForEdit(null);
                  }} 
                >
                    Cancel
                </button>
                <button className='btn-primary' type="submit">
                     {selectedItemForEdit ? "Update Experience" : "Add Experience"}
                </button>
            </div>
        </Form>
      </Modal>
        }
    </div>
  );
}

export default Experiences;
