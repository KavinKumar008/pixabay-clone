export type pixabayResponse = {
    webformatURL: string;
    id: number;
    largeImageURL: string;
    videos: pixbayVideoResponse;
    type: string;
  };
  
  type pixbayVideoResponse = {
    medium: { url: string };
  };
  
 export type pixabayImageResponse = {
    webformatURL: string;
    id: number;
  };