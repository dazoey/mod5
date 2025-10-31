// src/components/common/FavoriteButton.jsx
import { Heart } from 'lucide-react';
import { useIsFavorited } from '../../hooks/useFavorites';

/**
 * FavoriteButton Component
 * Toggles favorite status using the useIsFavorited hook.
 */
export default function FavoriteButton({ recipeId, size = 'md' }) {
  const { isFavorited, loading, toggleFavorite } = useIsFavorited(recipeId);
  
  // Size variants
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleToggle = async (e) => {
    e.stopPropagation(); // Prevent card click
    await toggleFavorite();
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        ${sizes[size]} rounded-full flex items-center justify-center
        transition-all duration-200 
        ${isFavorited 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-white/90 hover:bg-white text-slate-700 hover:text-red-500'
        }
        backdrop-blur-sm shadow-md hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        group
      `}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`
          ${iconSizes[size]} 
          transition-all duration-200
          ${isFavorited ? 'fill-current' : ''}
        `} 
      />
    </button>
  );
}
