import React, { useEffect, useState } from "react";
import axios from "axios";
import MediaItem from "../MediaItem/MediaItem";
import { Helmet } from 'react-helmet';
import ReactPaginate from "react-paginate";

export default function Tv() {
  const [tv, setTv] = useState([]);

  async function getTvApi(pageNumber) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=f1aca93e54807386df3f6972a5c33b50&page=${pageNumber}`
    );
    setTv(data.results);
  }

  async function searchTv(e) {
    if (e.target.value) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&query=${e.target.value}&page=1&include_adult=false`
      );
      setTv(data.results);
    } else {
      getTvApi(1);
    }
  }

  useEffect(() => {
    getTvApi(1);
  }, []);

  function pageClickHandler(data) {
    getTvApi(data.selected + 1);
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>TV Page</title>
      </Helmet>
      <div>
        <input
          onChange={searchTv}
          className="form-control mt-5"
          type="search"
          placeholder="Search ...."
          aria-label="Search"
        />
      </div>
      <div className="row py-5">
        <div className="col-md-4">
          <div className="tv d-flex h-100 flex-column justify-content-center">
            <div className="border w-25 mb-3"></div>
            <h2 className="h3">
              Trending <br /> tv shows <br /> to watch now
            </h2>
            <p className="py-2 text-muted">Most watched tv shows by days</p>
            <div className="border w-75 my-4"></div>
          </div>
        </div>
        {tv
          .filter((item) => item.poster_path !== null)
          .map((item, index) => (
            <MediaItem key={index} item={item} />
          ))}

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
      </div>
    </>
  );
}
