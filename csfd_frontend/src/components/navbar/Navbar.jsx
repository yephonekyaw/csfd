import { useEffect, useRef, useState } from 'react';
import Headroom from 'react-headroom';
import { NavLink } from 'react-router-dom';
import SignOutButton from '../signin/SignOutButton';
import { useQueryProfile } from '../../services/queries';

const DropDownItem = ({ name }) => {
  return (
    <NavLink
      to={`/house/${name.toLowerCase()}`}
      className={({ isActive }) =>
        `px-4 py-1 transition-colors ${
          isActive
            ? 'text-[#D4A015] bg-[#FFF671]'
            : 'hover:text-[#D4A015] hover:bg-[#FFF671]'
        }`
      }
    >
      {name}
    </NavLink>
  );
};

const Navbar = () => {
  // large device drop down menu's necessary variables
  const [dropDown, setDropDown] = useState(false);
  const menuRef = useRef();

  // side nav bar's necessary variables
  const [sideBar, setSideBar] = useState(false);
  const [sideBarDrop, setSideBarDrop] = useState(false);
  const sideMenuRef = useRef();

  const { isLoading, data, error } = useQueryProfile();

  useEffect(() => {
    const handleClose = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setDropDown(false);
      }
      if (!sideMenuRef.current.contains(event.target)) {
        setSideBar(false);
      }
    };

    const closeByESC = (event) => {
      // use event.target to close the side nav bar in case user uses tab and enter keys on other modal popup triggers
      if (event.key.toLowerCase() === 'escape') {
        setSideBar(false);
      }
    };

    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', closeByESC);

    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('keydown', closeByESC);
    };
  }, []);

  if (isLoading) return null;
  if (error) console.log(error.message);
  const role = data?.data?.role || 'spectator';

  return (
    <>
      {/* Desktop Nav Bar */}
      <div className="w-full absolute">
        <Headroom disableInlineStyles upTolerance={1} downTolerance={1}>
          <nav className="w-full h-[58px] px-4 sm:px-8 md:px-14 lg:px-20 flex items-center justify-center">
            {/* First section */}
            <div className="flex-1 flex justify-start">
              {/* Brief header */}
              <div
                onClick={() => setSideBar(true)}
                className="lg:hidden text-white hover:text-[#fff671] transition-all ease-in-out duration-150"
              >
                <svg
                  fill="none"
                  width="40"
                  height="40"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              {/* Full header */}
              <ul className="hidden lg:flex items-center list-none font-onesize text-lg gap-8 text-white">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#FFF671]'
                      : 'hover:text-[#FFF671] transition-colors'
                  }
                >
                  Home
                </NavLink>
                <div ref={menuRef} className="relative">
                  {/* Drop down menu trigger */}
                  <div
                    className="flex items-center gap-2 hover:text-[#FFF671] transition-colors"
                    onClick={() => setDropDown((prev) => !prev)}
                  >
                    <span>Houses</span>
                    <svg
                      className={`${
                        dropDown ? 'rotate-[180deg]' : 'rotate-0'
                      } transition-transform`}
                      fill="none"
                      width="28"
                      height="28"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7 8H5v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2h-2v-2H9v-2H7V8z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {/* Drop down menu */}
                  <ul
                    className={`${
                      dropDown
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-8 pointer-events-none'
                    } flex flex-col bg-white text-black absolute w-[115%] top-[43px] transition-all ease-in-out duration-200`}
                  >
                    <DropDownItem name="Alpha" />
                    <DropDownItem name="Epsilon" />
                    <DropDownItem name="Eta" />
                    <DropDownItem name="Iota" />
                  </ul>
                </div>
                {role !== 'spectator' && (
                  <NavLink
                    to={`${role === 'senior' ? '/hints' : '/guess'}`}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-[#FFF671]'
                        : 'hover:text-[#FFF671] transition-colors'
                    }
                  >
                    {role === 'senior' ? 'Hints' : 'Guess'}
                  </NavLink>
                )}
              </ul>
            </div>

            {/* Second section */}
            <NavLink
              to="/"
              className="flex items-center justify-center gap-2 flex-1 group"
            >
              <img
                className="group-hover:rotate-[360deg] transition-all ease-in-out duration-300"
                width="32"
                height="30"
                src="/static/navbar/icon_logo.png"
                alt=""
              />
              <span className="font-zerofourb text-[28px] font-normal text-[#FFF671]">
                CSFD
              </span>
            </NavLink>

            {/* Third section */}
            <SignOutButton className={'flex-1 flex justify-end'} />
          </nav>
        </Headroom>
      </div>
      {/* Small Screen Nav/Side Bar */}
      <aside
        className={`${
          sideBar
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } w-full h-[100vh] fixed z-[100] top-0 left-0 right-0 bg-black/40 transition-opacity`}
      >
        <nav
          ref={sideMenuRef}
          className={`${
            sideBar ? 'translate-x-0' : '-translate-x-12'
          } h-[100vh] w-[260px] sm:w-[300px] md:[350px] py-8 px-8 sm:px-10 md:px-12 flex flex-col gap-4 bg-[#67CFF5] rounded-tr-xl rounded-br-xl transition-transform duration-300 relative`}
        >
          {/* Close button */}
          <div
            onClick={() => setSideBar(false)}
            className="text-white w-full flex justify-end hover:text-[#FFF671] transition-colors"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2 w-full my-2">
            <img
              width="32"
              height="30"
              src="/static/navbar/icon_logo.png"
              alt=""
            />
            <span className="font-zerofourb text-[28px] font-normal text-[#FFF671]">
              CSFD
            </span>
          </div>

          {/* Link elements */}
          <ul className="flex flex-col w-full font-onesize text-lg text-white gap-4">
            {/* Home Nav Link */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#FFF671]'
                  : 'hover:text-[#FFF671] transition-colors'
              }
            >
              Home
            </NavLink>

            <div className="w-full h-[2px] bg-white" />

            {/* Houses Nav Links */}
            <div>
              {/* Drop down menu trigger */}
              <div
                className="flex items-center gap-2 hover:text-[#FFF671] transition-colors"
                onClick={() => setSideBarDrop((prev) => !prev)}
              >
                <span>Houses</span>
                <svg
                  className={`${
                    sideBarDrop ? 'rotate-[180deg]' : 'rotate-0'
                  } transition-transform`}
                  fill="none"
                  width="28"
                  height="28"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 8H5v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2h-2v-2H9v-2H7V8z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              {/* Multilevel drop down */}
              <ul
                className={`${
                  sideBarDrop ? 'flex flex-col' : 'hidden'
                } w-full pl-4 my-2`}
              >
                <DropDownItem name="Alpha" />
                <DropDownItem name="Epsilon" />
                <DropDownItem name="Eta" />
                <DropDownItem name="Iota" />
              </ul>
            </div>

            <div className="w-full h-[2px] bg-white" />

            {/* Hints Nav Link */}
            {role !== 'spectator' && (
              <NavLink
                to={`${role === 'senior' ? '/hints' : '/guess'}`}
                className={({ isActive }) =>
                  isActive
                    ? 'text-[#FFF671]'
                    : 'hover:text-[#FFF671] transition-colors'
                }
              >
                {role === 'senior' ? 'Hints' : 'Guess'}
              </NavLink>
            )}
          </ul>
          {/* Sign Out Button */}
          <SignOutButton sideBar className="my-auto" />
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
