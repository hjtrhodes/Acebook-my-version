import { IdentificationIcon, ExclamationCircleIcon, HomeIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../../../util/baseUrl';
import { RxAvatar } from "react-icons/rx";

const User = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768); // State to track screen size
  const navigate = useNavigate();
  const menuRef = useRef<HTMLUListElement>(null); // Ref for the menu
  const [profilePic, setProfilePic] = useState(""); // State to control menu visibility

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

  const getLoggedInUserProfilePic = async () => {
    try {
        const token = window.localStorage.getItem("token");
        if (!token) {
            console.log("Token not available. Unable to retrieve profile picture.");
            return;
        }

        const response = await fetch(`${baseUrl}/users/userProfile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const newToken = data.token;
            if (newToken) {
                window.localStorage.setItem("token", newToken);
            }
            const profileImage = data.user.profileImage;
            setProfilePic(profileImage);
        } else {
            console.log("Failed to retrieve profile picture:", response.status);
            // Handle non-200 response
        }
    } catch (error) {
        console.error('Error fetching profile picture');
        // Handle fetch error
    }
};

useEffect(() => {
  getLoggedInUserProfilePic();
}, []);


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
    <>
    <div className="relative z-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex items-center cursor-pointer w-fit z-10" onClick={toggleMenu}>
        <Bars3Icon className="my-auto ml-3 rounded-full w-7 h-7" />
      </div>
      <ul ref={menuRef} className={`absolute w-72 p-2 bg-slate-50 dark:bg-gray-900 shadow-[rgba(0,_0,_0,_0.24)_0px_0px_40px] shadow-slate-400 dark:shadow-slate-700 ${isMenuOpen ? 'flex' : 'hidden'} flex-col ${isLargeScreen ? '-left-[10em]' : '-right-[8em]'} rounded-xl`}>
        {items.map((item) => (
          <li
            key={item.title}
            className="flex items-center justify-start h-16 font-bold cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl z-10"
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
          <button className='profilePic p-2' onClick={() => urlTo('/profile')}>
          {profilePic ? (
            <img
            src={`data:image/png;base64, ${profilePic}`}
            alt='ProfilePic'
            className='w-12 h-12 rounded-full cursor-pointer mr-2 border border-gray-100'
            />
            ) : (
              <RxAvatar size={40} className="mr-2" />
              )}
    </button>
    </>
  );
};

export default User;
