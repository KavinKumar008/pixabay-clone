import { IoSearch } from "react-icons/io5";
import { suggessitions } from "../utils/Suggessition";
// import { images } from "../images/Image";
import axios from "axios";
import { useEffect, useState } from "react";
import { proposal } from "../proposal/Proposal";
import { pixabayResponse } from "../types/pixabyResponse";
import { MdClear } from "react-icons/md";

const HomePage = () => {
  const key = import.meta.env.VITE_API_KEY;
  const videoKey = import.meta.env.VITE_PIXABAY_VIDEO_API_KEY;

  const [storedApiData, setStoredApiData] = useState<pixabayResponse[]>([]);
  const [title, setTitle] = useState("photo");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedData, setClickedData] = useState("");
  const [imageSuggessition, setImageSuggessition] = useState("");

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
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleInputApi(qurey: string, page: number) {
    console.log("handleInputApi");
    setPage(1);
    setStoredApiData([]);
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${key}&q=${qurey}&image_type=photo&per_page=20&safesearch=true&page=${page}`
      );
      if (response.status === 200) {
        setStoredApiData((prev) => [...prev, ...response.data.hits]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleClickData(item: string) {
    setInputValue("");
    console.log("handleClickData");
    setStoredApiData([]); // Clear previous data
    setPage(1); // Reset to page 1
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${key}&q=${item}&image_type=photo&per_page=20&safesearch=true&page=${1}`
      );
      if (response.status === 200) {
        setStoredApiData((prev) => [...prev, ...response.data.hits]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearchClick() {
    if (!inputValue.trim()) return; // Prevent search if the input is empty
    setStoredApiData([]); // Clear previous data (if needed)
    setPage(1); // Reset the page to the first one for a fresh search
    handleInputApi(inputValue, page); // Pass 1 for the first page load
    // setInputValue(""); // Optionally clear the input after submission
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setStoredApiData([]); // Clear previous data
      setPage(1); // Reset page to 1
      handleInputApi(inputValue, page); // Call API on pressing Enter
    }
  };

  function handleImageSize(item: string) {
    window.open(item, "_blank");
    console.log(item);
  }

  async function handleProposal(type: string, page: number) {
    setInputValue("");
    setStoredApiData([]);
    setPage(1);
    setTitle(type);
    if (isLoading) return;
    setIsLoading(true);

    try {
      // setPage(1);
      console.log("proposal called");
      const response = await axios.get(
        type === "video"
          ? `https://pixabay.com/api/videos/?key=${videoKey}&video_type=${type}&per_page=20&safesearch=true&page=${page}`
          : `https://pixabay.com/api/?key=${key}&image_type=${type}&per_page=20&safesearch=true&page=${page}`
      );
      if (response.status === 200) {
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

  // Function to check if we are at the bottom of the page

  const checkIfAtBottom = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const bottomPosition = document.documentElement.scrollHeight;
    return scrollPosition >= bottomPosition - 1;
  };

  // Infinite Scroll using useEffect
  useEffect(() => {
    const handleScroll = () => {
      if (!isLoading && checkIfAtBottom()) {
        console.log("Loading more data............");
        setPage((prevPage) => prevPage + 1); // Increment the page number to load more data
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]); // Add dependencies to manage state changes
  console.log(inputValue);
  useEffect(() => {
    console.log("Page updated :", page);
    // Call the function based on the current condition
    if (clickedData) {
      handleProposalApi();
    } else if (inputValue) {
      handleProposalApi();
    } else if (imageSuggessition) {
      handleProposalApi();
    } else {
      handleCallApi(page);
    }
  }, [page]);

  async function handleProposalApi() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        clickedData === "video"
          ? `https://pixabay.com/api/videos/?key=${videoKey}&video_type=${clickedData}&per_page=20&safesearch=true&page=${page}`
          : `https://pixabay.com/api/?key=${key}&q=${
              imageSuggessition === "" ? inputValue : imageSuggessition
            }&image_type=${clickedData}&per_page=20&safesearch=true&page=${page}`
      );
      if (response.status === 200) {
        clickedData === "video"
          ? setStoredApiData((prev) => [...prev, ...response.data.hits])
          : setStoredApiData((prev) => [...prev, ...response.data.hits]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  console.log(page);

  return (
    <main
      style={{
        backgroundImage: `url(${imagess})`,
        backgroundSize: "cover",
      }}
      className=" h-[540px]  bg-no-repeat bg-[rgba(25,27,38,0.5)]  max-sm:bg-center"
    >
      <section className="h-[540px] w-full bg-[rgba(25,27,38,0.5)]">
        <div className="flex justify-between px-6 py-4">
          <div>
            <h2 className="text-white text-3xl font-bold">PIXABAY</h2>
          </div>
        </div>

        {/* </section> */}
        <div className="w-[800px] flex flex-col gap-7 mt-24 ml-auto mr-auto max-sm:w-auto max-md:w-auto">
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
                  onClick={() => {
                    handleProposal(item.qurey, page);
                    setClickedData(item.qurey);
                  }}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 bg-white text-center bg-[#dbd0d087] hover:hover:bg-[hsla(0,0%,100%,.4)] p-4 rounded-full">
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
              className="w-full border-none outline-none text-[15px] bg-transparent text-[#dbd0d087] placeholder-[#191b26]"
            />
            {inputValue ? (
              <MdClear
                className="text-xl cursor-pointer"
                onClick={() => setInputValue("")}
              />
            ) : (
              ""
            )}
          </div>
          <div className="overflow-auto no-scrollbar flex items-center gap-2">
            <ul className="h-auto flex items-center gap-2 font-normal  text-[14px] text-nowrap cursor-pointer">
              {suggessitions.map((item, ind) => (
                <div key={ind}>
                  <li className="text-white rounded-lg p-2 font-base bg-opacity-100 bg-[hsla(0,0%,100%,.24)] hover:bg-[hsla(0,0%,100%,.4)]">
                    <div
                      onClick={() => {
                        handleClickData(item);
                        setImageSuggessition(item);
                      }}
                    >
                      {item}
                    </div>
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
