import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function ItemDetails() {

  const params = useParams();

  const [change, setChange] = useState(true);

  const [itemDetails, setItemDetails] = useState({});

  const navigate = useNavigate();

  async function getItemDetails() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${params.media_type}/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
    );
    setItemDetails(data);
    console.log(data);
  }

  useEffect(() => {
    getItemDetails();
  },[]);

  function onChangeHandler() {
    setChange((prevState) => {
      return !prevState;
    });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{itemDetails.title || itemDetails.name}</title>
      </Helmet>
      <div className="row d-flex align-items-center mt-5">
        <div className="col-md-3">
          {change ? (
            itemDetails.poster_path && <img
              onClick={onChangeHandler}
              src={"https://image.tmdb.org/t/p/w500/" + itemDetails.poster_path}
              className="w-100"
            />
          ) : (
            <img
              onClick={onChangeHandler}
              src={
                "https://image.tmdb.org/t/p/w500/" + itemDetails.backdrop_path
              }
              className="w-100 height"
            />
          )}
          {itemDetails.profile_path ? (
            <img
              src={
                "https://image.tmdb.org/t/p/w500/" + itemDetails.profile_path
              }
              className="w-100"
              alt="img"
            />
          ) : (
            ""
          )}
        </div>

        <div className="col-md-9">
          <h2 className="my-3">
            {itemDetails.title} {itemDetails.name}
          </h2>

          <h4 className="text-muted mb-3">{itemDetails.tagline}</h4>

          <ul className="list-unstyled d-flex">
            {itemDetails.genres?.map((genre, index) => (
              <div key={index} className="bg-info rounded-2 px-2 me-3">
                {genre.name}
              </div>
            ))}
          </ul>
          {itemDetails.vote_average >= 0 ? (
            <h6 className="py-1">
              vote : {itemDetails.vote_average.toFixed(1)}
            </h6>
          ) : (
            <>
              <h6 className="py-1">
                Known as : {itemDetails.known_for_department}
              </h6>

              <h6 className="py-1">Date of birth : {itemDetails.birthday}</h6>

              <h6 className="py-1">
                Date of birth : {itemDetails.place_of_birth}
              </h6>

              {itemDetails.biography ? (
                <p className="py-1 mb-2">
                  Information About :{" "}
                  {itemDetails.biography.split(" ").splice(0, 50).join(" ")}
                </p>
              ) : (
                ""
              )}
            </>
          )}

          {itemDetails.vote_count >= 0 ? (
            <h6 className="py-1">
              vote count : {itemDetails.vote_count?.toFixed(0)}
            </h6>
          ) : (
            ""
          )}

          <h6 className="py-1">popularity : {itemDetails.popularity}</h6>

          {itemDetails.release_date || itemDetails.first_air_date ? (
            <h6 className="py-1">
              release date : {itemDetails.release_date}{" "}
              {itemDetails.first_air_date}
            </h6>
          ) : (
            ""
          )}
          {itemDetails.number_of_episodes ? (
            <h6 className="py-1">
              Number of episodes : {itemDetails.number_of_episodes}
            </h6>
          ) : (
            ""
          )}

          {itemDetails.number_of_seasons ? (
            <h6 className="py-1">
              Number of seasons : {itemDetails.number_of_seasons}
            </h6>
          ) : (
            ""
          )}

          <p className="py-1 text-muted">{itemDetails.overview}</p>
          <div className="d-flex align-items-center mb-3">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="btn btn-danger"
            >
              Close
            </button>
            {itemDetails.homepage ? <button className="btn btn-info mx-4">
              <a target='_blank' href={itemDetails.homepage}>Watch Now </a>
            </button> : ''}
          </div>
        </div>
      </div>
    </>
  );
}
