import React, { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./menuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./dishDetail";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import { COMMENTS } from "../shared/comments";
import { Routes, Route, useParams } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = () => {
      const { dishId } = useParams();
      //console.log(this.state.comments.map() + "maincomp");
      return (
        <DishDetail
          dish={this.state.dishes[dishId]}
          comments={this.state.comments}
        />
      );
    };

    return (
      <div>
        <Header />
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route
            exact
            path="menu"
            element={<Menu dishes={this.state.dishes} />}
          />
          <Route path="menu/:dishId" element={<DishWithId />} />
          <Route exact path="contactus" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    );
  }
}

export default Main;
