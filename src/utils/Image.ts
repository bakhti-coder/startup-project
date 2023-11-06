import { ENDPOINTIMG } from "../constants";
import { Photo } from "../types";

export const getImage = (photo: Photo) => {
  return `${ENDPOINTIMG}${photo?._id}.${photo?.name?.split(".")[1]}`;
};

export const userImage = (photo: string) => {
  return `${ENDPOINTIMG}${photo}`;
};
