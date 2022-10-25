import {useState} from "react"
import Logo from "./Logo";
const Header = () => {
    const Links = [
        { name: "HOME", link: "/" },
        { name: "CONTACT", link: "/" },
    ];

    const [open, setOpen] = useState(false);
    return (
        // <div>
            <div className='shadow-md w-full sticky top-0 left-0 z-10'>
                <div className='md:flex items-center justify-between bg-white py-1 md:px-7 px-7'>
                    <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
                        <span className=' text-indigo-600 mr- pt-1'>
                            <Logo />
                        </span>
                        StreamVerse
                    </div>

                    <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-1/2 cursor-pointer md:hidden'>
                        <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                    </div>

                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
                        {
                            Links.map((link) => (
                                <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                                    <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
                                </li>
                            ))
                        }
                        <button className='bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'>
                            Get Started
                        </button>
                    </ul>
                </div>
            </div>
        // </div>

    )
}

export default Header