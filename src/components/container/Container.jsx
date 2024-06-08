import React from 'react'

function Container({children}) {
  return (
    <div className='w-full max-w-7xl m-auto px-4 py-4'>{children}</div>
  )
}

export default Container