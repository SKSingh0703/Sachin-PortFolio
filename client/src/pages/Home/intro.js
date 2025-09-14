import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
function Intro() {
  const { portfolioData, theme } = useSelector(state => state.root);
  const {intro = {}} = portfolioData || {};
  const {firstName = '', lastName = '', welcomeText = '', description = '', caption = ''} = intro;
  const navigate =useNavigate();
  return (
    <div id="home" className='h-[80vh] bg-primary dark:bg-primary-light flex flex-col items-start justify-center gap-8 py-10 transition-colors duration-300'>

        <h1 className='text-white dark:text-gray-800'>{  welcomeText || '' }  </h1>

        <h1 className='text-7xl sm:text-3xl text-secondary dark:text-secondary-light font-semibold'>{firstName || ""} {lastName || ""} </h1>

        <h1 className='text-7xl sm:text-3xl text-white dark:text-gray-800 font-semibold'> {caption || ""} </h1>

        <p className='text-white dark:text-gray-700 w-2/3'>
        {description || ""}
       </p>
        <button onClick={()=>navigate(`/admin-login`)}
         className='btn-secondary sm:hidden'>Get started</button>
    </div>
  )
}

export default Intro;

