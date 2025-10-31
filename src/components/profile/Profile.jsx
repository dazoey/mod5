// src/components/profile/Profile.jsx
import { useState, useEffect } from 'react';
import userService from '../../services/userService';

export default function Profile() {
  const [userProfile, setUserProfile] = useState({ username: '', bio: '', avatar: null });
  const [newUsername, setNewUsername] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const profile = userService.getUserProfile();
    setUserProfile(profile);
    setNewUsername(profile.username);
    setNewBio(profile.bio);
    setAvatarPreview(profile.avatar);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result);
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (newAvatar) {
      userService.updateAvatar(newAvatar);
    }
    userService.saveUserProfile({ username: newUsername, bio: newBio, avatar: newAvatar || userProfile.avatar });
    setUserProfile({ username: newUsername, bio: newBio, avatar: newAvatar || userProfile.avatar });
    alert('Profile updated!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="mr-6">
          <img 
            src={avatarPreview || 'https://via.placeholder.com/150'} 
            alt="Avatar" 
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div>
          <label htmlFor="avatar-upload" className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
            Change Picture
          </label>
          <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
        <input 
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
        <textarea
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button 
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save
      </button>
    </div>
  );
}
