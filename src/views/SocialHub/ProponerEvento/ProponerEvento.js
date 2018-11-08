import React, { Component } from "react";
import SimpleInput from "../../../components/ProponerEvento/SimpleInput";
import classes from "./ProponerEvento.css";
import axios from "axios";

const API_URL = "http://localhost:3001";

class ProponerEvento extends Component {
  state = {
    values: [
      { id: 1, name: "name", val: "" },
      { id: 2, name: "description", val: "" },
      { id: 3, name: "place1", val: "" },
      { id: 4, name: "place2", val: "" },
      { id: 5, name: "place3", val: "" },
      { id: 6, name: "time1", val: "" },
      { id: 7, name: "time2", val: "" },
      { id: 8, name: "time3", val: "" },
      { id: 9, name: "date1", val: "" },
      { id: 10, name: "date2", val: "" },
      { id: 11, name: "date3", val: "" },
      { id: 12, name: "closeVot", val: "" }
    ],
    position: 0
  };

  /**
   * Calcula el siguiente paso
   */
  nextStep = () => {
    const nextPos = this.state.position + 1;
    this.setState({ position: nextPos });
  };

  /**
   * Calcula el siguiente anterior
   */
  previousStep = () => {
    const previous = this.state.position - 1;
    this.setState({ position: previous });
  };

  /**
   * Obtiene el arreglo en la posicion actual del paso
   */
  getStep = () => {
    const step = this.state.steps[this.state.position];
    return step;
  };

  /**
   * Renderiza los botones dependiendo del estado del formulario
   */
  renderButtons = length => {
    const step = this.state.position;
    let list = [];
    if (step > 0) {
      list.push(<button onClick={this.previousStep}>Anterior</button>);
    }

    if (step < length - 1) {
      list.push(<button onClick={this.nextStep}>Siguiente</button>);
    }

    if (step === length - 1) {
      list.push(
        <button onClick={this.createEvent} className={classes.submitBtn}>
          Submit
        </button>
      );
    }

    return list;
  };

  /**
   * Obtiene el valor digitado por el usuario y actualiza el estado
   */
  valueHandler = (event, id) => {
    const componentIndex = this.state.values.findIndex(st => st.id === id);
    const component = {
      ...this.state.values[componentIndex]
    };
    component.val = event.target.value;
    const values = [...this.state.values];
    values[componentIndex] = component;
    this.setState({ values: values });
  };

  createEvent = event => {
    event.preventDefault();
    const obj = this.state.values;
    let newObj = {};
    for (let key in obj) {
      newObj[obj[key].name] = obj[key].val;
    }

    axios.post(`${API_URL}/evento/`, newObj).then(res => {
      console.log(res);
      this.cleanState();
    });
  };

  cleanState = () => {
    const component = [...this.state.values];
    const list = component.map(e => {
      e.val = "";
      return e;
    });
    this.setState({ values: list, position: 0 });
  };

  /**
   * Obtiene la lista de los formularios
   */
  getList = () => {
    const multiplePlaces = (
      <div>
        <SimpleInput
          change={event => {
            this.valueHandler(event, 3);
          }}
          value={this.state.values[2].val}
          type="text"
          placeHolder="Lugar"
        />
        <SimpleInput
          change={event => {
            this.valueHandler(event, 4);
          }}
          value={this.state.values[3].val}
          type="text"
          placeHolder="Lugar"
        />
        <SimpleInput
          change={event => {
            this.valueHandler(event, 5);
          }}
          value={this.state.values[4].val}
          type="text"
          placeHolder="Lugar"
        />
      </div>
    );

    const multipleHours = (
      <div>
        <SimpleInput
          change={event => {
            this.valueHandler(event, 6);
          }}
          value={this.state.values[5].val}
          type="Time"
          placeHolder="Hora"
        />
        <SimpleInput
          change={event => {
            this.valueHandler(event, 7);
          }}
          value={this.state.values[6].val}
          type="Time"
          placeHolder="Hora"
        />
        <SimpleInput
          change={event => {
            this.valueHandler(event, 8);
          }}
          value={this.state.values[7].val}
          type="Time"
          placeHolder="Hora"
        />
      </div>
    );

    const multipleDates = (
      <div>
        <SimpleInput
          change={event => {
            this.valueHandler(event, 9);
          }}
          value={this.state.values[8].val}
          type="date"
          placeHolder="Fecha"
        />
        <SimpleInput
          change={event => {
            this.valueHandler(event, 10);
          }}
          value={this.state.values[9].val}
          type="date"
          placeHolder="Fecha"
        />
        <SimpleInput
          change={event => {
            this.valueHandler(event, 11);
          }}
          value={this.state.values[10].val}
          type="date"
          placeHolder="Fecha"
        />
      </div>
    );

    const steps = [
      {
        id: 1,
        name: "Nombre",
        description: "Ingrese el nombre del evento",
        component: (
          <SimpleInput
            change={event => {
              this.valueHandler(event, 1);
            }}
            value={this.state.values[0].val}
            type="text"
            placeHolder="Nombre"
          />
        )
      },
      {
        id: 2,
        name: "Descripción",
        description: "Ingrese la descripción del evento",
        component: (
          <SimpleInput
            change={event => {
              this.valueHandler(event, 2);
            }}
            value={this.state.values[1].val}
            type="text"
            placeHolder="Descripción"
          />
        )
      },
      {
        id: 3,
        name: "Lugar",
        description: "Ingrese tres posibles lugares",
        component: multiplePlaces
      },
      {
        id: 4,
        name: "Hora",
        description: "Ingrese tres posibles horas",
        component: multipleHours
      },
      {
        id: 5,
        name: "Fecha",
        description: "Ingrese tres posibles fechas",
        component: multipleDates
      },
      {
        id: 6,
        name: "Fecha de cierre",
        description: "Ingrese La fecha de finalización de las votaciones",
        component: (
          <SimpleInput
            change={event => {
              this.valueHandler(event, 12);
            }}
            value={this.state.values[11].val}
            type="date"
            placeHolder="Fecha"
          />
        )
      }
    ];
    return steps;
  };

  render() {
    const getList = this.getList();
    const list = this.renderButtons(getList.length);
    return (
      <div className={classes.box}>
        <h1 className={[classes.title].join(" ")}>
          {getList[this.state.position].name}
        </h1>
        <h6>{getList[this.state.position].description}</h6>
        {getList[this.state.position].component}
        {list.map(e => {
          return e;
        })}
      </div>
    );
  }
}

export default ProponerEvento;
