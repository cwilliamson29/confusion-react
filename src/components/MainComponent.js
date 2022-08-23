import React, { Component } from "react";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Menu from "./menuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./dishDetail";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {
  Routes,
  Route,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { connect } from "react-redux";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = () => {
      const { dishId } = useParams();
      //console.log(this.state.comments.map() + "maincomp");
      return (
        <DishDetail
          dish={this.props.dishes[dishId]}
          comments={this.props.comments}
        />
      );
    };

    return (
      <div>
        <Header />
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="aboutus"
            element={<About leaders={this.props.leaders} />}
          />
          <Route
            exact
            path="menu"
            element={<Menu dishes={this.props.dishes} />}
          />
          <Route path="menu/:dishId" element={<DishWithId />} />
          <Route exact path="contactus" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
