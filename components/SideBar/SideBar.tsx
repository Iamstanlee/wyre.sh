import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';


import style from './SideBar.module.css';

const navItems = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    )
  },
  {
    name: 'Transactions',
    route: '/transactions',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
      
        fill="currentColor"
        viewBox="0 0 256 256"
        className="w-5 h-5"
      >
        <path d="M40,48,88,96H40ZM168,160l48,48V160Z" opacity="0.2"></path>
        <path d="M95.39,99.06a8,8,0,0,0-1.73-8.72L73.08,69.76C86.08,58.85,104.83,48,128,48c35.95,0,58.13,21.44,58.36,21.68a8,8,0,0,0,11.3-11.34C196.58,57.27,170.82,32,128,32c-23.36,0-46.13,9.1-66.28,26.41L45.66,42.34A8,8,0,0,0,32,48V96a8,8,0,0,0,8,8H88A8,8,0,0,0,95.39,99.06ZM48,88V67.31L68.69,88Zm168,64H168a8,8,0,0,0-5.66,13.66l20.58,20.58C169.92,197.15,151.17,208,128,208c-35.84,0-58-21.32-58.36-21.67a8,8,0,0,0-11.3,11.33C59.42,198.73,85.18,224,128,224c23.36,0,46.13-9.1,66.28-26.41l16.06,16.07A8,8,0,0,0,224,208V160A8,8,0,0,0,216,152Zm-8,36.69L187.31,168H208Z"></path>
      </svg>
    )
  },
  {
    name: 'Account',
    route: '/account',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    )
  }
];

const SideBar = () => {
  const router = useRouter();
  return (
    <header className="min-h-screen border-r border-border-color fixed h-full top-0">
      <nav className="p-0 sm:p-3 lg:p-6 opacity-0 sm:opacity-100 w-0 sm:w-16 lg:w-52 h-full relative">
        <ul className="flex flex-col gap-6 mt-8 lg:mt-0">
          <li>
            <Link href="/dashboard" className="hidden lg:block mx-auto w-fit">
              <Image
                src="/assets/logo/logo.png"
                width="60"
                height="60"
                alt="logo"
              />
            </Link>
          </li>
          <div className="flex flex-col gap-4 mt-4">
            {navItems.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.route}
                  className={
                    router.pathname == item.route
                      ? `text-primary-text flex items-center gap-3 justify-center lg:justify-start ${style.a} ${style.active}`
                      : `text-primary-text flex items-center gap-3 justify-center lg:justify-start ${style.a}`
                  }
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.name}</span>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};
export default SideBar;
