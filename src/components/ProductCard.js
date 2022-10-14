import { Card, Button } from "react-bootstrap";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ProductCard({ imgUrl, name, price, rating, id }) {
  return (
    <Link to={`/products/${id}`} style={{ color: "black" }}>
      <Card className="mx-3 card" style={{ cursor: "pointer" }}>
        <Card.Img className="mt-3" variant="top" src={imgUrl} />
        <Card.Body>
          <Card.Title style={{ height: "10vh" }}> {name} </Card.Title>
          <div className="d-flex justify-content-between">
            <b>{`$ ${price}`}</b>
            <Card.Text>
              <BsStarFill style={{ color: "#ffb900", marginRight: "4px" }} />
              {rating}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
