import React from 'react';
// import { useNavigate } from 'react-router-dom';

function Header() {
  // const navigate =useNavigate();
  return (
    <div className='p-5 bg-primary flex justify-between sm:py-10 header'>
        <h1 className='text-secondary text-4xl font-semibold'>S</h1>
        <h1 className='text-white text-4xl font-semibold'>K</h1>
        <h1 className='text-tertiary text-4xl font-semibold'>S</h1>
        {/* <button
        className='className="bg-secondary text-white px-6 py-2 rounded-md font-medium hover:bg-secondary-dark transition duration-200 ease-in-out"'
        onClick={()=>navigate(`/admin`)}>Login</button> */}
    </div>
    
  )
}

export default Header