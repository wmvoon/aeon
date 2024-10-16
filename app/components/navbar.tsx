"use client"
import Link from "next/link"
import * as data from './links.json'
import { useState } from "react";
import { Menu, X, Search } from 'lucide-react';

const links = JSON.parse(JSON.stringify(data)).links

type Link = {
    label: string;
    href: string;
}

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNav = () => {
        setMenuOpen(!menuOpen);

    }

    return (
        <nav className="w-full shadow-xl bg-white h-20 flex justify-between border-b">
            <div className="hidden lg:flex">
                <div className="flex w-3/5 px-4 items-center cursor-pointer">
                    {links.map((link: Link) => {
                        return (
                            <div key={link.href} className="flex px-3">
                                <a href={link.href}>
                                    {link.label}
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div onClick={handleNav} className="flex items-center lg:hidden cursor-pointer pl-20">
                <Menu size={25} />
            </div>

            <div className={
                menuOpen
                    ? "fixed left-0 top-0 w-[60%] lg:hidden h-screen bg-gray-300 p-10"
                    : "fixed left-[-100%] top-0 p-10"
            }
            > 
            <div className="flex items-center justify-end">
                <div className="ml-2">
                    <Search size={25} />
                </div>
                <div onClick={handleNav} className="cursor-pointer m-5">
                    <X size={25} />
                </div>
            </div>
            
            <div className="items-center cursor-pointer">
                    {links.map((link: Link) => {
                        return (
                            <div key={link.href} className="flex px-3">
                                <a href={link.href}>
                                    {link.label}
                                </a>
                            </div>
                        )
                    })}
                </div>


            </div>

            <div className="flex items-center mr-10 hidden lg:flex">
                <input className="bg-gray-300 rounded-xl placeholder:text-center p-2" type="search" placeholder="Search Documentation" />
                <div className="ml-2">
                    <Search size={25} />
                </div>
            </div>

        </nav>
    )

}

export default Navbar