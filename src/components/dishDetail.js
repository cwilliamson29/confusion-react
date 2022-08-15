import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderComments(comment) {
    let options = { year: "numeric", month: "short", day: "numeric" };

    const posts = comment.map((post) => {
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
        <ul class="list-unstyled">{posts}</ul>
      </div>
    );
  }

  renderDish(dish) {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" object src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>
              <h4>{dish.name}</h4>
            </CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  render() {
    const dish = this.props.dish;

    if (dish === null) {
      return <div></div>;
    } else {
      return (
        <div className="container">
          <div className="row">
            {this.renderDish(this.props.dish)}
            {this.renderComments(this.props.dish.comments)}
          </div>
        </div>
      );
    }
  }
}

export default DishDetail;
