// src/pages/ProfilePage.jsx
import { useState } from 'react';
import Profile from '../components/profile/Profile';
import FavoriteRecipes from '../components/profile/FavoriteRecipes';

export default function ProfilePage({ onRecipeClick }) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Profile Pengguna
        </h1>
        
        <div className="mb-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`${
                activeTab === 'favorites'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Resep Favorit
            </button>
          </nav>
        </div>

        <div>
          {activeTab === 'profile' && <Profile />}
          {activeTab === 'favorites' && <FavoriteRecipes onRecipeClick={onRecipeClick} />}
        </div>
      </div>
    </div>
  );
}
