import { FC } from "react";
import styled from "styled-components";
import { Cat } from "../api/CatApi";
import { Col } from "react-bootstrap";
import { CardCat } from "./Card";

type Props = {
  cats: Cat[];
  onLoadMore: () => void;
  canLoadMore: boolean;
};

const LoadMoreButton = styled.button`
  margin: 10px auto;
  display: block;
`;

export const CatList: FC<Props> = ({ cats, onLoadMore, canLoadMore }) => {
  return (
    <main role="main">
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {cats.map((cat) => (
              <Col key={cat.id} md={4} lg={4}>
                <CardCat key={cat.id} img={cat.url} id={cat.id} />
              </Col>
            ))}
            {canLoadMore && (
              <LoadMoreButton onClick={onLoadMore}>Load more</LoadMoreButton>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
