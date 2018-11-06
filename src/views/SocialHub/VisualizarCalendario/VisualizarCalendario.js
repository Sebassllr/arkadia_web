import React, { Component } from "react";
import axios from "axios";
import Calendar from "../../../components/Calendar/CalendarShow";
import "./VisualizarCalendario.css";

class VisualizarCalendario extends Component {
  render() {
    const event = {
      title: "Nuevo",
      start: new Date(2018, 10, 18, 13, 0),
      end: new Date("2018", "10", "18", "13", "30"),
      allDay: false
    };

    const event2 = {
      title: "Nuevo",
      start: new Date("2018", "09", "08"),
      end: new Date("2018", "09", "10"),
      allDay: true
    };

    const events = [event, event2];
    const defaultView = "week";
    const views = ["week", "month", "agenda"];

    return (
      <div className="heigh width marginauto">
        <Calendar events={events} defaultView={defaultView} views={views} />
      </div>
    );
  }
}

export default VisualizarCalendario;
