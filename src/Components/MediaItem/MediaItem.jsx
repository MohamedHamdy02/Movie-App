import React from "react";
import { Link } from "react-router-dom";

export default function MediaItem({ item }) {
  return (
    <>
      <div className="col-md-2">
        <Link to={`/itemdetails/${item.id}/${item.media_type}`}>
          <div className="movie text-white position-relative overflow-hidden">
            {item.poster_path ?
              <img
                src={"https://image.tmdb.org/t/p/w500/" + item.poster_path}
                className="w-100"
                alt="img"
              />
              :
              <img
                src={"https://image.tmdb.org/t/p/w500/" + item.profile_path}
                className="w-100 "
                alt="img"
              />
            }
            {item.overview ? <div className="overlay px-1 py-5 position-absolute">
              {item.overview?.split(" ").splice(0, 25).join(" ")}
            </div> : ''}

            {item.vote_average > 0 ? <div className="vote p-2 text-white position-absolute top-0 end-0">
              {item.vote_average.toFixed(1)}</div> : ''}
          </div>
          <h3 className="h6 my-4 text-center text-info">
            {item.title} {item.name}
          </h3>
        </Link>
      </div>
    </>
  );
}
