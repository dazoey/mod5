// src/components/profile/FavoriteRecipes.jsx
import { useFavorites } from '../../hooks/useFavorites';
import { Clock, Star, ChefHat } from 'lucide-react';

export default function FavoriteRecipes({ onRecipeClick }) {
  const { favorites, loading, error } = useFavorites();

  const handleRecipeClick = (recipeId) => {
    const recipe = favorites.find(fav => fav.id === recipeId);
    if (recipe) {
      onRecipeClick(recipe.id, recipe.category);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Memuat resep favorit...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Anda belum memiliki resep favorit.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {favorites.map((recipe) => (
        <div 
          key={recipe.id} 
          onClick={() => handleRecipeClick(recipe.id)}
          className="group transform transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/15">
            <div className="relative h-32 md:h-56 overflow-hidden">
              <img 
                src={recipe.image_url}
                alt={recipe.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 p-4 md:p-8">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className={`text-xs font-semibold ${recipe.category === 'makanan' ? 'text-blue-700 bg-blue-100/90' : 'text-green-700 bg-green-100/90'} px-2 md:px-3 py-1 md:py-1.5 rounded-full`}>
                  {recipe.category}
                </span>
                {recipe.average_rating > 0 && (
                  <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">
                      {recipe.average_rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {recipe.name}
              </h3>
              <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-medium">{recipe.prep_time || 15} menit</span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                  <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-medium">{recipe.difficulty || 'mudah'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
