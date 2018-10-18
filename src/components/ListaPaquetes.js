import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "./MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import { iconosPaquetes } from "../utils/iconos";
import { Link } from "react-router-dom";

const setPackageIcon = icono => {
  let Paquete = iconosPaquetes[icono];
  return <Paquete />;
};

const populateHistorias = historiasDeUsuario => {
  return historiasDeUsuario.map(historia => (
    <ListItem
      button
      key={historia._id}
      component={Link}
      to={`/historia/${historia.nombre}`}
    >
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText inset primary={historia.nombre} />
    </ListItem>
  ));
};

const ListaPaquetes = ({ paquetes }) => {
  return (
    <div>
      {paquetes.map(paquete => (
        <MenuItem
          nombre={paquete.nombre}
          icono={setPackageIcon(paquete.icono)}
          key={paquete._id}
        >
          {populateHistorias(paquete.historiasDeUsuario)}
        </MenuItem>
      ))}
    </div>
  );
};

export default ListaPaquetes;
