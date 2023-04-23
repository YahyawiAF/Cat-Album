import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { getCatById } from "../api/CatApi";

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const BackButton = styled.button`
  background-color: #fff;
  color: #333;
  border: 2px solid #333;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;
  align-self: baseline;
  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const SingleCatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useNavigate();
  const [cat, setCat] = useState<ICat | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchCat = async () => {
      try {
        const data = await getCatById(id);
        setCat(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCat();
  }, [getCatById, id]);

  const handleBack = () => {
    history("/");
  };

  if (!cat) {
    return <p>Loading...</p>;
  }

  return (
    <Wrapper>
      <BackButton onClick={handleBack}>Back</BackButton>
      <Image src={cat.url} alt={cat.breeds[0].name} />
      <Title>{cat.breeds[0].name}</Title>
      <Text>
        <span style={{ fontWeight: "bold" }}>Origin: </span>{" "}
        {cat.breeds[0].origin}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Temperament: </span>{" "}
        {cat.breeds[0].temperament}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Description: </span>
        {cat.breeds[0].description}
      </Text>
    </Wrapper>
  );
};

export default SingleCatPage;
