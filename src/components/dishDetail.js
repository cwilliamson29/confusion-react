import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderComments({ dish }) {
  let options = { year: "numeric", month: "short", day: "numeric" };

  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments:</h4>
      <ul className="list-unstyled">
        {dish.map((coms) => {
          return (
            <li key={coms.id}>
              <p>{coms.comment}</p>
              <p className="font-italic">
                -- {coms.author},&nbsp;
                <span>
                  {new Date(coms.date).toLocaleDateString("en-US", options)}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
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
  const coms = props.comments.filter((item) => item.dishId === props.dish.id);

  if (props.dish === null) {
    return <div></div>;
  } else {
    return (
      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments dish={coms} />
        </div>
      </div>
    );
  }
}

export default DishDetail;
