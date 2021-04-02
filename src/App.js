import React, { Component } from "react";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import { withRouter } from "react-router-dom";
import MenuLeft from "./Components/Layout/MenuLeft";
import { AppContext } from "./AppContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getQty: 0,
      length: 0,
    };

    // const [getQty, setgetQty] = useState(0);

    this.getlengthCart = this.getlengthCart.bind(this);
  }
  getlengthCart(length) {
    this.setState({
      length: length,
    });
  }
  render() {
    let pathname = this.props.location.pathname;
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          getlengthCart: this.getlengthCart,
        }}
      >
        <Header />,
        <section>
          <div className="container">
            <div className="row">
              {pathname.includes("account") || pathname.includes("cart") ? (
                ""
              ) : (
                <MenuLeft />
              )}

              {this.props.children}
            </div>
          </div>
        </section>
        <Footer />
      </AppContext.Provider>
    );
  }
}

export default withRouter(App);
