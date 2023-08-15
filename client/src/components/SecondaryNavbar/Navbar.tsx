import React from 'react'
import Image from 'next/image'
const Navbar = () => {
  return (
    <nav className='flex lg:items-start ml-5'>  {/* navbar div */}
    <div className='w-20  h-16 bg-cover lg:ml-44 '>
      <Image
        src="/logo/nexuscomplete.png"
        width={800}
        height={800}
        alt="Picture of the author"
      />
  </div>
  </nav>
  )
}

export default Navbar