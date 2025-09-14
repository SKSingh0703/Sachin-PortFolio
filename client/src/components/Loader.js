import React from 'react'

function Loader() {
    return (
        <div className='h-screen flex flex-col items-center justify-center fixed inset-0 bg-primary dark:bg-primary-light z-[100]'> 
            <div className='flex gap-5 text-6xl font-semibold sm:text-4xl mb-4'>
                <h1 className='text-secondary dark:text-secondary-light s animate-bounce'> S </h1>
                <h1 className='text-white dark:text-gray-800 k animate-bounce' style={{animationDelay: '0.1s'}}> K </h1>
                <h1 className='text-tertiary dark:text-tertiary-light ss animate-bounce' style={{animationDelay: '0.2s'}}> S </h1>
            </div>
            <div className="text-tertiary dark:text-tertiary-light text-lg font-medium">
                Loading Portfolio...
            </div>
            <div className="mt-2 text-gray-400 dark:text-gray-500 text-sm">
                Please wait while we fetch your data
            </div>
        </div>
    )
}

// Skeleton loader for sections
export const SectionSkeleton = ({ height = "h-64", className = "" }) => (
  <div className={`${height} bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse ${className}`}>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

// Card skeleton
export const CardSkeleton = () => (
  <div className="bg-white dark:bg-gray-50 shadow-lg border border-gray-200 dark:border-gray-300 p-6 rounded-lg animate-pulse">
    <div className="space-y-4">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
      <div className="flex justify-end space-x-2">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
      </div>
    </div>
  </div>
);

export default Loader