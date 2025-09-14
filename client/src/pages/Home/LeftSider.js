import React from 'react';
import { useSelector } from 'react-redux';

function LeftSider() {
    const { theme, portfolioData } = useSelector(state => state.root);
    const { contact = {} } = portfolioData || {};
    const { github, linkedin, instagram, email } = contact;
    
    return (
        <div className='fixed left-0 bottom-0 px-10 sm:static'>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col text-gray-400 dark:text-gray-600 gap-5 sm:flex-row'>
                    <a href={linkedin || "https://www.linkedin.com/in/sachin-kumar-90884117a/"} target="_blank" rel="noopener noreferrer">
                        <i className="ri-facebook-circle-line hover:text-tertiary dark:hover:text-tertiary-light transition-colors duration-200"></i>
                    </a>
                    <a href={`mailto:${email || "sachinkumar9031735255@gmail.com"}`}>
                        <i className="ri-mail-line hover:text-tertiary dark:hover:text-tertiary-light transition-colors duration-200"></i>
                    </a>
                    <a href={instagram || "https://www.instagram.com/sachin_kumar_0703/?hl=en"} target="_blank" rel="noopener noreferrer">
                        <i className="ri-instagram-line hover:text-tertiary dark:hover:text-tertiary-light transition-colors duration-200"></i>
                    </a>
                    <a href={linkedin || "https://www.linkedin.com/in/sachin-kumar-90884117a/"} target="_blank" rel="noopener noreferrer">
                        <i className="ri-linkedin-box-fill hover:text-tertiary dark:hover:text-tertiary-light transition-colors duration-200"></i>
                    </a>
                    <a href={github || "https://github.com/SKSingh0703"} target="_blank" rel="noopener noreferrer">
                        <i className="ri-github-fill hover:text-tertiary dark:hover:text-tertiary-light transition-colors duration-200"></i>
                    </a>
                </div>
                <div className='w-[1px] h-32 bg-[#125f63] dark:bg-tertiary-light sm:hidden'>
                </div>
            </div>
        </div>
    );
}

export default LeftSider;
