import { NavLink } from "react-router-dom";
import { DatabaseZap, ImageIcon } from "lucide-react";
const NavBar = () => {
    return (
        <div className="dy-navbar bg-base-300 shadow-xl text-base-content z-[1000]">
            <div className="flex-1 flex-row gap-1">
                <a className="font-extrabold text-xl" href="/home">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r to-secondary from-primary">Vanir</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r to-secondary from-accent"></span>
                </a>
                <span className="dy-badge dy-badge-lg bg-gradient-to-br from-primary to-accent font-semibold text-white text-shadow-lg">Dataset Tool</span>
            </div>
            {/* Mobile Navigation Icons */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-base-300 shadow-xl py-2 w-full mobile-nav z-[1000]">
                <div className="flex justify-around w-full z-[1000]">                    
                    <NavLink className="dy-btn dy-btn-ghost z-[1000]" title="Home" to="/home">
                        <ImageIcon />
                    </NavLink>
                    <NavLink className="dy-btn dy-btn-ghost z-[1000]" title="Manage" to="/manage">
                        <DatabaseZap />
                    </NavLink>
                </div>
            </div>

            <div className="flex-none gap-2">
                <div className="dy-btn-group hidden md:flex">
                    <NavLink className="dy-btn dy-btn-ghost dy-btn-square z-[1000]" title="Home" to="/home">
                        <ImageIcon />
                    </NavLink>
                    <NavLink className="dy-btn dy-btn-ghost dy-btn-square z-[1000]" title="Manage" to="/manage">
                        <DatabaseZap />
                    </NavLink>
                    {/* <NavLink className="dy-btn dy-btn-ghost dy-btn-square" title="Games" to="/games">
                        <Gamepad2/>
                    </NavLink> */}
                    {/* <NavLink className="dy-btn dy-btn-ghost dy-btn-square" title="Art" to="/art">
                        <Paintbrush/>
                    </NavLink> */}
                </div>
            </div>
        </div>
    )
}
export default NavBar;