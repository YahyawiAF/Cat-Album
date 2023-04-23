import { FC, useEffect, useMemo, useState } from "react";
import { useCatAPI } from "../contexts";
import BreedSelector from "../components/BreedSelector";
import { CatList } from "../components/CatList";

const LIMIT_PER_PAGE = 10;
type Breed = {
  id: string;
  name: string;
};

export const HomePage: FC = () => {
  const { loadCats, cats, breeds, setCats } = useCatAPI();
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
    setCats([]);
    setSelectedBreedId(breedId);
    setCurrentPage(0);
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const canLoadMore = useMemo(() => {
    if (cats) return cats.length % LIMIT_PER_PAGE === 0;
    else return false;
  }, [cats]);

  return (
    <>
      {breeds ? (
        <>
          <BreedSelector handleBreedSelectChange={handleBreedSelectChange} />
          {cats && cats?.length > 0 && (
            <CatList
              cats={cats}
              onLoadMore={handleLoadMore}
              canLoadMore={canLoadMore}
            />
          )}
        </>
      ) : (
        <div>Loading!!</div>
      )}
    </>
  );
};
