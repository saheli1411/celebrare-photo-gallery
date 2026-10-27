import React, { useState, useReducer, useMemo, useCallback } from 'react';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import { favoritesReducer, loadInitialFavorites, FAVORITES_ACTIONS } from './reducers/favoritesReducer';
import { PhotoCard } from './components/PhotoCard';
import { Search, Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, dispatchFavorites] = useReducer(favoritesReducer, [], loadInitialFavorites);

  // Requirement 7: useCallback for search filter handler
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Requirement 5: dispatch action to toggle favorite
  const handleToggleFavorite = useCallback((id) => {
    dispatchFavorites({ type: FAVORITES_ACTIONS.TOGGLE_FAVORITE, payload: id });
  }, []);

  // Requirement 7: useMemo to compute filtered photos
  const filteredPhotos = useMemo(() => {
    if (!searchTerm.trim()) return photos;
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }, [photos, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Photo Gallery
          </h1>
          {/* Requirement 4: Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by author name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-3" />
            <p className="text-base font-medium">Loading photos...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-md mx-auto my-12 p-4 rounded-xl border border-red-200 bg-red-50 flex items-start space-x-3 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
            <div>
              <h3 className="text-sm font-semibold">Error Loading Photos</h3>
              <p className="text-sm mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Requirement 3: Responsive Grid (1 col mobile, 2 col tablet, 4 col desktop) */}
        {!loading && !error && (
          <>
            {filteredPhotos.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <p className="text-lg">No photos found matching "{searchTerm}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPhotos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavorite={favorites.includes(photo.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
