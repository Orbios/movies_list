import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';

import SORT_BY from 'constants/sortBy';

import notificationHelper from 'helpers/notificationHelper';

import movieService from 'services/movieServiceStubs';

import Confirm from 'components/common/Confirm';
import FilterBar from 'components/filter_bar/FilterBar';
import MovieList from 'components/movie_list/MovieList';
import EditMovie from 'components/edit_movie/EditMovie';

import * as styled from './App.styled';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [movieToDeleteId, setMovieToDeleteId] = useState<number | null>(null);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

  const [activePage, setActivePage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>(SORT_BY.TITLE);
  const [searchStr, setSearchStr] = useState<string>('');

  useEffect(() => {
    loadGenres();
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, activePage, searchStr]);

  async function loadGenres() {
    const genresList = await movieService.getGenres();
    setGenres(genresList);
  }

  async function loadMovies() {
    const response = await movieService.getMovies(activePage, sortBy, searchStr);

    setMovies(response.dataItems);
    setTotal(response.total);
  }

  function sortByAction(key: string) {
    setSortBy(key);
    setActivePage(1);
  }

  function onSearch(searchString: string) {
    setSearchStr(searchString);
    setActivePage(1);
  }

  function onReset() {
    setSearchStr('');
    setActivePage(1);
    setSortBy(SORT_BY.TITLE);
  }

  function onPageSelection(page: number) {
    setActivePage(page);
  }

  function confirmDeleteMovie(id: number) {
    setMovieToDeleteId(id);
  }

  async function deleteMovie() {
    if (!movieToDeleteId) return;

    await movieService.deleteMovie(movieToDeleteId);

    notificationHelper.message('Movie was deleted');

    await loadMovies();

    cancelDeleteMovie();
  }

  function cancelDeleteMovie() {
    setMovieToDeleteId(null);
  }

  function updateMovieState(field: string, value: any) {
    if (!movieToEdit) return;

    setMovieToEdit({...movieToEdit, [field]: value});
  }

  function onAddMovie() {
    setMovieToEdit({
      id: 0,
      title: '',
      year: 2016,
      runtime: 120,
      genres: [],
      director: '',
      actors: '',
      plot: '',
      posterUrl: ''
    });
  }

  function onEditMovie(movie: Movie) {
    setMovieToEdit(movie);
  }

  async function saveMovie() {
    if (!movieToEdit) return;

    await movieService.saveMovie(movieToEdit);

    notificationHelper.message('Movie was saved');

    await loadMovies();

    cancelEditMovie();
  }

  function cancelEditMovie() {
    setMovieToEdit(null);
  }

  function render() {
    const deleteConfirmVisible = movieToDeleteId ? true : false;
    const editMovieVisible = movieToEdit ? true : false;

    return (
      <styled.wrapper>
        <Container>
          <FilterBar
            total={total}
            activePage={activePage}
            sortBy={sortBy}
            searchStr={searchStr}
            sortByAction={sortByAction}
            onSearch={onSearch}
            onReset={onReset}
            onPageSelection={onPageSelection}
            onAddMovie={onAddMovie}
          />

          <MovieList movies={movies} confirmDeleteMovie={confirmDeleteMovie} onEditMovie={onEditMovie} />

          {deleteConfirmVisible && (
            <Confirm visible={deleteConfirmVisible} action={deleteMovie} close={cancelDeleteMovie} />
          )}

          {editMovieVisible && movieToEdit && (
            <EditMovie
              visible={editMovieVisible}
              genres={genres}
              movie={movieToEdit}
              onChange={updateMovieState}
              close={cancelEditMovie}
              save={saveMovie}
            />
          )}
        </Container>
      </styled.wrapper>
    );
  }

  return render();
}

export default App;
