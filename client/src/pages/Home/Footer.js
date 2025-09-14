import React from 'react'
import { useSelector } from 'react-redux';

function Footer() {
    const { theme } = useSelector(state => state.root);
    
    return (
        <div className='py-10'>
            <div className='h-[1px] w-full bg-gray-700 dark:bg-gray-300'></div>

            <div>
                <div className='flex items-center justify-center flex-col mt-10 opacity-70' >
                    <h1 className='text-white dark:text-gray-800'>
                        Designed and Developed By
                    </h1>

                    <h1 className='text-white dark:text-gray-800'>
                        <span className='text-white dark:text-gray-800'>Sachin Kumar</span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Footer