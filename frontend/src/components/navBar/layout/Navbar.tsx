import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CompanyLogo,
  HamburgerButton,
  KbarInput,
  MenuLinks,
  MobileMenu,
} from "../ui-elements";
import User from "../ui-elements/User/User";
import { navigationLinks } from "./navigation-links";

export const Navbar = () => {
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className="flex items-center h-16 px-3 m-0 md:px-4 dark:bg-white bg-white">
        <div className="flex items-center justify-between w-full md:mx-4 lg:mx-8 2xl:w-[80em] 2xl:mx-auto">
          <div className="flex items-center justify-center">
            {/* <div className="md:hidden">
              <HamburgerButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div> */}
            <div className="">
              <CompanyLogo />
            </div>
            <div className="">
              <KbarInput />
            </div>
            {/* <div className="relative hidden ml-4 text-gray-600 top-[1px] md:block">
              <MenuLinks menuLinks={navigationLinks} />
            </div> */}
          </div>
          <div className="flex items-center justify-center gap-4">
            <User />
          </div>
        </div>
        <div className="md:hidden">
          {isMobileMenuOpen && <MobileMenu menuLinks={navigationLinks} />}
        </div>
      </nav>
    </>
  );
};
