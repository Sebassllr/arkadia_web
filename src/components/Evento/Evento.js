import React from "react";
import classes from "./Evento.css";

const event = props => {
  return (
    <div className={classes.box}>
      <div>
        <div className={classes.displayFlex}>
          <span
            className={[
              classes.center,
              classes.arvo,
              classes.title,
              classes.noselect
            ].join(" ")}
          >
            {props.name}
          </span>
        </div>
        <div className={classes.marginContent}>
          <hr />
          <div className={classes.bottom}>
            <div
              className={[
                classes.description,
                classes.noselect,
                classes.descriptionHeight,
                classes.scrollbarStyle,
                classes.overflowAuto
              ].join(" ")}
            >
              {props.description}
            </div>
            <hr />
            <div className={[classes.description, classes.noselect].join(" ")}>
              Lugar: {props.place}
            </div>
            <div
              className={[
                classes.description,
                classes.noselect,
                classes.marginTop
              ].join(" ")}
            >
              Fecha: {props.hour + " " + props.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default event;
