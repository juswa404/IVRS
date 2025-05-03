import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { UserProfileDropdown } from './UserProfileDropdown';
import { UserProfileModal } from './UserProfileModal';
export const Navbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-gray-800 shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <span className="text-xl font-semibold text-gray-900">IVRS</span>
        </div>
        <UserProfileDropdown onViewProfile={() => setIsProfileModalOpen(true)} />
      </div>
      <UserProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </nav>;
};