import React, { useEffect, useState, useRef } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
interface UserProfileDropdownProps {
  onViewProfile: () => void;
}
export const UserProfileDropdown = ({
  onViewProfile
}: UserProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    user,
    logout
  } = useAuth();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all">
        <img src={user?.profilePicture || 'https://via.placeholder.com/150'} alt={user?.username} className="w-full h-full object-cover" />
      </button>
      {isOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200 z-50">
          <button onClick={() => {
        onViewProfile();
        setIsOpen(false);
      }} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            <User className="h-4 w-4 mr-2" />
            View Profile
          </button>
          <button onClick={logout} className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </button>
        </div>}
    </div>;
};