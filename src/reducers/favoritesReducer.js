export const FAVORITES_ACTIONS = {
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
};

export const loadInitialFavorites = () => {
  try {
    const saved = localStorage.getItem('celebrate_fav_photos');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error('Failed to parse favorites from localStorage', err);
    return [];
  }
};

export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case FAVORITES_ACTIONS.TOGGLE_FAVORITE: {
      const photoId = action.payload;
      const isFav = state.includes(photoId);
      const updatedState = isFav
        ? state.filter((id) => id !== photoId)
        : [...state, photoId];

      localStorage.setItem('celebrate_fav_photos', JSON.stringify(updatedState));
      return updatedState;
    }
    default:
      return state;
  }
};