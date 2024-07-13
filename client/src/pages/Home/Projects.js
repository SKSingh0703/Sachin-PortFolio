import React from 'react'
import SectionTitle from '../../components/SectionTitle'

import { useSelector } from "react-redux";

function Projects() {
  const [selectedItemIndex , setSelectedItemIndex]= React.useState(0);
  
  const {portfolioData } = useSelector(state => state.root);
  const {projects} = portfolioData;
  return (
    <div>
        <SectionTitle title="Projects" />
        <div className='flex py-10 gap-20 sm:flex-col'>

            <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>

                {projects.map((project , index) => (
                    <div 
                      onClick={() => {
                        setSelectedItemIndex(index);
                      }}
                      className='cursor-pointer'
                    >
                    <h1 className={`text-xl px-10
                       ${
                        selectedItemIndex === index 
                        ?'text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3 sm:w-'
                        :'text-white'
                     }`} 
                    > 
                      {project.title} 

                    </h1>
                    </div>
                ))}

            </div>
            
            <div className='flex items-center justify-center gap-10 sm:flex-col'>                
                <img src={projects[selectedItemIndex].image} alt="NO" className='h-64 w-72' />

              <div className='flex  flex-col gap-5 '>

                <h1 className='text-secondary text-xl'>
                    {projects[selectedItemIndex].title}
                </h1>
                <p className='text-white'>
                    {projects[selectedItemIndex].description}
                </p>
                <p className='text-white'>
                Personal Growth:<br></br>
                 My experience at TechXpert Solutions not only solidified my technical 
                skills but also honed my ability to work effectively in fast-paced environments.
                I learned to prioritize tasks, communicate technical ideas clearly, and collaborate with
                diverse teams to achieve project goals.
                </p>

              </div>

            </div>

        </div>
    </div>
  )
}

export default Projects