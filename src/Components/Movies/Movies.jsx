import React, { useEffect, useState } from "react";
import axios from "axios";
import MediaItem from '../MediaItem/MediaItem';
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet";

export default function Movies() {

  const [movies, setMovies] = useState([]);

  async function getMoviesApi(pageNumber) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=f1aca93e54807386df3f6972a5c33b50&page=${pageNumber}`
    );
    setMovies(data.results);
  }

  async function searchMovie(e, pageNumber) {
    console.log(e.target.value);
    if (e.target.value) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&query=${e.target.value}&page=${pageNumber}&include_adult=false`
      );
      setMovies(data.results);
    } else {
      getMoviesApi(1);
    }
  }

  useEffect(() => {
    getMoviesApi(1);
  }, []);

  function pageClickHandler(data) {
    getMoviesApi(data.selected + 1);
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Movies Page</title>
      </Helmet>
      <div>
        <input
          onChange={searchMovie}
          className="form-control mt-5"
          type="search"
          placeholder="Search ...."
          aria-label="Search"
        />
      </div>
      <div className="row py-5">
        <div className="col-md-4">
          <div className="movies d-flex h-100 flex-column justify-content-center">
            <div className="border w-25 mb-3"></div>
            <h2 className="h3">
              Trending <br /> movies <br /> to watch now
            </h2>
            <p className="py-2 text-muted">Most watched movies by days</p>
            <div className="border w-75 my-4"></div>
          </div>
        </div>
        {movies.filter((movie) => movie.poster_path !== null).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakLinkClassName={'page-link'}
        breakClassName={'page-item'}
        pageCount={20}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={pageClickHandler}
        containerClassName={'pagination justify-content-center mt-5'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </>
  );
}
