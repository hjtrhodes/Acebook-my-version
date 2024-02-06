import { IdentificationIcon, ExclamationCircleIcon, HomeIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768); // State to track screen size
  const navigate = useNavigate();
  const menuRef = useRef<HTMLUListElement>(null); // Ref for the menu

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768); // Update isLargeScreen state when window is resized
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close the menu if clicked outside of it
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  };

  const urlTo = (path: string) => {
    navigate(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  const handleMouseEnter = () => {
    if (isLargeScreen) {
      setIsMenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isLargeScreen) {
      setIsMenuOpen(false);
    }
  };

  const items = [
    {
      title: "Home",
      icon: <HomeIcon />,
      color: "bg-teal-300 dark:bg-teal-800",
      onclick: () => urlTo('/posts'),
    },
    {
      title: "Profile",
      icon: <IdentificationIcon />,
      color: "bg-indigo-300 dark:bg-indigo-800",
      onclick: () => urlTo('/profile'),
    },
    {
      title: "Logout",
      icon: <ExclamationCircleIcon />,
      color: "bg-red-300 dark:bg-red-800",
      onclick: () => logout(),
    },
  ];

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex items-center h-10 gap-3 rounded-lg cursor-pointer w-fit hover:bg-slate-200 dark:hover:bg-slate-800" onClick={toggleMenu}>
        <Bars3Icon className="my-auto ml-3 rounded-full w-7 h-7" />
        <p className="mr-3 font-bold text-gray-800 dark:text-gray-200">{firstName}</p>
      </div>
      <ul ref={menuRef} className={`absolute w-72 p-2 bg-slate-50 dark:bg-gray-900 shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-400 dark:shadow-slate-700 ${isMenuOpen ? 'flex' : 'hidden'} flex-col ${isLargeScreen ? '-left-[10em]' : '-right-[8em]'} rounded-xl`}>
        {items.map((item) => (
          <li
            key={item.title}
            className="flex items-center justify-start h-16 font-bold cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
            onClick={item.onclick}
          >
            <div
              className={`h-10 w-10 ml-5 flex items-center justify-center rounded-lg ${item.color}`}
            >
              <div className="w-3/5 text-gray-800 h-3/5 dark:text-gray-200">
                {item.icon}
              </div>
            </div>
            <p className="ml-5 text-gray-600 dark:text-gray-200">
              {item.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
