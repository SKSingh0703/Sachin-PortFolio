import React from 'react'
import SectionTitle from '../../components/SectionTitle'

import { useSelector } from "react-redux";

function Experiences() {
  const [selectedItemIndex , setSelectedItemIndex]= React.useState(0);
  const { portfolioData, theme } = useSelector(state => state.root);
  const {experiences = []} = portfolioData || {};

  if (!experiences || experiences.length === 0) {
    return (
      <div>
        <SectionTitle title="Experiences" />
        <div className="text-white dark:text-gray-700 text-center py-10">
          <p>No experiences available at the moment.</p>
        </div>
      </div>
    );
  }
  return (
    <div>
        <SectionTitle title="Experiences" />

        <div className='flex py-10 gap-20 sm:flex-col'>

            <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] dark:border-tertiary-light w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>

                {experiences.map((experience , index) => (
                    <div key={index}
                      onClick={() => {
                        setSelectedItemIndex(index);
                      }}
                      className='cursor-pointer'
                    >
                    <h1 className={`text-xl px-10
                       ${
                        selectedItemIndex === index 
                        ?'text-tertiary dark:text-tertiary-light border-tertiary dark:border-tertiary-light border-l-4 -ml-[3px] bg-[#1a7f5a31] dark:bg-tertiary-light/20 py-3 sm:w-'
                        :'text-white dark:text-gray-700'
                     }`} 
                    > 
                      {experience.period} 

                    </h1>
                    </div>
                ))}

            </div>

            <div className='flex  flex-col gap-5 '>

                <h1 className='text-secondary dark:text-secondary-light text-xl'>
                    {experiences[selectedItemIndex].title}
                </h1>

                <h1 className='text-tertiary dark:text-tertiary-light text-xl'>
                    {experiences[selectedItemIndex].company}
                </h1>

                <p className='text-white dark:text-gray-700'>
                {experiences[selectedItemIndex].description } 
                </p>

            </div>

        </div>

    </div>
  )
} 

export default Experiences