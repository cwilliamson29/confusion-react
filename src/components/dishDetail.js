import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleComment(values) {
    this.toggleModal();
    alert(JSON.stringify(values));
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleModal}>Comment</Button>
        <Modal isOpen={this.state.isModalOpen} fade={false}>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleComment(values)}>
              <Row className="form-group">
                <label htmlFor="rating">Rating</label>
                <Col>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    placeholder="Rating"
                    className="form-control"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <label htmlFor="author">Name</label>
                <Col>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Author"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      require: "Required",
                      minLength: "Must be greater than 2",
                      maxLength: "Must be less than 16",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <label htmlFor="comment">Comment</label>
                <Col>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    placeholder="Comment"
                    className="form-control"
                    rows="6"
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">
                Comment
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderComments({ comments }) {
  const renderedComments = comments.map((comment) => {
    return (
      <div>
        <CardText>{comment.comment} </CardText>
        <CardText>
          --{comment.author} ,{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(comment.date)))}
        </CardText>
      </div>
    );
  });

  return (
    <div>
      {renderedComments}
      <CommentForm />
    </div>
  );
}

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg width="100%" object src={dish.image} alt={dish.name} />
      <Card>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </Card>
    </Card>
  );
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish == null) {
    return <></>;
  }

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
