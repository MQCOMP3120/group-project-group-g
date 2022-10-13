import { Card, Button } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";

export default function ProductCard({ imgUrl, name, price, rating, id }) {
  return (
    <Card className="mx-3 card" style={{ cursor: "pointer" }}>
      <Card.Img className="mt-3" variant="top" src={imgUrl} />
      <Card.Body>
        <Card.Title style={{ height: "10vh" }}> {name} </Card.Title>
        <div className="d-flex justify-content-between">
          <b>{`$ ${price}`}</b>
          <Card.Text>
            <AiFillStar color="blue" />
            {rating}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}
