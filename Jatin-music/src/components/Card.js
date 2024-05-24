import React, { useContext, useEffect } from "react";
import { MusicContext } from "../Context";

function Card({ element }) {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const setlikedMusic = musicContext.setLikedMusic;
  const pinnedMusic = musicContext.pinnedMusic;
  const setpinnedMusic = musicContext.setPinnedMusic;

  const handlePin = () => {
    let pinnedMusic = localStorage.getItem("pinnedMusic");
    pinnedMusic = JSON.parse(pinnedMusic);
    let updatedPinnedMusic = [];
    if (pinnedMusic.some((item) => item.id === element.id)) {
      updatedPinnedMusic = pinnedMusic.filter((item) => item.id !== element.id);
      setpinnedMusic(updatedPinnedMusic);
      localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
    } else {
      if (pinnedMusic.length >= 4) {
      }
      updatedPinnedMusic = pinnedMusic;
      updatedPinnedMusic.push(element);
      setpinnedMusic(updatedPinnedMusic);
      localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
    }
  };

  const handleLike = () => {
    let likedMusic = localStorage.getItem("likedMusic");
    likedMusic = JSON.parse(likedMusic);
    let updatedLikedMusic = [];
    if (likedMusic.some((item) => item.id === element.id)) {
      updatedLikedMusic = likedMusic.filter((item) => item.id !== element.id);
      setlikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
    } else {
      updatedLikedMusic = likedMusic;
      updatedLikedMusic.push(element);
      setlikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
    }
  };

  useEffect(() => {
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic"));
    setlikedMusic(localLikedMusic);
  }, [setlikedMusic]);

  return (
    <div key={element.id} className="col-lg-3 col-md-6 py-2">
      <div className="card">
        <div className="ratio ratio-1x1 bg-white bg-opacity-100">
          <img
            src={element.album.images[0].url}
            className="card-img-top bg-white"
            alt="..."
          />
        </div>

        <div className="card-body bg-white">
          <h5 className="card-title d-flex justify-content-between bg-white">
            {element.name}
            <div className="add-options d-flex align-items-start bg-white">
              {pinnedMusic.some((item) => item.id === element.id) ? (
                <button
                  onClick={handlePin}
                  className="btn btn-outline-dark mx-1 bg-black"
                >
                  <i className="bi bi-pin-angle-fill bg-black"></i>
                </button>
              ) : (
                <button
                  onClick={handlePin}
                  className="btn btn-outline-dark mx-1 bg-black"
                >
                  <i className="bi bi-pin-angle bg-black bg-black"></i>
                </button>
              )}
              {likedMusic.some((item) => item.id === element.id) ? (
                <button onClick={handleLike} className="btn btn-outline-dark bg-black">
                  <i className="bi bi-heart-fill text-danger bg-black"></i>
                </button>
              ) : (
                <button onClick={handleLike} className="btn btn-outline-dark bg-black ">
                  <i className="bi bi-heart bg-black"></i>
                </button>
              )}
              
              <div className="dropdown mx-1">
                <button
                  className="btn btn-secondary dropdown-toggle bg-black"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-list bg-black"></i>
                </button>
                <ul className="dropdown-menu bg-black">
                  <li>
                    {pinnedMusic.some((item) => item.id === element.id) ? (
                      <button
                        onClick={handlePin}
                        className="dropdown-item text-secondary"
                      >
                        Unpin
                      </button>
                    ) : (
                      <button
                        onClick={handlePin}
                        className="dropdown-item text-secondary"
                      >
                        Pin
                      </button>
                    )}
                  </li>

                  <li>
                    <button className="dropdown-item text-secondary">
                      Your Playlist
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </h5>
          <p className="card-text bg-white">Artist: {element.album.artists[0].name}</p>
          <p className="card-text bg-white">
            Release date: {element.album.release_date}
          </p>
          <audio src={element.preview_url} controls className="w-100 bg-white"></audio>
        </div>
      </div>
    </div>
  );
}

export default Card;
