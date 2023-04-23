import axios from "axios";

export type Cat = {
  id: string;
  url: string;
};

type Breed = {
  id: string;
  name: string;
};

type ICatBreed = {
  name: string;
  description: string;
  origin: string;
  temperament: string;
};

interface ICat {
  id: string;
  breeds: Array<ICatBreed>;
  url: string;
}

const CAT_API_ENDPOINT = "https://api.thecatapi.com/v1";

export const getBreeds = async (): Promise<Breed[]> => {
  const response = await axios.get(`${CAT_API_ENDPOINT}/breeds`);

  return response.data;
};
export const getCatById = async (id: string): Promise<ICat> => {
  const response = await axios.get(`${CAT_API_ENDPOINT}/images/${id}`);

  return response.data;
};

export const getCatImagesByBreed = async (
  breedId: string,
  limit: number,
  page: number
): Promise<Cat[]> => {
  const response = await axios.get(
    `${CAT_API_ENDPOINT}/images/search?breed_id=${breedId}&limit=${limit}&page=${page}`
  );

  return response.data;
};
