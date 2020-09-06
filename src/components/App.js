import React, { Component } from "react";

import "../css/App.css";
import AddAppointment from "./AddAppoinments";
import ListAppointment from "./ListAppointment";
import SearchAppointment from "./SearchAppointment";
import { without, findIndex } from "lodash";

class App extends Component {
  constructor() {
    super();
    this.state = {
      myName: "Harshi",
      myAppointments: [],
      formDisplay: false,
      lastIndex: 1,
      orderBy: "aptDate",
      orderDir: "desc",
      queryText: "",
    };

    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApt = this.searchApt.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay,
    });
  }

  searchApt(query) {
    this.setState({
      queryText: query,
    });
  }
  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);
    this.setState({
      myAppointments: tempApts,
    });
    this.setState({
      myAppointments: tempApts,
    });
  }

  updateInfo(name, value, id) {
    let tempApts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments, {
      aptkey: id,
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myAppointments: tempApts,
    });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir,
    });
  }

  addAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptsId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1,
    });
  }

  componentDidMount() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((result) => {
        const apts = result.map((item) => {
          item.aptkey = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myAppointments: apts,
        });
      });
  }
  render() {
    let order;
    let filteredApts = this.state.myAppointments;
    order = this.state.orderDir === "asc" ? 1 : -1;
    filteredApts = filteredApts
      .sort((a, b) => {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;
        } else {
          return order;
        }
      })
      .filter((eachItem) => {
        return (
          eachItem["petName"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem["ownerName"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem["aptDate"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });

    return (
      <div className="outerWraper">
        <div className="App">
          <header className="header">
            <h4> Pet Choice</h4>
          </header>

          <main className="page bg-white" id="petratings">
            <div className="container">
              <div className="row">
                <div className="col-md-12 bg-white">
                  <div className="container">
                    <AddAppointment
                      formDisplay={this.state.formDisplay}
                      toggleForm={this.toggleForm}
                      addAppointment={this.addAppointment}
                    />
                    <SearchAppointment
                      orderBy={this.state.orderBy}
                      orderDir={this.state.orderDir}
                      changeOrder={this.changeOrder}
                      searchApt={this.searchApt}
                    />
                    <ListAppointment
                      className="innerWrapper"
                      appointments={filteredApts}
                      deleteAppointment={this.deleteAppointment}
                      updateInfo={this.updateInfo}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <footer className="footer">
          <p>
            Contact
            <a href="mailto: harshithece7016@gmail.com"> {"  "}Pet Clinic</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
