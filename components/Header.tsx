import Link from "next/link";

function Header() {
  return (
    <div className='bg-yellow-400'>
      <header className='flex justify-between p-5 max-w-7xl mx-auto'>
        <div>
          <Link href='/'>
            <img
              className='w-44 object-contain cursor-pointer'
              src='logo.png'
              alt=''
            />
          </Link>
        </div>
        <div className='flex items-center space-x-5'>
          <Link href='/'>
            <h3 className='cursor-pointer'>Our Story</h3>
          </Link>
          <Link href='/'>
            <h3 className='cursor-pointer'>Membership</h3>
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
