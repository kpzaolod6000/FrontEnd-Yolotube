import React, { useEffect, useState } from "react";
import {Link, Route, useParams, Routes, useNavigate, Outlet } from "react-router-dom";
import ChannelPlaylistSection from "../components/ChannelPlaylistSection";
import dummy from "../components/dummychannel.json";
import VideoCard from "../components/VideoCard";
import { api } from "../utils/api";

const ChannelDetail = () => {
  const id = useParams();
  const navigate = useNavigate()
  console.log(id);

  const [data, setData] = useState([]);
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    api(`channels/${id.id}`).then((response) => {
      setData(response);
      setVideoData(response.latestVideos);
    });
  }, [id.id]);
  console.log(data);



  
  return (
    <div
      className="mt-24 ml-6
     mx-4 p-2 flex flex-col"
    >
      {/* gradient banner */}
      {/* <div className="gradientBanner mb-16">
        <div className="banner w-full h-96 rounded-lg overflow-hidden brightness-90 relative">
          {data.authorBanners && (
            <img
              src={data.authorBanners && data.authorBanners[1].url}
              className="object-cover h-full"
            />
          )}
          <div className="absolute z-10 bottom-0  w-full mt-12 ml-5 flex items-center justify-between channeld">
            <div className="flex items-center">
              <div className=" h-24 w-24 rounded-full overflow-hidden">
                {data.authorThumbnails && (
                  <img
                    className="object-cover h-full w-full"
                    src={data.authorThumbnails[4].url}
                  />
                )}
              </div>
              <div className="ml-8">
                {data.author && (
                  <h1
                    className="font-semibold text-2xl
            text-gray-200 py-2 -mt-4"
                  >
                    {data.author}
                  </h1>
                )}
                {data.subCount && (
                  <p className="ml-1">
                    {data.subCount > 1000000
                      ? Math.floor(data.subCount / 1000000) + "M"
                      : Math.floor(data.subCount / 1000) + "k"}{" "}
                    subscribers
                  </p>
                )}
              </div>
              <div className="text-gray-300 font-normal text-lg ml-16">
                Total Views : {data.totalViews}
              </div>
            </div>
            <div className=" cursor-pointer hover:opacity-90 bg-red-500 p-2 px-8 rounded-full center mr-14">
              <h3 className="font-medium text-gray-300">Subscribe</h3>
            </div>
          </div>
          <div
            className="blurgrad absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-gradient-to-t from-bg-secondary
        "
          ></div>
        </div>
      </div> */}
      {/* graient banner end */}
      {/* simple banner start */}
      {/* banner */}
      <div>
        <div className="banner w-full h-72 rounded-2xl overflow-hidden brightness-90 relative">
          {data.authorBanners && (
            <img
              src={data.authorBanners && data.authorBanners[1].url}
              className="object-cover h-full"
            />
          )}
          <div
            className="blurgrad absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-gradient-to-t from-bg-secondary
        "
          ></div>
        </div>

        <div className="w-full mt-12 ml-5 pl-2 flex items-center justify-between channeld">
          <div className="flex items-center">
            <div className=" h-24 w-24 rounded-full overflow-hidden">
              {data.authorThumbnails && (
                <img
                  className="object-cover h-full w-full"
                  src={data.authorThumbnails[4].url}
                />
              )}
            </div>
            <div className="ml-8">
              {data.author && (
                <h1
                  className="font-semibold text-2xl
            text-gray-200 py-2 -mt-4"
                >
                  {data.author}
                </h1>
              )}
              {data.subCount && (
                <p className="ml-1">
                  {data.subCount > 1000000
                    ? Math.floor(data.subCount / 1000000) + "M"
                    : Math.floor(data.subCount / 1000) + "k"}{" "}
                  subscribers
                </p>
              )}
            </div>
            {/* <div className="text-gray-300 font-normal text-lg ml-16">
              Total Views : {data.totalViews}
            </div> */}
          </div>
          <div className=" cursor-pointer hover:opacity-90 bg-red-500 p-2 px-8 rounded-full center mr-14">
            <h3 className="font-medium text-gray-300">Subscribe</h3>
          </div>
        </div>
      </div>
      {/* simple banner end */}
      {/* videos */}
      <div>
        <div className="mt-10 mb-5 ml-2">
          <Link to={`/channel/${id.id}/playlistsection`}>
          <h2 className="font-medium text-xl ">Latest Videos</h2>
          </Link>
          {/* <Routes>
            <Route path="/playlist/:id" exact element={<ChannelPlaylistSection />} />
          </Routes> */}
        </div>
        <div className="flex flex-wrap">
          {videoData.map((item) => {
            return (
              <VideoCard
                videoId={item.videoId}
                title={item.title}
                channelTitle={data.author}
                channelId={id.id}
                viewCount={item.viewCount}
                publishText={item.publishedText}
                lengthText={item.lengthSeconds}
                thumbnail={item.videoThumbnails[3].url}
                channelThumbnail={data.authorThumbnails[1].url}
              />
            );
          })}
        </div>
    <Outlet/>  //this is used to set location of nested component route
      </div>
    </div>
  );
};

export default ChannelDetail;
