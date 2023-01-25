import {isEmpty} from 'lodash';
import {RiDeleteBinLine, RiEditLine} from 'react-icons/ri';

import ImageRender from './ImageRender';

import * as styled from './MovieList.styled';

interface Props {
  movies: Movie[];
  onEditMovie: (movie: Movie) => void;
  confirmDeleteMovie: (id: number) => void;
}

function MovieList({movies, onEditMovie, confirmDeleteMovie}: Props) {
  const anyMovies = !isEmpty(movies);

  if (!anyMovies) return <styled.noMovies>No movies.</styled.noMovies>;

  function updateMovie(movie: Movie) {
    onEditMovie(movie);
  }

  function renderMovie(movie: Movie) {
    return (
      <styled.movieRow key={movie.id}>
        <styled.imageContainer>
          <ImageRender url={movie.posterUrl} title={movie.title} />
        </styled.imageContainer>

        <styled.content>
          <styled.header>
            <styled.actionLink variant="link" onClick={() => updateMovie(movie)}>
              {movie.title}
            </styled.actionLink>
            <styled.actionButton variant="outline-secondary" size="sm" onClick={() => confirmDeleteMovie(movie.id)}>
              <RiDeleteBinLine />
            </styled.actionButton>
            <styled.actionButton variant="outline-secondary" size="sm" onClick={() => updateMovie(movie)}>
              <RiEditLine />
            </styled.actionButton>
          </styled.header>

          <styled.info>
            {movie.year}
            <span>{movie.runtime + ' min.'}</span>
            <span>{movie.genres.join(', ')}</span>
          </styled.info>

          <styled.actors>
            {movie.director}
            <span>{movie.actors}</span>
          </styled.actors>

          <styled.plot>{movie.plot}</styled.plot>
        </styled.content>
      </styled.movieRow>
    );
  }

  function render() {
    return <styled.container>{movies.map(movie => renderMovie(movie))}</styled.container>;
  }

  return render();
}

export default MovieList;
