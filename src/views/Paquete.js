import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SimpleTable from "../components/SimpleTable";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  tableContainer: {
    height: 320
  }
});

const Paquete = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom component="h2">
        Paquete
      </Typography>

      <div>
        <SimpleTable />
      </div>
    </div>
  );
};

export default withStyles(styles)(Paquete);
