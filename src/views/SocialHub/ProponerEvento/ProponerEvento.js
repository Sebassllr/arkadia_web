import React, { Component } from "react";
import SimpleInput from "../../../components/ProponerEvento/SimpleInput";
import "react-notifications/lib/notifications.css?external";
import classes from "./ProponerEvento.css";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import Select from "../../../components/ProponerEvento/multiOptions";

const API_URL = "http://localhost:3001";

class ProponerEvento extends Component {
  state = {
    values: [
      { id: 1, name: "name", val: "", state: false, type: "text" },
      { id: 2, name: "description", val: "", state: false, type: "text" },
      {
        id: 3,
        name: "place",
        val: "",
        state: false,
        cat: "lugar",
        type: "text"
      },
      {
        id: 4,
        name: "time",
        val: "",
        state: false,
        cat: "fecha",
        type: "Time"
      },
      { id: 5, name: "date", val: "", state: false, cat: "hora", type: "date" },
      { id: 6, name: "closeVot", val: "", state: false, type: "date" }
    ],
    position: 0,
    characteristics: [],
    initial: true
  };

  categories = {
    Lugar: "text",
    "Hora del evento": "Time",
    "Fecha del evento": "date",
    Regla: "text"
  };

  newValues = [];

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
      list.push(
        <button
          className={classes.previousButton}
          title="Anterior"
          onClick={this.previousStep}
        />
      );
    }

    if (step < length - 1) {
      list.push(
        <button
          className={classes.nextButton}
          title="Siguiente"
          onClick={this.nextStep}
        />
      );
    }

    if (step >= length - 1) {
      list.push(
        <button
          onClick={this.newCharacteristic}
          title="Agregar característica"
          className={classes.addButton}
        />
      );

      list.push(
        <button
          title="Enviar"
          onClick={this.createEvent}
          className={classes.submitBtn}
        />
      );
    }

    return list;
  };

  setCharacteristic = idName => {
    const characteristics = [...this.state.characteristics];
    const id = characteristics.length + 1;
    const position = idName - 1;
    const component = (
      <div>
        <SimpleInput
          change={event => {
            this.valueHandlerName(event, idName);
          }}
          value={this.state.values[position].name}
          type="text"
          placeHolder="Titulo"
          key={idName + "N"}
        />
        <SimpleInput
          change={event => {
            this.valueHandler(event, idName);
          }}
          value={this.state.values[position].val}
          type={this.state.values[position].type}
          placeHolder="Propuesta"
          key={idName + "P"}
        />
        <Select
          options={this.categories}
          value={this.state.values[position].type}
          change={event => this.onSelectChange(event, idName)}
        />
      </div>
    );

    const newStep = {
      id: id,
      name: "Nueva característica",
      description: "Ingrese la nueva característica",
      component: component
    };

    characteristics.push(newStep);
    this.setState({ characteristics: characteristics }, () => {
      this.nextStep();
    });
  };

  onSelectChange = (event, inputId) => {
    const componentIndex = this.state.values.findIndex(st => st.id === inputId);
    const component = {
      ...this.state.values[componentIndex]
    };

    const object = JSON.parse(event.target.value);
    const keys = Object.keys(object);
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      component.cat = element;
      component.type = object[element];
    }

    const values = [...this.state.values];
    values[componentIndex] = component;
    this.setState({ values: values });
  };

  newCharacteristic = () => {
    if (this.validateLastItem() && this.validateItem()) {
      const values = [...this.state.values];
      const idName = values.length + 1;
      const objName = {
        id: idName,
        name: "",
        val: "",
        state: false,
        type: "text"
      };
      values.push(objName);
      this.newValues.push(objName);
      this.setState({ values: values }, () => {
        this.setCharacteristic(idName);
      });
    }
  };

  validateLastItem = () => {
    if (this.state.values.length > 6) {
      const length = this.state.values.length;
      const lastItem = this.state.values[length - 1];
      if (lastItem.name === "" && lastItem.val === "") {
        NotificationManager.error(
          "Por favor ingrese nombre y propuesta",
          "¡Error!"
        );
        return false;
      } else {
        NotificationManager.success(
          "Se ha agregado la característica correctamente",
          "¡Éxito!"
        );
        return true;
      }
    }
    return true;
  };

  /**
   * Obtiene el valor digitado por el usuario y actualiza el estado
   */
  valueHandler = (event, id) => {
    const componentIndex = this.state.values.findIndex(st => st.id === id);
    const component = {
      ...this.state.values[componentIndex]
    };
    const input = event.target.value;
    const trimVal = input.trim();
    if (trimVal.length > 0) {
      component.val = input;
      component.state = true;
    } else {
      component.val = trimVal;
      component.state = false;
    }

    if (id === 5 || id === 6) {
      const isFuture = this.validateDate(input);
      if (!isFuture) {
        NotificationManager.error(
          "La fecha ingresada no es válida!",
          "¡Error!"
        );
      }
    }

    const values = [...this.state.values];
    values[componentIndex] = component;
    this.setState({ values: values });
  };

  validateDate = date => new Date() <= new Date(date);

  /**
   * Obtiene el valor digitado por el usuario y actualiza el estado
   */
  valueHandlerName = (event, id) => {
    const componentIndex = this.state.values.findIndex(st => st.id === id);
    const component = {
      ...this.state.values[componentIndex]
    };

    const input = event.target.value;
    const trimVal = input.trim();

    if (trimVal.length > 0) {
      component.name = input;
      component.state = true;
    } else {
      component.name = trimVal;
      component.state = false;
    }
    const values = [...this.state.values];
    values[componentIndex] = component;
    this.setState({ values: values });
  };

  /**
   * Funcion encargada de crear un evento
   */
  createEvent = event => {
    event.preventDefault();
    if (this.validateItem()) {
      const newObj = this.buildObject();

      axios
        .post(`${API_URL}/evento/`, newObj)
        .then(res => {
          if (res.status === 200) {
            this.cleanState();
            NotificationManager.success(res.data, "¡Éxito!");
          } else {
            NotificationManager.error(
              "Hubo un error guardando el evento!",
              "¡Error!"
            );
          }
        })
        .catch(error => {
          NotificationManager.error(
            "Hubo un error en la conexión con el servidor",
            "¡Error!"
          );
        });
    }
  };

  validateItem = () => {
    const values = [...this.state.values];
    for (let index = 0; index < values.length; index++) {
      const element = values[index];
      if (!element.state) {
        NotificationManager.error(
          "Por favor ingrese todos los campos",
          "¡Error!"
        );
        return false;
      }
    }
    return true;
  };

  buildObject = () => {
    const values = [...this.state.values];
    let elements = {};
    let characteristics = [];
    for (let index = 0; index < values.length; index++) {
      const element = values[index];

      if (element.id > 2 && element.id !== 6) {
        const obj = {};
        obj["id"] = element.id;
        obj["name"] = element.name;
        obj["value"] = element.val;
        obj["category"] = element.cat;
        obj.votes = 0;
        characteristics.push(obj);
      } else {
        elements[element.name] = element.val;
      }
    }
    elements.characteristics = characteristics;
    return elements;
  };

  /**
   * Devuelve el estado a su forma original
   */
  cleanState = () => {
    const component = [...this.state.values];
    const list = component.map(e => {
      e.val = "";
      return e;
    });
    list.length = 6;
    this.newValues = [];
    this.setState({ values: list, position: 0 });
  };

  /**
   * Obtiene la lista de los formularios
   */
  getList = () => {
    const newComponents = [];

    for (let index = 0; index < this.newValues.length; index++) {
      const id = 5 + index;
      const idName = this.newValues[index].id;
      const position = idName - 1;
      const component = (
        <div>
          <SimpleInput
            change={event => {
              this.valueHandlerName(event, idName);
            }}
            value={this.state.values[position].name}
            type="text"
            placeHolder="Titulo"
            key={idName + "N"}
          />
          <SimpleInput
            change={event => {
              this.valueHandler(event, idName);
            }}
            value={this.state.values[position].val}
            type={this.state.values[position].type}
            placeHolder="Propuesta"
            key={idName + "P"}
          />
          <Select
            options={this.categories}
            value={this.state.values[position].type}
            change={event => this.onSelectChange(event, idName)}
          />
        </div>
      );
      const newElement = {
        id: id,
        name: "Nueva caracteristica",
        description: "Ingrese la nueva caracterísitica",
        component: component
      };
      newComponents.push(newElement);
    }

    const characteristics = [
      <SimpleInput
        change={event => {
          this.valueHandler(event, this.state.values[2].id);
        }}
        value={this.state.values[2].val}
        type="text"
        placeHolder="Lugar"
        key={this.state.values[2].id}
      />,
      <SimpleInput
        change={event => {
          this.valueHandler(event, this.state.values[4].id);
        }}
        value={this.state.values[4].val}
        type="date"
        placeHolder="fecha"
        key={this.state.values[4].id}
      />,
      <SimpleInput
        change={event => {
          this.valueHandler(event, this.state.values[3].id);
        }}
        value={this.state.values[3].val}
        type="Time"
        placeHolder="Hora"
        key={this.state.values[3].id}
      />
    ];

    const steps = [
      {
        id: 1,
        name: "Nombre",
        description: "Ingrese el nombre del evento",
        component: (
          <SimpleInput
            change={event => {
              this.valueHandler(event, this.state.values[0].id);
            }}
            value={this.state.values[0].val}
            type="text"
            placeHolder="Nombre"
            key={this.state.values[0].id}
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
              this.valueHandler(event, this.state.values[1].id);
            }}
            value={this.state.values[1].val}
            type="text"
            placeHolder="Descripción"
            key={this.state.values[1].id}
          />
        )
      },
      {
        id: 3,
        name: "Características",
        description: "Ingrese las características",
        component: <div>{characteristics.map(e => e)}</div>
      },
      {
        id: 4,
        name: "Fecha de cierre",
        description:
          "Ingrese la fecha de cierre de votaciones para este evento",
        component: (
          <SimpleInput
            change={event => {
              this.valueHandler(event, this.state.values[5].id);
            }}
            value={this.state.values[5].val}
            type="date"
            placeHolder="Fecha de cierre"
            key={this.state.values[5].id}
          />
        )
      },
      ...newComponents
    ];

    return steps;
  };

  componentDidMount = () => {
    this.setState({ characteristics: this.getList(), initial: false });
  };

  getValues = () => {
    let values = <div />;

    const getList = this.getList();
    const length = getList.length;
    const list = this.renderButtons(length);
    if (length > 0) {
      const obj = { ...getList[this.state.position] };

      values = (
        <div className={classes.box}>
          <h1 className={classes.title}>{obj.name}</h1>
          <h6>{obj.description}</h6>
          {obj.component}
          {list.map(e => {
            return e;
          })}
        </div>
      );
    }
    return values;
  };

  render() {
    return (
      <div>
        <NotificationContainer />
        {this.getValues()}
      </div>
    );
  }
}

export default ProponerEvento;
