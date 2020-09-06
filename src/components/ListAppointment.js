import React, { Component } from "react";
import { FaTimes } from "react-icons/fa";
import Moment from "react-moment";
class ListAppointment extends Component {
  state = {};

  render() {
    // const listItems = this.props.appointments.map((item, i) => (
    //   <div key={i}>
    //     <div>{item.petName} </div>
    //     <div>{item.ownerName} </div>
    //   </div>
    // ));
    return (
      <div className="appointment-list item-list mb-3">
        {this.props.appointments.map((item) => (
          <div key={item.aptkey}>
            <div className="pet-item col media py-3">
              <div className="mr-3">
                <button
                  className="pet-delete btn btn-small btn-danger"
                  onClick={() => {
                    this.props.deleteAppointment(item);
                  }}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="pet-info media-body">
                <div className="pet-head d-flex">
                  <span
                    className="pet-name"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      this.props.updateInfo(
                        "petName",
                        e.target.innerText,
                        item.aptkey
                      );
                    }}
                  >
                    {item.petName}
                  </span>
                  <span className="apt-date ml-auto">
                    <Moment
                      date={item.aptDate}
                      parse="YYYY-MM-DD hh:mm"
                      format="MMM-d hh:mma"
                    />
                  </span>
                </div>
                <div className="owner-name">
                  <span className="label-item">Owner: </span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      this.props.updateInfo(
                        "ownerName",
                        e.target.innerText,
                        item.aptkey
                      );
                    }}
                  >
                    {item.ownerName}
                  </span>
                </div>
                <div
                  className="apt-notes"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    this.props.updateInfo(
                      "aptNotes",
                      e.target.innerText,
                      item.aptkey
                    );
                  }}
                >
                  {item.aptNotes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListAppointment;
