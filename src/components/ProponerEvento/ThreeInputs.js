import React from "react";
import classes from "./ThreeInputs.css";

const inputs = props => {
  const inputStyle = [classes.onThird, classes.margin, classes.border];
  return (
    <div className={classes.fullWidth}>
      <input
        onChange={props.change}
        value={props.val[0]}
        className={inputStyle.join(" ")}
        type={props.type}
        placeholder={props.placeHolder}
      />
      <input
        onChange={props.change}
        value={props.val[1]}
        className={inputStyle.join(" ")}
        type={props.type}
        placeholder={props.placeholder}
      />
      <input
        onChange={props.change}
        value={props.val[2]}
        className={inputStyle.join(" ")}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default inputs;
