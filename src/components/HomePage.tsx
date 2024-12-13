import { IoSearch } from "react-icons/io5";
import { suggessitions } from "../utils/Suggessition";
// import { images } from "../images/Image";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { proposal } from "../proposal/Proposal";
import { pixabayResponse } from "../types/pixabyResponse";

const HomePage = () => {
  const key = import.meta.env.VITE_API_KEY;
  const videoKey = import.meta.env.VITE_PIXABAY_VIDEO_API_KEY;

  const [storedApiData, setStoredApiData] = useState<pixabayResponse[]>([]);
  const [title, setTitle] = useState("photo");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);
  // console.log(suggessitions);
  // console.log(import.meta.env.VITE_API_KEY);

  // console.log(images[0]);
  // let url = `https://pixabay.com/api/?key=${key}&q=&image_type=photo&per_page=20&safesearch=true`;
  // console.log(url);

  async function handleCallApi(page: number) {
    console.log("handlecallapi");
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${key}&image_type=photo&per_page=20&safesearch=true&page=${page}`
      );
      if (response.status === 200) {
        // setStoredApiData(response.data.hits);
        setStoredApiData((prev) => [...prev, ...response.data.hits]);
        // setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleCallApi(page);
  }, []);

  console.log(page);

  async function handleInputApi() {
    console.log("handleInputApi");
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${key}&q=${inputValue}&image_type=photo&per_page=20&safesearch=true&page=${page}`
      );
      if (response.status === 200) {
        // setStoredApiData(response.data.hits);
        setStoredApiData((prev) => [...prev, ...response.data.hits]);
        // setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleClickData(item: string) {
    // setClickedImages(item);
    console.log("handleClickData");

    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${key}&q=${item}&image_type=photo&per_page=20&safesearch=true&page=${page}`
      );
      if (response.status === 200) {
        // setStoredApiData(response.data.hits);
        setStoredApiData((prev) => [...prev, ...response.data.hits]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
    console.log(item);
  }

  async function handleProposal(type: string) {
    // setImageType(item);
    setTitle(type);
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        type === "video"
          ? `https://pixabay.com/api/videos/?key=${videoKey}&video_type=${type}&per_page=20&safesearch=true&page=${page}`
          : `https://pixabay.com/api/?key=${key}&image_type=${type}&per_page=20&safesearch=true&page=${page}`
      );
      if (response.status === 200) {
        // console.log(response.data.hits[0].videos.medium.url);
        // setVideosApiData(response.data.hits);
        // type === "video"
        //   ? setStoredApiData(response.data.hits)
        //   : setStoredApiData(response.data.hits);
        // console.log(response.data.hits);
        type === "video"
          ? setStoredApiData((prev) => [...prev, ...response.data.hits])
          : setStoredApiData((prev) => [...prev, ...response.data.hits]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const imagess = proposal
    .filter((item) => item.qurey === title)
    .map((item) => (item.qurey === title ? item.image : ""));

  // console.log(imagess);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         console.log("Observer target is in view, loading more data");
  //         console.log("hiiiii");
  //         setPage((prevPage) => prevPage + 1);
  //         // handleCallApi();
  //         // handleInputApi();
  //         handleProposal(type);
  //       }
  //     },
  //     {
  //       root: null, // Default to the viewport
  //       rootMargin: "0px", // Trigger when the target element is fully in view
  //       threshold: 1.0, // Trigger when the target element is fully visible
  //     }
  //   );

  //   if (observerTarget.current) {
  //     observer.observe(observerTarget.current);
  //   }

  //   return () => {
  //     if (observerTarget.current) {
  //       observer.unobserve(observerTarget.current);
  //     }
  //   };
  // }, [observerTarget]);

  // useEffect(() => {
  //   console.log("heloooooooooooooooooo");
  //   if (observerTarget.current) {
  //     handleScroll();
  //   }
  // }, [isLoading]);
  // console.log(page);

  // function handleScroll() {
  //   // console.log("hiiiiiiiiiiii");
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         console.log("Observer target is in view, loading more data");
  //         setPage((prevPage) => prevPage + 1);
  //         // console.log(page);
  //         handleCallApi();
  //         // handleInputApi();
  //       }
  //     },
  //     {
  //       root: null, // Default to the viewport
  //       rootMargin: "0px", // Trigger when the target element is fully in view
  //       threshold: 1.0, // Trigger when the target element is fully visible
  //     }
  //   );

  //   if (observerTarget.current) {
  //     observer.observe(observerTarget.current);
  //   }

  //   return () => {
  //     if (observerTarget.current) {
  //       observer.unobserve(observerTarget.current);
  //     }
  //   };
  // }

  // useEffect(() => {
  //   console.log("byeeeeeeeeeeeeeeeeeeeeeee");
  //   handleCallApi();
  // }, [page]);

  // useEffect(() => {
  //   handleCallApi();
  // }, [page]);

  // Function to check if we are at the bottom of the page

  const checkIfAtBottom = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const bottomPosition = document.documentElement.scrollHeight;
    return scrollPosition >= bottomPosition - 1;
  };

  // Load more data when reaching the bottom
  // useEffect(() => {
  //   if (!isLoading && checkIfAtBottom()) {
  //     // setPage((prevPage) => prevPage + 1); // Increment page number for next fetch
  //     handleCallApi(page);
  //   }
  // }, [isLoading, page]);

  // Event listener to handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!isLoading && checkIfAtBottom()) {
        setPage((prevPage) => prevPage + 1); // Increment page number for next fetch
        handleCallApi(page);
        console.log("hiiiii");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, page]);

  return (
    <main
      style={{
        backgroundImage: `url(${imagess})`,
        backgroundSize: "cover",
      }}
      className=" h-[540px]  bg-no-repeat bg-[rgba(25,27,38,0.5)]  max-sm:bg-center"
      // onClick={handleBgImage}
    >
      <section className="h-[540px] w-full bg-[rgba(25,27,38,0.5)]">
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
              {/* Stunning royalty-free images & royalty-free stock */}
              {proposal.map((item, ind) => (
                <div key={ind}>
                  <p>{item.qurey === title ? item.title : ""}</p>
                </div>
              ))}
            </h1>
          </div>
          <div className="flex justify-around">
            {proposal.map((item, ind) => (
              <div key={ind} className="">
                <div
                  className={`${
                    item.qurey === title ? "text-black" : "text-white"
                  } p-2 rounded-full font-medium cursor-pointer ${
                    item.qurey === title
                      ? "bg-white"
                      : "bg-transparent hover:bg-[rgba(25,27,38,.04)]"
                  }`}
                  onClick={() => handleProposal(item.qurey)}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 bg-white text-center opacity-50 hover:hover:bg-[hsla(0,0%,100%,.4)] p-4 rounded-full">
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
              className="w-full border-none outline-none text-[15px] bg-transparent placeholder-[#191b26]"
            />
          </div>
          <div className="overflow-auto no-scrollbar flex items-center gap-2">
            <ul className="h-auto flex items-center gap-2 font-normal  text-[14px] text-nowrap cursor-pointer max-sm:overflow-auto">
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
        <div className="flex justify-between px-6 mt-20 max-sm:px-0 max-sm:text-[6px] max-sm:mt-12 max-sm:flex max-sm:gap-1 max-sm:text-nowrap">
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
          storedApiData.map((item, ind) => (
            <div key={ind} className="cursor-pointer mb-4 break-inside-avoid">
              {item.type === "film" ? (
                <video controls>
                  <source
                    src={item.videos.medium.url}
                    type="video/mp4"
                    className="w-full h-auto object-cover rounded-md"
                  />
                </video>
              ) : (
                <img
                  src={item.webformatURL}
                  alt="images"
                  className="w-full h-auto object-cover rounded-md"
                  onClick={() => handleImageSize(item.largeImageURL)}
                />
              )}
            </div>
          ))}
      </section>
      {/* <div
        ref={observerTarget}
        className="invisible h-1"
        onChange={handleScroll}
      ></div> */}
      <div>
        <p>No more to Load.......</p>
      </div>
      {/* <section className="columns-1 sm:columns-2 lg:columns-3 p-4 gap-4">
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
      </section> */}
      {/* <section className="columns-1 sm:columns-2 lg:columns-3 p-4 gap-4">
        {imagesApiData &&
          imagesApiData.map((item) => (
            <div key={item.id} className="cursor-pointer mb-4">
              <img
                src={item.webformatURL}
                alt="images"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          ))}
      </section> */}
      {/* <div>
        <video controls autoPlay loop className="cursor-pointer">
          <source src="/static/videos/hero3.mp4" type="video/mp4" />
          hiii
        </video>
      </div> */}
    </main>
  );
};

export default HomePage;
