import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function Education() {
  const { theme } = useSelector(state => state.root);
  
  return (
    <div className="bg-primary dark:bg-primary-light p-6 rounded-lg flex flex-col transition-colors duration-300">
      <SectionTitle title="Education" />
      <div className="flex flex-col gap-6 text-white dark:text-gray-800 py-6">
        <div className="bg-gray-900 dark:bg-gray-100 p-4 rounded-md transition-colors duration-300">
          <h3 className="text-xl font-bold text-yellow-400 dark:text-yellow-600">Birla Institute of Technology</h3>
          <p className="text-white dark:text-gray-700">B.Tech in CSE</p>
          <p className="text-white dark:text-gray-700">CGPA: 9.04</p>
          <p className="text-white dark:text-gray-700">September 2024 - 2027</p>
        </div>
        <div className="bg-gray-900 dark:bg-gray-100 p-4 rounded-md transition-colors duration-300">
          <p className="text-white dark:text-gray-700">Jee Main <strong className="text-yellow-400 dark:text-yellow-600">AIR: 2440</strong></p>
        </div>
        <div className="bg-gray-900 dark:bg-gray-100 p-4 rounded-md transition-colors duration-300">
          <h3 className="text-xl font-bold text-yellow-400 dark:text-yellow-600">Valley View School</h3>
          <p className="text-white dark:text-gray-700">Class 12: 91.8%</p>
          <p className="text-white dark:text-gray-700">2021 - 2023</p>
        </div>
        <div className="bg-gray-900 dark:bg-gray-100 p-4 rounded-md transition-colors duration-300">
          <h3 className="text-xl font-bold text-yellow-400 dark:text-yellow-600">Valley View School</h3>
          <p className="text-white dark:text-gray-700">Class 10: 93.2%</p>
          <p className="text-white dark:text-gray-700">2009 - 2021</p>
        </div>
      </div>
    </div>
  );
}

export default Education;
