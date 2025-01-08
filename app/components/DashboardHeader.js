import { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/logo.png';
import userLogo from '../../public/userlogo.png';
import { users } from '../mockData'; 

export default function DashboardHeader({ onAddTicket, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logo.src} alt="Ticketing Dashboard Logo" className="h-10" />
          <h1 className="text-2xl font-semibold">Ticketing Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Add Ticket Button */}
          <button
            onClick={onAddTicket}
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg mr-2"
          >
            Add Ticket
          </button>

          {/* User Info Section */}
          <div className="relative flex items-center space-x-2">
            {/* User Logo */}
            <div className="relative w-8 h-8 cursor-pointer" onClick={toggleDropdown}>
              <Image
                src={userLogo} // Replace with the user's profile image
                alt="User Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            {/* User Name */}
            <div className="text-white">{users.email}</div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-12 right-0 bg-white text-black py-2 px-4 rounded shadow-lg z-50">
                <button
                  onClick={onLogout}
                  className="w-full text-left text-red-500 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
