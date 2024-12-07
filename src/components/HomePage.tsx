import Clonebg from "../assets/clonebg.jpg";
import { IoSearch } from "react-icons/io5";
import { suggessitions } from "../utils/Suggessition";
// import { images } from "../images/Image";
import axios from "axios";
import { useEffect, useState } from "react";
import { proposal } from "../proposal/Proposal";

type pixabayResponse = {
  webformatURL: string;
  id: number;
  largeImageURL: string;
};

type pixbayVideoResponse = {
  url: string;
  id: number;
};

const HomePage = () => {
  const key = import.meta.env.VITE_API_KEY;
  const videoKey = import.meta.env.VITE_PIXABAY_VIDEO_API_KEY;

  const [storedApiData, setStoredApiData] = useState<pixabayResponse[]>([]);
  const [videosApiData, setVideosApiData] = useState<pixbayVideoResponse[]>([]);
  // const [clickedImages, setClickedImages] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [imageSize, setImageSize] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  // console.log(suggessitions);
  // console.log(import.meta.env.VITE_API_KEY);

  // console.log(images[0]);
  // let url = `https://pixabay.com/api/?key=${key}&q=&image_type=photo&per_page=20&safesearch=true`;
  // console.log(url);

  async function handleCallApi() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${key}&image_type=photo&per_page=20&safesearch=true`
      );
      if (response.status === 200) {
        setStoredApiData(response.data.hits);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async function handleSuggesitionsApi() {
  //   try {
  //     const response = await axios.get(
  //       `https://pixabay.com/api/?key=${key}&q=${clickedImages}&image_type=photo&per_page=20&safesearch=true`
  //     );
  //     if (response.status === 200) {
  //       setStoredApiData(response.data.hits);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function handleInputApi() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${key}&q=${inputValue}&image_type=photo&per_page=20&safesearch=true`
      );
      if (response.status === 200) {
        setStoredApiData(response.data.hits);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleCallApi();
  }, []);

  // useEffect(() => {
  //   handleSuggesitionsApi();
  // }, [clickedImages]);

  async function handleClickData(item: string) {
    // setClickedImages(item);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${key}&q=${item}&image_type=photo&per_page=20&safesearch=true`
      );
      if (response.status === 200) {
        setStoredApiData(response.data.hits);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSearchClick() {
    handleInputApi();
    setInputValue("");
    console.log("hiiii ");
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    // look for the Enter keyCode
    if (event.keyCode === 13 || event.which === 13) {
      handleInputApi();
      setInputValue("");
    }
  };

  function handleImageSize(item: string) {
    window.open(item, "_blank");
    setImageSize(item);
    console.log(item);
  }

  async function handleProposal(item: string) {
    console.log(item);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/videos/?key=${videoKey}&q=${item}&image_type=film&per_page=20&safesearch=true`
      );
      if (response.status === 200) {
        console.log(response.data.hits[0].videos.medium.url);
        setVideosApiData(response.data.hits);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function handleLoading() {
  //   setLoadingImage(!loadingImage);
  //   console.log("loading...");
  // }
  // console.log(clickedImages);
  // console.log(inputValue);
  return (
    <main
      style={{ backgroundImage: `url(${Clonebg})` }}
      className=" h-[520px] bg-no-repeat bg-[rgba(25,27,38,0.5)]"
    >
      <section className="h-[520px] bg-[rgba(25,27,38,0.5)]">
        <div className="flex justify-between px-6 py-4">
          <div>
            <h2 className="text-white text-3xl font-bold">PIXABAY</h2>
          </div>
          {/* <div>Explore</div> */}
        </div>

        {/* </section> */}
        <div className="w-[800px] flex flex-col gap-7 mt-24 ml-auto mr-auto max-sm:w-auto">
          <div>
            <h1 className="text-center text-white text-3xl font-bold">
              Stunning royalty-free images & royalty-free stock
            </h1>
          </div>
          <div className="flex justify-around">
            {proposal.map((item, ind) => (
              <div
                key={ind}
                className="hover:bg-[rgba(25,27,38,.04)] p-2 rounded-2xl bg-transparent"
              >
                <div
                  className="text-white font-normal cursor-pointer"
                  onClick={() => handleProposal(item)}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 bg-white text-center opacity-50 text-white p-4 rounded-full bg-[hsla(0,0%,100%,.4)]">
            <IoSearch
              className="text-xl text-black cursor-pointer"
              onClick={handleSearchClick}
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              // @ts-ignore
              onKeyPress={handleKeyPress}
              placeholder="Search for free image, Videos, Music & more"
              className="w-full border-none outline-none text-[15px]  placeholder-[#191b26] bg-[hsla(0,0%,100%,0.24)] focus:opacity-25"
            />
          </div>
          <div>
            <ul className="h-[30px] flex items-center gap-2 font-normal  text-[14px] text-nowrap cursor-pointer max-sm:overflow-auto">
              {suggessitions.map((item, ind) => (
                <div key={ind}>
                  <li className="text-white rounded-lg p-2 font-base bg-opacity-100 bg-[hsla(0,0%,100%,.24)] hover:bg-[hsla(0,0%,100%,.4)]">
                    <div onClick={() => handleClickData(item)}>{item}</div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-between px-6 mt-20">
          <p className="text-white text-[12px]">
            Free image by{" "}
            <a href="#" className="border-b border-white">
              Engin Akyurt
            </a>
          </p>
          <p className="text-white text-[12px]">
            Read more about the{" "}
            <a href="#" className="border-b border-white">
              Content License
            </a>
          </p>
        </div>
      </section>
      <section className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4 p-4">
        {storedApiData &&
          storedApiData.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer mb-4 break-inside-avoid"
            >
              <img
                src={item.webformatURL}
                alt="images"
                className="w-full h-auto object-cover rounded-md"
                onClick={() => handleImageSize(item.largeImageURL)}
                loading="lazy"
              />
            </div>
          ))}
      </section>
      <section className="columns-1 sm:columns-2 lg:columns-3 p-4 gap-4">
        {videosApiData &&
          videosApiData.map((item) => (
            <div key={item.id} className="cursor-pointer mb-4">
              <video controls>
                <source
                  src={item.videos.medium.url}
                  type="video/mp4"
                  className="w-full h-auto object-cover rounded-md"
                />
              </video>
            </div>
          ))}
      </section>
      {/* <button type="button" onClick={handleCallApi}>
        click me!
      </button> */}
    </main>
  );
};

export default HomePage;
