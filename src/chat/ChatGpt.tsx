import { IoSearch } from "react-icons/io5";
import { suggessitions } from "../utils/Suggessition";
import axios from "axios";
import { useEffect, useState } from "react";
// import { proposal } from "../proposal/Proposal";
// import { pixabayResponse } from "../types/pixabayResponse";

const ChatGpt = () => {
  const key = import.meta.env.VITE_API_KEY;
  const videoKey = import.meta.env.VITE_PIXABAY_VIDEO_API_KEY;

  const [storedApiData, setStoredApiData] = useState<pixabayResponse[]>([]);
  const [title, setTitle] = useState("photo"); // "photo" or "video"
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); // Track if more data is available

  // Function to handle API call for Images
  const handleImageApi = async (page: number, searchQuery: string = "") => {
    if (isLoading) return;
    setIsLoading(true);
    const query = searchQuery || inputValue;

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo&per_page=20&safesearch=true&page=${page}`
      );
      if (response.status === 200) {
        setStoredApiData((prev) => [...prev, ...response.data.hits]);
        setHasMoreData(response.data.hits.length === 20); // If we received 20 results, more data might be available
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle API call for Videos
  const handleVideoApi = async (page: number, searchQuery: string = "") => {
    if (isLoading) return;
    setIsLoading(true);
    const query = searchQuery || inputValue;

    try {
      const response = await axios.get(
        `https://pixabay.com/api/videos/?key=${videoKey}&q=${query}&video_type=film&per_page=20&safesearch=true&page=${page}`
      );
      if (response.status === 200) {
        setStoredApiData((prev) => [...prev, ...response.data.hits]);
        setHasMoreData(response.data.hits.length === 20);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle API calls when the search button is clicked or Enter is pressed
  const handleSearchClick = () => {
    if (!inputValue.trim()) return; // Prevent search if the input is empty
    setStoredApiData([]); // Clear previous data
    setPage(1); // Start from the first page
    if (title === "photo") {
      handleImageApi(1);
    } else if (title === "video") {
      handleVideoApi(1);
    }
    setInputValue(""); // Optionally clear the input field after submission
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.trim()) {
      handleSearchClick(); // Trigger search on Enter key
    }
  };

  // Handle category selection (images or videos)
  const handleProposal = (type: string, page: number) => {
    setTitle(type); // Set title to 'photo' or 'video'
    setStoredApiData([]); // Clear previous data
    setPage(1); // Start fresh from page 1
    if (type === "video") {
      handleVideoApi(1);
    } else {
      handleImageApi(1);
    }
  };

  // Handle suggestion click for pre-defined search terms
  const handleClickData = (item: string) => {
    setStoredApiData([]); // Clear previous data
    setPage(1); // Start fresh from page 1
    if (title === "photo") {
      handleImageApi(1, item);
    } else if (title === "video") {
      handleVideoApi(1, item);
    }
  };

  // Check if we are at the bottom of the page to trigger more data load
  const checkIfAtBottom = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const bottomPosition = document.documentElement.scrollHeight;
    return scrollPosition >= bottomPosition - 1;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isLoading && hasMoreData && checkIfAtBottom()) {
        setPage((prevPage) => prevPage + 1); // Increment page number for next fetch
        if (title === "photo") {
          handleImageApi(page + 1);
        } else if (title === "video") {
          handleVideoApi(page + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, page, hasMoreData, title]);

  return (
    <main className="bg-gray-800">
      <div className="flex justify-between p-6">
        <h2 className="text-white text-3xl">PIXABAY</h2>
        <div>
          <button
            className={`px-4 py-2 rounded-full text-white ${
              title === "photo" ? "bg-blue-500" : "bg-transparent"
            }`}
            onClick={() => handleProposal("photo", page)}
          >
            Photos
          </button>
          <button
            className={`px-4 py-2 rounded-full text-white ${
              title === "video" ? "bg-blue-500" : "bg-transparent"
            }`}
            onClick={() => handleProposal("video", page)}
          >
            Videos
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-7 mt-24 ml-auto mr-auto max-sm:w-auto">
        <div className="flex items-center gap-4 p-4 bg-white rounded-full opacity-50 hover:bg-opacity-40">
          <IoSearch
            className="text-xl text-black cursor-pointer"
            onClick={handleSearchClick}
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for images, videos, etc."
            className="w-full bg-transparent text-[15px] placeholder-[#191b26] outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-auto">
          <ul className="flex gap-2">
            {suggessitions.map((item, ind) => (
              <li
                key={ind}
                className="bg-opacity-20 text-white p-2 rounded-lg cursor-pointer hover:bg-opacity-40"
                onClick={() => handleClickData(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="columns-1 sm:columns-2 lg:columns-3 py-10">
        {storedApiData.length > 0 &&
          storedApiData.map((item, ind) => (
            <div key={ind} className="cursor-pointer mb-4 break-inside-avoid">
              {item.type === "film" ? (
                <video
                  controls
                  className="w-full h-auto object-cover rounded-md"
                >
                  <source src={item.videos.medium.url} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.webformatURL}
                  alt="images"
                  className="w-full h-auto object-cover rounded-md"
                  onClick={() => window.open(item.largeImageURL, "_blank")}
                />
              )}
            </div>
          ))}
      </section>
    </main>
  );
};

export default ChatGpt;
