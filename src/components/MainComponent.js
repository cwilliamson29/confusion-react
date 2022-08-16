import React, { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./menuComponent";
import DishDetail from "./dishDetail";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { DISHES } from "../shared/dishes";
import { Routes, Route, Navigate } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    const HomePage = () => {
      return <Home />;
    };
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="menu" element={<Menu dishes={this.state.dishes} />} />
        </Routes>

        <Footer />
      </div>
    );
  }
}

export default Main;
