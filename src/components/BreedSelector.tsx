import React, { useMemo } from "react";
import { useCatAPI } from "../contexts";
import Select from "react-select";

type Props = {
  handleBreedSelectChange: (breedId: string) => void;
};
type SelectOptionType = { label: string; value: string };

const BreedSelector: React.FC<Props> = ({ handleBreedSelectChange }) => {
  const { breeds, selectedBreed, setSelectedBreed } = useCatAPI();

  const handleChange = (option: SelectOptionType | null) => {
    if (option) {
      handleBreedSelectChange(option.value);
      setSelectedBreed(option.value);
    }
  };

  const options = useMemo(() => {
    return breeds?.map((breed) => ({ value: breed.id, label: breed.name }));
  }, [breeds]);

  return (
    <section className="jumbotron text-center mb-0 bg-white">
      <div className="container">
        <h1 className="jumbotron-heading">Welcome</h1>
        <p className="lead text-muted">Select Breed</p>
        <p>
          {options && options?.length > 0 && (
            <Select
              onChange={handleChange}
              placeholder={<div>Please Select Bread</div>}
              options={options}
            />
          )}
        </p>
      </div>
    </section>
  );
};

export default BreedSelector;
