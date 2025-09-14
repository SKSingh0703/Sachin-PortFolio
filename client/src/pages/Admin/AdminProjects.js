import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, message, Modal } from 'antd'
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
import API_URL from "../../config";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector(state => state.root);
  const { projects } = portfolioData;
    const [showAddEditModal , setShowAddEditModal] = React.useState(false);
    const[selectedItemForEdit , setSelectedItemForEdit ] = React.useState(null);
    const[type, setType] = React.useState("add");
    const instance = axios.create({
        baseURL: API_URL, // Your backend URL
    });

   const onFinish = async (values) =>{
    try {
        console.log("Form values received:", values);
        
        // Validate required fields
        if (!values.title || !values.description || !values.image || !values.link) {
            message.error("Please fill in all required fields");
            return;
        }

        // Process technologies properly
        let technologies = [];
        if (values.technologies) {
            if (typeof values.technologies === 'string') {
                technologies = values.technologies.split(",").map(tech => tech.trim()).filter(tech => tech);
            } else if (Array.isArray(values.technologies)) {
                technologies = values.technologies.filter(tech => tech && tech.trim());
            }
        }
        
        const processedValues = {
            ...values,
            technologies: technologies
        };
        
        console.log("Processed values:", processedValues);
        
        dispatch(ShowLoading())
        let response
        if(selectedItemForEdit){
            console.log("Updating project:", { ...processedValues, _id: selectedItemForEdit._id });
            response = await instance.post("/update-project",{
                ...processedValues,
                _id:selectedItemForEdit._id,
            });
        }
        else {
            console.log("Adding project:", processedValues);
            response = await instance.post("/add-project", processedValues);
        }
        console.log("API Response:", response.data);
        
        if (response.data.success) {
          message.success(response.data.message);
          setShowAddEditModal(false);
          setSelectedItemForEdit(null);
          setType("add");
          // Force reload data and clear cache
          dispatch(ReloadData(true));
        }
        else{
          message.error(response.data.message)
        }
      } catch (error) {
        console.error("Project operation error:", error);
        console.error("Error response:", error.response?.data);
        message.error(error.response?.data?.message || error.message || "An error occurred")
      } finally {
        dispatch(HideLoading());
      }
};

const onDelete = async (item)=>{
    try {
        if (!item._id) {
            message.error("Project ID not found");
            return;
        }

        // Add confirmation dialog
        Modal.confirm({
            title: 'Are you sure you want to delete this project?',
            content: `This will permanently delete "${item.title}"`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    dispatch(ShowLoading());
                    const response = await instance.post("/delete-project",{
                        _id: item._id,
                    });
                    
                    if (response.data.success) {
                        message.success(response.data.message);
                        dispatch(ReloadData(true));
                    }
                    else{
                        message.error(response.data.message);
                    }
                } catch (error) {
                    console.error("Delete error:", error);
                    message.error(error.response?.data?.message || error.message || "Failed to delete project");
                } finally {
                    dispatch(HideLoading());
                }
            }
        });
    } catch (error) {
        console.error("Delete confirmation error:", error);
        message.error("An error occurred");
    }
};
  return (
    <div className="space-y-6">
        <div className='flex justify-end' >
            <button className='btn-primary' onClick={()=>{
                setSelectedItemForEdit(null);
                setType("add");
                setShowAddEditModal(true);
            }}> 
                Add Project
            </button>
        </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map((project, index) => (
          <div key={index} className='bg-white dark:bg-gray-50 shadow-lg border border-gray-200 dark:border-gray-300 p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105' >
            <h1 className='text-primary dark:text-primary-light text-xl font-bold mb-4' >{project.title}</h1>
            <div className="mb-4">
              <img src={project.image} alt={project.title} className='w-full h-48 object-cover rounded-lg' />
            </div>
            <div className="space-y-2 mb-4">
              <h2 className="text-gray-700 dark:text-gray-800"><span className="font-semibold">Role:</span> {project.title}</h2>
              <p className='text-gray-600 dark:text-gray-700 text-sm'> <span className="font-semibold">Description:</span> {project.description}</p>
            </div>
            <div className='flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-300'>
              <button className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium' type='submit'
              onClick={()=>{
                  onDelete(project);
              }
              } >Delete</button>
              <button className='px-4 py-2 bg-tertiary dark:bg-tertiary-light hover:bg-tertiary-light dark:hover:bg-tertiary text-white dark:text-white rounded-lg transition-colors duration-200 text-sm font-medium' type='submit' onClick={()=>{
                  setSelectedItemForEdit(project);
                  setShowAddEditModal(true);
                  setType("edit");
              }} >Edit</button>
            </div>
          </div>
        ))}
      </div>

        {showAddEditModal && (
      <Modal 
        visible={showAddEditModal}
        title={<span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{selectedItemForEdit ? "Edit Project" : "Add Project"}</span>}
        footer={null}
        onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
        }}
        className="admin-modal"
        width={600}
      >
        <Form 
            layout='vertical' 
            onFinish={onFinish}
            initialValues={{
                ...selectedItemForEdit,
                technologies: selectedItemForEdit?.technologies ? 
                    (Array.isArray(selectedItemForEdit.technologies) ? 
                        selectedItemForEdit.technologies.join(", ") : 
                        selectedItemForEdit.technologies) : 
                    ""
            }}
            className="space-y-4"
            key={selectedItemForEdit?._id || 'new'}
        >
            <Form.Item 
                name='title' 
                label={<span className="text-gray-700 dark:text-gray-300 font-medium">Title</span>}
                rules={[{ required: true, message: 'Please enter project title' }]}
            >
                <input 
                  placeholder='Project title' 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
            </Form.Item>
            <Form.Item 
                name='image' 
                label={<span className="text-gray-700 dark:text-gray-300 font-medium">Image URL</span>}
                rules={[
                    { required: true, message: 'Please enter image URL' },
                    { type: 'url', message: 'Please enter a valid URL' }
                ]}
            >
                <input 
                  placeholder='https://example.com/image.jpg' 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
            </Form.Item>
            <Form.Item 
                name='description' 
                label={<span className="text-gray-700 dark:text-gray-300 font-medium">Description</span>}
                rules={[{ required: true, message: 'Please enter project description' }]}
            >
                <textarea 
                  placeholder='Project description' 
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                />
            </Form.Item>
            <Form.Item 
                name='link' 
                label={<span className="text-gray-700 dark:text-gray-300 font-medium">Project Link</span>}
                rules={[
                    { required: true, message: 'Please enter project URL' },
                    { type: 'url', message: 'Please enter a valid URL' }
                ]}
            >
                <input 
                  placeholder='https://example.com' 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
            </Form.Item>
            <Form.Item name='technologies' label={<span className="text-gray-700 dark:text-gray-300 font-medium">Technologies (comma-separated)</span>}>
                <input 
                  placeholder='React, Node.js, MongoDB' 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                     {selectedItemForEdit ? "Update Project" : "Add Project"}
                </button>
            </div>
        </Form>
      </Modal>
        )}
    </div>
  );
}

export default AdminProjects;