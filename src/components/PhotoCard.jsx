import React from 'react';
import { Heart } from 'lucide-react';

export const PhotoCard = React.memo(({ photo, isFavorite, onToggleFavorite }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-200 hover:shadow-lg flex flex-col">
      <div className="relative w-full pt-[75%] bg-gray-100 overflow-hidden">
        <img
          src={`https://picsum.photos/id/${photo.id}/400/300`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <button
          type="button"
          aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
          onClick={() => onToggleFavorite(photo.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow hover:bg-white transition-colors duration-150 focus:outline-none"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>
      <div className="p-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800 truncate" title={photo.author}>
          {photo.author}
        </span>
      </div>
    </div>
  );
});