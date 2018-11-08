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
      console.log(res.data);
      this.drawEvents(res.data);
    });
  };

  splitDate = (date, time) => {
    const dateT = date.split("-");
    const timeF = time.split(":");
    console.log(dateT);
    console.log(timeF);
    const finalDate = new Date(
      dateT[0],
      dateT[1],
      dateT[2],
      timeF[0],
      timeF[1]
    );
    return finalDate;
  };

  drawEvents = data => {
    const dates = data.map(e => {
      const date = this.splitDate(e.date1, e.time1);
      const finalDate = new Date(
        date.setTime(date.getTime() + 1 * 60 * 60 * 1000)
      );
      const event = {
        title: e.name,
        start: date,
        end: finalDate,
        allDay: true
      };
      console.log(event);
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
