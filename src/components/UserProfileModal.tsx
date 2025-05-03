import React, { useState } from 'react';
import { X, Save, Mail, Upload, Phone, User, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const UserProfileModal = ({
  isOpen,
  onClose
}: UserProfileModalProps) => {
  const {
    user,
    updateProfile,
    changeUsername,
    changePassword
  } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    profilePicture: user?.profilePicture || ''
  });
  const [changeUsernameData, setChangeUsernameData] = useState({
    currentPassword: '',
    newUsername: ''
  });
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  if (!isOpen) return null;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
      setError('');
    } catch (error) {
      setError('Failed to update profile');
    }
  };
  const handleUsernameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await changeUsername(changeUsernameData.currentPassword, changeUsernameData.newUsername);
      if (success) {
        setShowChangeUsername(false);
        setChangeUsernameData({
          currentPassword: '',
          newUsername: ''
        });
        setError('');
      } else {
        setError('Incorrect password');
      }
    } catch (error) {
      setError('Failed to change username');
    }
  };
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    try {
      const success = await changePassword(changePasswordData.currentPassword, changePasswordData.newPassword);
      if (success) {
        setShowChangePassword(false);
        setChangePasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setError('');
      } else {
        setError('Incorrect current password');
      }
    } catch (error) {
      setError('Failed to change password');
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePicture: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-40" onClick={onClose}></div>
        <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                User Profile
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>}
            {!showChangeUsername && !showChangePassword && <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                      <img src={formData.profilePicture || `https://ui-avatars.com/api/?name=${user?.username}&background=random`} alt={user?.username} className="w-full h-full object-cover" />
                    </div>
                    {isEditing && <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition-opacity">
                        <Upload className="h-6 w-6 text-white" />
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    {isEditing ? <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input type="text" value={formData.fullName} onChange={e => setFormData(prev => ({
                    ...prev,
                    fullName: e.target.value
                  }))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" placeholder="Enter your full name" />
                      </div> : <p className="text-sm text-gray-900">
                        {formData.fullName || 'Not set'}
                      </p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    {isEditing ? <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input type="email" value={formData.email} onChange={e => setFormData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                      </div> : <p className="text-sm text-gray-900">{formData.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    {isEditing ? <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input type="tel" value={formData.phoneNumber} onChange={e => setFormData(prev => ({
                    ...prev,
                    phoneNumber: e.target.value
                  }))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" placeholder="+639" />
                      </div> : <p className="text-sm text-gray-900">
                        {formData.phoneNumber || 'Not set'}
                      </p>}
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  {!isEditing && <>
                      <button type="button" onClick={() => setShowChangeUsername(true)} className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
                        Change Username
                      </button>
                      <button type="button" onClick={() => setShowChangePassword(true)} className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
                        Change Password
                      </button>
                    </>}
                </div>
                <div className="flex justify-end pt-4">
                  {isEditing ? <>
                      <button type="button" onClick={() => setIsEditing(false)} className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Cancel
                      </button>
                      <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Save Changes
                      </button>
                    </> : <button type="button" onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      Edit Profile
                    </button>}
                </div>
              </form>}
            {showChangeUsername && <form onSubmit={handleUsernameChange} className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Change Username
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input type="password" value={changeUsernameData.currentPassword} onChange={e => setChangeUsernameData(prev => ({
                  ...prev,
                  currentPassword: e.target.value
                }))} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      New Username
                    </label>
                    <input type="text" value={changeUsernameData.newUsername} onChange={e => setChangeUsernameData(prev => ({
                  ...prev,
                  newUsername: e.target.value
                }))} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" required />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => {
                setShowChangeUsername(false);
                setError('');
              }} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Change Username
                  </button>
                </div>
              </form>}
            {showChangePassword && <form onSubmit={handlePasswordChange} className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input type="password" value={changePasswordData.currentPassword} onChange={e => setChangePasswordData(prev => ({
                  ...prev,
                  currentPassword: e.target.value
                }))} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input type="password" value={changePasswordData.newPassword} onChange={e => setChangePasswordData(prev => ({
                  ...prev,
                  newPassword: e.target.value
                }))} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input type="password" value={changePasswordData.confirmPassword} onChange={e => setChangePasswordData(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" required />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => {
                setShowChangePassword(false);
                setError('');
              }} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Change Password
                  </button>
                </div>
              </form>}
          </div>
        </div>
      </div>
    </div>;
};