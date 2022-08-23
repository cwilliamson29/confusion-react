import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";

function handleSubmit(values) {
  console.log("current state is: " + JSON.stringify(values));
  alert("current state is: " + JSON.stringify(values));
}

function RenderComments({ dish }) {
  let options = { year: "numeric", month: "short", day: "numeric" };

  const [toggleComMod, setToggleComMod] = useState(false);

  const toggle = () => setToggleComMod(!toggleComMod);

  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !val || val.length <= len;
  const minLength = (len) => (val) => val && val.length >= len;

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
      <Button onClick={toggle} className="fa fa-pencil bg-white text-dark">
        {" "}
        Submit Comment
      </Button>
      <Modal isOpen={toggleComMod} toggle={toggle}>
        <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(value) => handleSubmit(value)}>
            <Row className="form-group">
              <Label htmlFor="rating" md={2}>
                Rating
              </Label>

              <Col md={10}>
                <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control col-4"
                >
                  <option>1 Rating</option>
                  <option>2 Rating</option>
                  <option>3 Rating</option>
                  <option>4 Rating</option>
                  <option>5 Rating</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="name" md={2}>
                Name:{" "}
              </Label>
              <Col md={10}>
                <Control.text
                  model=".name"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(30),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: "Name req",
                    minLength: "Must be greater than 2",
                    maxLength: "Must be less than 30",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="comment" md={2}>
                Comment
              </Label>
              <Col md={10}>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  rows="12"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10, offeset: 2 }}>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
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
