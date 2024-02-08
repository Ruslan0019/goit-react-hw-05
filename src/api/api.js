// api.js
const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmM4ZmNlODBkNWY2YWRhNDI2MmIyY2Q0OTQwNTY1MiIsInN1YiI6IjY1NDIzNzExMWFjMjkyMDBlMTE4NGQyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z31pb3WMAG3QsgPH8x9AM27sCQZfGvUnbyhPmGdRJT0';

const apiBaseURL = 'https://api.themoviedb.org/3/';

const getAuthorizationHeader = () => ({
  accept: 'application/json',
  Authorization: `Bearer ${apiKey}`,
});

const handleResponse = response => {
  if (!response.ok) {
    throw new Error('the network response was not valid');
  }
  return response.json();
};

const fetchMovies = async searchQuery => {
  const options = {
    method: 'GET',
    headers: getAuthorizationHeader(),
  };

  try {
    const response = await fetch(
      `${apiBaseURL}search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
      options
    );
    return handleResponse(response).then(data => data.results);
  } catch (error) {
    console.error('error', error);
    return [];
  }
};

const fetchTrendingMovies = async () => {
  const options = {
    method: 'GET',
    headers: getAuthorizationHeader(),
  };

  try {
    const response = await fetch(
      `${apiBaseURL}trending/all/day?language=en-US`,
      options
    );
    return handleResponse(response);
  } catch (error) {
    console.error('error', error);
    return null;
  }
};

const fetchMovieDetails = async movieId => {
  const options = {
    method: 'GET',
    headers: getAuthorizationHeader(),
  };

  try {
    const response = await fetch(
      `${apiBaseURL}movie/${movieId}?language=en-US`,
      options
    );
    return handleResponse(response);
  } catch (error) {
    console.error('error', error);
    return {};
  }
};

const fetchMovieReviews = async movieId => {
  const options = {
    method: 'GET',
    headers: getAuthorizationHeader(),
  };

  try {
    const response = await fetch(
      `${apiBaseURL}movie/${movieId}/reviews?language=en-US&page=1`,
      options
    );
    return handleResponse(response);
  } catch (error) {
    console.error('error', error);
    return {};
  }
};
const fetchMovieCast = async movieId => {
  const options = {
    method: 'GET',
    headers: getAuthorizationHeader(),
  };
  try {
    const response = await fetch(
      `${apiBaseURL}movie/${movieId}/credits?language=en-US`,
      options
    );
    return handleResponse(response);
  } catch (error) {
    console.error('error', error);
    return {};
  }
};

export {
  fetchMovies,
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieReviews,
  fetchMovieCast,
};
