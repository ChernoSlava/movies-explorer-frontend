import './SavedMovies.css';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { SearchForm } from '../Movies/SearchForm';
import { MoviesCardList } from '../Movies/MoviesCardList';

export function SavedMovies({ loggedIn, films, onSave }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="saved-movies">
        <SearchForm />
        <MoviesCardList films={films} onSave={onSave} />
      </section>
      <Footer />
    </>
  );
};
