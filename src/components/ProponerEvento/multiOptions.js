import React from "react";
import classes from "./ThreeInputs.css";

const multiOptions = props => {
  const keys = Object.keys(props.options);
  const values = [];
  const options = keys.map((k, index) => {
    const newVal = {};
    newVal[k] = props.options[k];
    const value = JSON.stringify(newVal);
    values.push(value);
    return (
      <option key={index} value={value}>
        {k}
      </option>
    );
  });
  const inputStyle = [classes.fullWidth, classes.margin, classes.border];
  return (
    <div>
      <select
        value={values[props.selected]}
        className={inputStyle.join(" ")}
        onChange={props.change}
      >
        {options}
      </select>
    </div>
  );
};

export default multiOptions;
