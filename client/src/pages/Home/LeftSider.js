// import React from 'react'

// function LeftSider() {
//     return (
//     <div className='fixed left-0 bottom-0 px-10'>
//         <div className='flex flex-col items-center'>
//         <div className='flex flex-col text-gray-400  gap-5'>
//         <a href="" > <i class="ri-facebook-circle-line"></i></a>
//         <a href="https://mail.google.com/mail/u/1/#inbox" > <i class="ri-mail-line"></i></a>
//         <a href="" ><i class="ri-instagram-line"></i> </a>
//         <a href="" ></a><i class="ri-linkedin-box-fill"></i> </a>
//         <a href="" ></a><i class="ri-github-fill"></i> </a>
//         </div>
//         <div className='w-[1px] h-32 bg-[#125f63]'>

//         </div>
//         </div >
//     </div >
//   )
// }

// export default LeftSider
import React from 'react';

function LeftSider() {
    return (
        <div className='fixed left-0 bottom-0 px-10 sm:static'>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col text-gray-400 gap-5 sm:flex-row'>
                    <a href="https://www.linkedin.com/in/sachin-kumar-90884117a/">
                        <i class="ri-facebook-circle-line"></i>
                    </a>
                    <a href="mailto:sachinkumar9031735255@gmail.com">
                        <i className="ri-mail-line"></i>
                    </a>
                    <a href="https://www.instagram.com/sachin_kumar_0703/?hl=en">
                        <i class="ri-instagram-line"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/sachin-kumar-90884117a/">
                        <i class="ri-linkedin-box-fill"></i>
                    </a>
                    <a href="https://github.com/SKSingh0703">
                        <i class="ri-github-fill"></i>
                    </a>
                </div>
                <div className='w-[1px] h-32 bg-[#125f63] sm:hidden'>
                </div>
            </div>
        </div>
    );
}

export default LeftSider;
