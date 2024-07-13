import React from 'react'
import SectionTitle from '../../components/SectionTitle'

function Education() {
  return (
    <div >
        <SectionTitle title="Education" />
        <div className='flex flex-col text-white gap-10 py-10 justify-center '>
        <p>
            <b>Birla Institute of Technology</b> 
            <br></br>
            B.Tech in CSE CGPA-9.04
            <br></br>
            September 2024-2027
        </p>
        <p>  
          Jee Main <b>AIR : 2440</b> 
         </p>
        <p>
            Valley View School 
            <br></br>
            Class 12 : 91.8%
            <br></br>
            2021-2023 
        </p>
        <p>
        Valley View School 
            <br></br>
            Class 12 : 93.2%
            <br></br>
            2009-2021
            
        </p>
        </div>
    </div>
  )
}

export default Education