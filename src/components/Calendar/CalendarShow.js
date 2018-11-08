import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css?external";
import classes from "../Calendar/Calendar.css";

const calendar = props => {
  const localizer = BigCalendar.momentLocalizer(moment);

  const styles = [
    classes.padding,
    classes.calendarHeight,
    classes.calendarWidth,
    classes.marginauto,
    classes.backgroundWhite,
    classes.border
  ].join(" ");

  return (
    <div className={styles}>
      <BigCalendar
        localizer={localizer}
        events={props.events}
        startAccessor="start"
        ezndAccessor="end"
        defaultView={props.defaultView}
        views={props.views}
      />
    </div>
  );
};

export default calendar;
