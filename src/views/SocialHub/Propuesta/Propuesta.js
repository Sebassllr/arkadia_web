import React, { Component } from "react";
import CardEvent from "../../../components/Evento/Evento";
import styles from "./Propuesta.css";
import axios from "axios";

const API_URL = "http://localhost:3001";

class Propuesta extends Component {
  state = {
    event: [],
    firtsTime: true
  };

  /**
   * Obtiene los eventos creados
   */
  getEvents = () => {
    axios.get(`${API_URL}/evento/`).then(res => {
      this.drawEvents(res.data);
    });
  };

  /**
   * Función encargada de dibujar los eventos
   */
  drawEvents = data => {
    const list = data.map(event => {
      return (
        <CardEvent
          name={event.name}
          description={event.description}
          date={event.date1}
          place={event.place1}
          hour={event.time1}
        />
      );
    });
    this.setState({ event: list, firtsTime: false });
  };

  render() {
    this.state.firtsTime === true ? this.getEvents() : null;
    return (
      <div
        className={[
          styles.displayFlex,
          styles.cardWidth,
          styles.overFlow,
          styles.scrollbarStyle
        ].join(" ")}
      >
        {this.state.event}
      </div>
    );
  }
}

export default Propuesta;
