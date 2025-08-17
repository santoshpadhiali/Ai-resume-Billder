import { UserButton, useUser } from '@clerk/clerk-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex p-3 px-5 justify-between shadow-md items-center">
      <img src="/logo.svg" alt="Logo" width={100} height={100} />

      {isSignedIn ? (
        <div className="flex gap-3 items-center">
          <Link to="/dashboard">
            <button className="border border-[#86abff] text-[#86abff] px-4 py-2 rounded hover:bg-[#f0f5ff] transition">
              Dashboard
            </button>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <button className="bg-[#708ed5] hover:bg-[#89acfe] text-white px-4 py-2 rounded transition">
            Get Started
          </button>
        </Link>
      )}
    </div>
  );
}

export default Header;
