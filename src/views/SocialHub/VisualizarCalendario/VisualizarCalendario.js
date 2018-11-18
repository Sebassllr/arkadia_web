import React, { Component } from "react";
import axios from "axios";
import Calendar from "../../../components/Calendar/CalendarShow";

const API_URL = "http://localhost:3001";

class VisualizarCalendario extends Component {
  state = {
    events: [],
    firstTime: true
  };

  getEvents = () => {
    axios.get(`${API_URL}/evento/`).then(res => {
      this.drawEvents(res.data);
    });
  };

  splitDate = (date, time) => {
    const dateT = date + " " + time;

    const finalDate = new Date(dateT);
    return finalDate;
  };

  drawEvents = data => {
    const dates = data.map(e => {
      const date = this.splitDate(e.date, e.time);
      const finalDate = new Date(
        date.setTime(date.getTime() + 1 * 60 * 60 * 1000)
      );
      const event = {
        title: e.name,
        start: date,
        end: finalDate,
        allDay: true
      };

      return event;
    });

    this.setState({ events: dates, firstTime: false });
  };

  render() {
    this.state.firstTime === true ? this.getEvents() : null;
    const defaultView = "month";
    const views = ["month", "agenda"];

    return (
      <div>
        <Calendar
          events={this.state.events}
          defaultView={defaultView}
          views={views}
        />
      </div>
    );
  }
}

export default VisualizarCalendario;
