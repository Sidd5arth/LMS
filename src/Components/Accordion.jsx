import React, { useState } from 'react';

const Accordion = ({ syllabus }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="accordion p-12">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>Course Overview</h3>
        <button className='w-full border rounded-lg border-black bg-green-200'>{isCollapsed ? 'Expand' : 'Collapse'}</button>
      </div>
      {!isCollapsed && (
        <div className="bg-gray-50 p-3 rounded-lg">
          {syllabus.map((week, index) => (
            <div key={index} className='my-2'>
              <h1 className='text-xl text-purple-600'>{week.topic}</h1>
              <p className='text-sm text-gray-600'>{week.content}</p>
              <hr className='mt-7'></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
