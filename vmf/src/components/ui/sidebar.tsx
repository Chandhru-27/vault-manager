import React from 'react'

// const NavLinks = {1:"Home", 2:"Vault", 3:"Log out"};

const Sidebar = () => {
  return (
    <div className="bg-color w-fit h-screen">
        <ul className='px-20 py-5 flex flex-col gap-5 '>
            <li><a>Home</a></li>
            <li><a>Vault</a></li>
            <li><a>Log out</a></li>
        </ul>
    </div>
  )
}

export default Sidebar
