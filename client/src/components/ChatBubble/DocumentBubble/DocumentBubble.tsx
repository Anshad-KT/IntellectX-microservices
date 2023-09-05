import React from 'react';

interface DocumentBubbleProps {
  from: string;
  content: string;
  time: string;

}

const DocumentBubble: React.FC<DocumentBubbleProps> = ({ from, content, time }) => {
  return (
    <div  className='max-w-2xl bg-sidebar rounded-md mt-2 flex items-start pl-3 pr-5 py-1 cursor-pointer'>
      <div>
        <svg className='w-10 h-8 mr-3 text-primary' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      <div className='flex flex-col p-4 shadow-lg'>
        <h4 className='text-mini'>~{from}</h4>
        <div className="flex items-center">
          <div>
            <a href={content} target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </a>
          </div>
          <div>

            <span className='text-minip'>{content}</span> {/* Display the document name */}
          </div>

        </div>
        <div className='flex justify-end text-gray-500 text-mini'>{time}</div>
      </div>
    </div>
  );
};

export default DocumentBubble;
