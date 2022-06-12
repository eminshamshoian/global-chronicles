import Link from "next/link";

function Header() {
  return (
    <div className='bg-red-100 border-b-2 border-black'>
      <header className='flex justify-between p-5 max-w-7xl mx-auto'>
        <div>
          <Link href='/'>
            <h1 className='text-4xl font-bold cursor-pointer'>
              Global Chronicles
            </h1>
          </Link>
        </div>
        <div className='flex items-center space-x-5'>
          <Link href='#about'>
            <h3 className='cursor-pointer hidden md:block'>Our Story</h3>
          </Link>
          <Link href='/'>
            <h3 className='text-white bg-black px-4 py-1 rounded-full cursor-pointer'>
              Get Started
            </h3>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
