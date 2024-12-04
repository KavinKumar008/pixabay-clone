import Clonebg from "../assets/clonebg.jpg";
import { IoSearch } from "react-icons/io5";
import { suggessitions } from "../utils/Suggessition";
// import { images } from "../images/Image";
import axios from "axios";
import { useEffect, useState } from "react";

type pixabayResponse = {
  webformatURL: string;
  id: number;
};

const HomePage = () => {
  const key = import.meta.env.VITE_API_KEY;

  const [storedApiData, setStoredApiData] = useState<pixabayResponse[]>([]);
  const [clickedImages, setClickedImages] = useState("");
  // console.log(suggessitions);
  // console.log(import.meta.env.VITE_API_KEY);

  // console.log(images[0]);
  // let url = `https://pixabay.com/api/?key=${key}&q=&image_type=photo&per_page=20&safesearch=true`;
  // console.log(url);

  async function handleCallApi() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${key}&q=${clickedImages}&image_type=photo&per_page=20&safesearch=true`
      );
      if (response.status === 200) {
        setStoredApiData(response.data.hits);
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(storedApiData);

  useEffect(() => {
    handleCallApi();
  }, [clickedImages]);

  function handleClickData(item: string) {
    setClickedImages(item);
  }

  console.log(clickedImages);
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
          <div>Explore</div>
        </div>

        {/* </section> */}
        <div className="w-[800px] flex flex-col gap-7 mt-36 ml-auto mr-auto max-sm:w-auto">
          <div>
            <h1 className="text-center text-white text-3xl font-bold">
              Stunning royalty-free images & royalty-free stock
            </h1>
          </div>
          <div className="flex items-center gap-4  bg-white text-center p-4 rounded-full">
            <IoSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search for free image, Videos, Music & more"
              className="w-full border-none outline-none text-[15px] placeholder-[#191b26] opacity-90 focus:opacity-25"
            />
          </div>
          <div>
            <ul className="h-[30px] flex items-center gap-2 font-normal  text-[14px] text-nowrap cursor-pointer max-sm:overflow-auto">
              {suggessitions.map((item, ind) => (
                <div key={ind}>
                  <li className="text-white rounded-lg p-1 font-medium bg-[hsla(0,0%,100%,.24)] hover:bg-[hsla(0,0%,100%,.4)]">
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
      {/* <section className="w-full h-auto grid grid-cols-3 gap-3 p-4 max-sm:grid max-sm:grid-cols-1 max-sm:gap-4">
        {images.map((item, ind) => (
          <div key={ind} className="">
            <img src={item} alt="images" />
          </div>
        ))}
      </section> */}
      <section className="w-full grid grid-cols-3 p-4 gap-6 max-sm:grid max-sm:grid-cols-1 max-sm:gap-4">
        {storedApiData &&
          storedApiData.map((item) => (
            <div key={item.id} className="">
              <img
                src={item.webformatURL}
                alt="images"
                className="w-[400px] h-auto"
              />
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
