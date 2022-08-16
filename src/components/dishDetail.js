import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderComments({ dish }) {
  let options = { year: "numeric", month: "short", day: "numeric" };

  const posts = dish.map((post) => {
    return (
      <li key={post.id}>
        <p>{post.comment}</p>
        <p className="font-italic">
          -- {post.author},
          <span>
            {new Date(post.date).toLocaleDateString("en-US", options)}
          </span>
        </p>
      </li>
    );
  });
  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments:</h4>
      <ul className="list-unstyled">{posts}</ul>
    </div>
  );
}

function RenderDish({ dish }) {
  return (
    <div key={dish.id} className="col-12 col-md-5 m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function DishDetail(props) {
  //const dish = props.dish;

  if (props.dish === null) {
    return <div></div>;
  } else {
    return (
      <div className="container">
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments dish={props.dish.comments} />
        </div>
      </div>
    );
  }
}

export default DishDetail;
