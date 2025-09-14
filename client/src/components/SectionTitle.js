import React from 'react'
import { useSelector } from 'react-redux';

function SectionTitle({
    title,
}) {
  const { theme } = useSelector(state => state.root);
  
  return (
    <div className='flex gap-10 items-center py-10'>
        <h1 className='text-3xl text-secondary dark:text-secondary-light font-semibold'>
            {title}
        </h1>
        <div className='w-60 h-[1px] bg-white dark:bg-gray-800'>

        </div>
    </div>
  )
}

export default SectionTitle