import React from 'react'

const ChapterCard = ({chapter}) => {
  return (
    <div className='flex gap-2 h-[100px] w-full border p-5 align-middle justify-left'>
        <p className='text-2xl p-4'>0{chapter}</p>
        <p className='text-2xl p-4'>Chapter Locked</p>
    </div>
  )
}

export default ChapterCard
