import moviesData from 'data/db.json';

const exports = {
  getMovies,
  deleteMovie,
  saveMovie,
  getGenres
};

const PAGE_SIZE = 10;

function getMovies(page: number, sortBy: string, searchStr: string) {
  const movies = searchMovies(getMappedMovies(), searchStr);

  sortMovies(movies, sortBy);

  const result = getPage(movies, page, PAGE_SIZE);

  return Promise.resolve({
    total: movies.length,
    dataItems: result
  });
}

function sortMovies(movies: Movie[], sortBy: string) {
  if (sortBy === 'title') {
    movies.sort((x, y) => x.title.localeCompare(y.title));
  }

  if (sortBy === 'year') {
    movies.sort((x: any, y: any) => x.year - y.year);
  }

  if (sortBy === 'runtime') {
    movies.sort((x: any, y: any) => x.runtime - y.runtime);
  }
}

function searchMovies(movies: Movie[], searchStr: string) {
  if (!searchStr) return movies;

  const textSearchFields: string[] = ['title', 'year', 'actors', 'director', 'plot'];

  return movies.filter((movie: any) => {
    for (const field of textSearchFields) {
      if (containsString(movie[field], searchStr)) return true;
    }

    for (const genre of movie.genres) {
      if (containsString(genre, searchStr)) return true;
    }

    return false;
  });
}

function containsString(obj: any, searchStr: string) {
  return obj.toString().toLowerCase().indexOf(searchStr.toLowerCase()) !== -1;
}

function getPage(movies: Movie[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  const end = page * perPage;
  return movies.slice(start, end);
}

function deleteMovie(id: number) {
  let movies = moviesData.movies;

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === id) {
      movies.splice(i, 1);
    }
  }

  return Promise.resolve(null);
}

function saveMovie(movie: Movie) {
  if (movie.id) return updateMovie(movie);

  return addMovie(movie);
}

function updateMovie(movie: any) {
  let movies = moviesData.movies;

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === movie.id) {
      movies[i] = movie;
    }
  }

  return Promise.resolve(null);
}

function addMovie(movie: any) {
  let movies = moviesData.movies;

  let maxId = 0;

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id > maxId) {
      maxId = movies[i].id;
    }
  }

  movie.id = maxId + 1;

  movies.push(movie);

  return Promise.resolve(null);
}

function getGenres() {
  return Promise.resolve(moviesData.genres);
}

// helper methods

function getMappedMovies(): Movie[] {
  const movies = moviesData.movies;

  return movies.map(item => {
    return {
      ...item,
      year: Number(item.year),
      runtime: Number(item.runtime)
    };
  });
}

export default exports;
