import { FC } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

type Props = {
  img: string;
  id: string;
};

export const CardCat: FC<Props> = ({ img, id }) => {
  const navigate = useNavigate();
  return (
    <div className="card mb-4 box-shadow">
      <Card.Img style={{ maxHeight: "200px" }} variant="top" src={img} />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button
              onClick={() => navigate(`/cat/${id}`)}
              type="button"
              className="btn btn-sm btn-outline-secondary"
            >
              View
            </button>
          </div>
          <small className="text-muted">9 mins</small>
        </div>
      </div>
    </div>
  );
};
