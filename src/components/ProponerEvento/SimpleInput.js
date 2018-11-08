import classes from "./ThreeInputs.css";
import React from "react";

const simpleInput = props => {
  const inputStyle = [classes.fullWidth, classes.margin, classes.border];
  return (
    <div>
      <input
        onChange={props.change}
        value={props.value}
        className={inputStyle.join(" ")}
        placeholder={props.placeHolder}
        type={props.type}
      />
    </div>
  );
};

export default simpleInput;
