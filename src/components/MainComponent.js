import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./menuComponent";
import DishDetail from "./dishDetail";
import { DISHES } from "../shared/dishes";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Restorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        {this.state.selectedDish !== null ? (
          <DishDetail
            dish={
              this.state.dishes.filter(
                (dish) => dish.id === this.state.selectedDish
              )[0]
            }
          />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Main;
/* {this.state.selectedDish !== null ? (
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>) : (<div></div>)}*/
/*<DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        />*/
