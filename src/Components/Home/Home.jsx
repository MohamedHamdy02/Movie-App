
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MediaItem from '../MediaItem/MediaItem';
import { Helmet } from 'react-helmet';
import ReactPaginate from "react-paginate";


export default function Home() {

  const [trendingMovies, setTrendingMovies] = useState([]);

  const [trendingTv, setTrendingTv] = useState([]);

  const [trendingPerson, setTrendingPerson] = useState([]);

  const [pageNumber, setPageNumber] = useState(sessionStorage.getItem('pages') ? JSON.parse(sessionStorage.getItem('pages')) : { movie: 1, tv: 1, person: 1 })

  async function getTrending(media_type, callback, pageNumber) {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/${media_type}/week?api_key=f1aca93e54807386df3f6972a5c33b50&page=${pageNumber}&language=en-US`
    );
    callback(data.results);
  };

  async function searchAll(e) {
    if (e.target.value) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&query=${e.target.value}&page=1&include_adult=false`
      );
      setTrendingMovies(data.results);
    } else {
      getTrending('movie', setTrendingMovies, pageNumber.movie);
    }
  };

  useEffect(() => {
    getTrending('movie', setTrendingMovies, pageNumber.movie);
    getTrending('tv', setTrendingTv, pageNumber.tv);
    getTrending('person', setTrendingPerson, pageNumber.person);
    sessionStorage.setItem("pages", JSON.stringify(pageNumber));
  }, [pageNumber]);

  function pageClickHandler(e) {
    setPageNumber(prevPage => ({ ...prevPage, tv: e.selected + 1, movie: e.selected + 1, person: e.selected + 1 }))
  };

  function increaseMovieClickHandler() {
    setPageNumber(prevPage => ({ ...prevPage, movie: prevPage.movie + 1 }))
  };
  function decreaseMovieClickHandler() {
    setPageNumber(prevPage => ({ ...prevPage, movie: prevPage.movie - 1 }))
  };


  function increaseTvClickHandler() {
    setPageNumber(prevPage => ({ ...prevPage, tv: prevPage.tv + 1 }))
  };
  function decreaseTvClickHandler() {
    setPageNumber(prevPage => ({ ...prevPage, tv: prevPage.tv - 1 }))
  };

  return <>
    <div>
      <input
        onChange={searchAll}
        className="form-control mt-5"
        type="search"
        placeholder="Search ...."
        aria-label="Search"
      />
    </div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Home Page</title>
    </Helmet>

    <div className="row py-5">
      <div className="col-md-4">
        <div className='movies d-flex h-100 flex-column justify-content-center'>
          <div className='border w-25 mb-3'></div>
          <h2 className='h3'>Trending <br /> movies <br /> to watch now</h2>
          <p className='py-2 text-muted'>Most watched movies by days</p>
          <div className='border w-75 mb-4'></div>
        </div>
      </div>
      {trendingMovies.filter((movie) => movie.poster_path !== null).slice(0, 10).map((item, index) => <MediaItem key={index} item={item} />)}
      <ul className="pagination d-flex justify-content-center mb-0 mt-4">
        {pageNumber.movie > 1 ? <li onClick={decreaseMovieClickHandler} className="page-item cursor-pointer ">
          <a className="page-link" tabIndex="-1" aria-disabled="true">Previous</a>
        </li> : <li className="page-item disabled">
          <a className="page-link" tabIndex="-1" aria-disabled="true">Previous</a>
        </li>}
        <li onClick={increaseMovieClickHandler} className="page-item cursor-pointer ">
          <a className="page-link">Next</a>
        </li>
      </ul>
    </div>

    <div className="row py-5">
      <div className="col-md-4">
        <div className='tv d-flex h-100 flex-column justify-content-center'>
          <div className='border w-25 mb-3'></div>
          <h2 className='h3'>Trending <br /> tv shows <br /> to watch now</h2>
          <p className='py-2 text-muted'>Most watched tv by days</p>
          <div className='border w-75 mb-4'></div>
        </div>
      </div>
      {trendingTv.filter((tv) => tv.poster_path !== null).slice(0, 10).map((item, index) => <MediaItem key={index} item={item} />)}
      <ul className="pagination d-flex justify-content-center my-5">
        {pageNumber.tv > 1 ? <li onClick={decreaseTvClickHandler} className="page-item cursor-pointer ">
          <a className="page-link" tabIndex="-1" aria-disabled="true">Previous</a>
        </li> : <li className="page-item disabled">
          <a className="page-link" tabIndex="-1" aria-disabled="true">Previous</a>
        </li>}
        <li onClick={increaseTvClickHandler} className="page-item cursor-pointer ">
          <a className="page-link">Next</a>
        </li>
      </ul>
    </div>

    <div className="row ">
      <div className="col-md-4">
        <div className='person d-flex h-100 flex-column justify-content-center'>
          <div className='border w-25 mb-3'></div>
          <h2 className='h3'>Trending <br /> people <br /> to watch now</h2>
          <p className='py-2 text-muted'>Most watched people by days</p>
          <div className='border w-75 mb-4'></div>
        </div>
      </div>
      {trendingPerson.filter((person) => person.profile_path !== null).slice(0, 10).map((item, index) => <MediaItem key={index} item={item} />)}
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
}
