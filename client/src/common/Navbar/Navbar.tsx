import NavbarItem from './NavbarItem';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai'
import logo from '../../assets/images/logo.png';
import { useState } from 'react';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return(
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt="logo" className='w-32 cursor-pointer'></img>
            </div>
            {/* flex override hiden when md-flex: >756 px flex property applied and hidden overrided */}
            <ul className='text-white md:flex list-none flex-row justify-between items-center hidden'>
                {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                    <NavbarItem key={item + index} title={item}/>
                ))}
                <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                    Login
                </li>
            </ul>
            <div className='flex relative'>
                {toggleMenu ? 
                <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/> : 
                <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>
                }
                {/* if toggleMenu is true return */}
                {toggleMenu && (
                    <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                    flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate'>
                        <li className='text-xl w-full my-2 cursor-pointer'>
                            <AiOutlineClose onClick={() => setToggleMenu(false)}/>
                        </li>
                        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                            <NavbarItem key={item + index} title={item} classProps='my-2 text-lg'/>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar