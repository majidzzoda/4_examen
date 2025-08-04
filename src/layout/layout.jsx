import React from 'react'
import { UsersIcon } from '../components/icons'
import ThemeToggle from '../components/switch'
import useDarkSide from '../config/useDarkMode'
import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
    const [theme, toggleTheme] = useDarkSide()
    return (
        <div>
            <header>
                <nav className='flex justify-around items-center dark:bg-gray-900 transition-all duration-500 py-[10px] lg:py-[25px] bg-gray-100 rounded-t-[12px] w-[50%] lg:w-[20%] fixed mx-auto left-0 right-0 bottom-0'>
                    <div onClick={toggleTheme}>
                        <ThemeToggle />
                    </div>
                    <NavLink to={''} className={({ isActive }) => isActive ? 'text-blue-500 transition-all duration-500' : 'text-gray-300 transition-all duration-500'}>
                        <button>{UsersIcon}</button>
                    </NavLink>
                </nav>
            </header>
            <main className='mt-[100px]'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout