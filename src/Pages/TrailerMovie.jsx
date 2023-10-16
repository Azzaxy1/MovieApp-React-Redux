import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrailerMovie = () => {
  const { movieId } = useParams();
  const [trailerMovie, setTrailerMovie] = useState([]);
  const [backgruondMovie, setbackgruondMovie] = useState([]);
  const IMAGE_PATH = import.meta.env.VITE_API_IMGURL_HEADER;

  //Fungsi untuk mengambil API  Video Trailer
  useEffect(() => {
    const getTrailerMovie = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response.data;

        setTrailerMovie(data?.videos[0]);
        setbackgruondMovie(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error?.response?.data?.status_message);
          return;
        }
        alert(error?.status_message);
      }
    };
    getTrailerMovie();
  }, [movieId]);

  return (
    <div className="relative w-full min-h-screen">
      <img
        className="w-full h-screen bg-cover bg-no-repeat bg-center blur-sm"
        src={`${IMAGE_PATH}${backgruondMovie?.backdrop_path}`}
      />
      <iframe
        title="Movie Trailer"
        className="w-full h-full py-36 px-5 mt-10 md:px-16 md:py-28 xl:py-24 xl:px-52 absolute top-0 flex items-center justify-center"
        src={`https://www.youtube.com/embed/${trailerMovie?.key}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default TrailerMovie;
