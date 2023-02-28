import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth.jsx";
import Player from "../components/Player.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import SideBar from "../components/Sidebar.jsx";

const spotifyApi = new SpotifyWebApi({
  clientId: "501daf7d1dfb43a291ccc64c91c8a4c8",
});

export default function Dashboard({ code }) {
  const [playingTrack, setPlayingTrack] = useState();
  const [page, setPage] = useState("top-artists");

  const [scrollTop, setScrollTop] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(900);
  const [clientHeight, setClientHeight] = useState(0);

  const accessToken = useAuth(code);
  console.log(code);

  function choosePage(page) {
    setPage(page);
  }

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  // grab the scroll positioning in the parent and then it's easier to utilize later on
  function handleScroll(event) {
    setScrollTop(event.currentTarget.scrollTop);
  }

  return (
    <section className="h-screen font-Rubik">
      <div className="flex h-[89%]">
        {accessToken ? (
          <SideBar
            accessToken={accessToken}
            page={page}
            handleClick={choosePage}
          />
        ) : null}

        <div
          onScroll={handleScroll}
          className="pt-4 w-full flex-grow h-full items-center justify-center overflow-y-scroll"
        >
          <Outlet
            context={{
              accessToken: accessToken,
              chooseTrack: chooseTrack,
              scrollTop: scrollTop,
              offsetHeight: offsetHeight,
              clientHeight: clientHeight,
            }}
          />
        </div>
      </div>

      <footer className="sticky bottom-0">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </footer>
    </section>
  );
}