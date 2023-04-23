import { FC, useEffect, useState } from "react";
import { useCatAPI } from "../contexts";
import BreedSelector from "../components/BreedSelector";

const LIMIT_PER_PAGE = 10;
type Breed = {
  id: string;
  name: string;
};

export const HomePage: FC = () => {
  const { loadCats, cats, breeds } = useCatAPI();
  const [selectedBreedId, setSelectedBreedId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedBreedId) {
        return;
      }
      await loadCats(selectedBreedId, LIMIT_PER_PAGE, currentPage + 1);
    };

    fetchData();
  }, [selectedBreedId, currentPage]);

  const handleBreedSelectChange = (breedId: string) => {
    setSelectedBreedId(breedId);
    setCurrentPage(0);
  };

  return (
    <>
      {breeds ? (
        <BreedSelector handleBreedSelectChange={handleBreedSelectChange} />
      ) : (
        <div>Loading!!</div>
      )}
    </>
  );
};
