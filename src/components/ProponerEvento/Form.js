import React from "react";
import SimpleInput from "./SimpleInput";
import MultipleInput from "./ThreeInputs";

const fullForm = props => {
  let form;
  if (props.isMultiple) {
    form = <SimpleInput type={props.type} placeHolder={props.placeHolder} />;
  } else {
    form = <MultipleInput type={props.type} placeHolder={props.placeHolder} />;
  }
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};
