import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SimpleTable from "../components/SimpleTable";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  tableContainer: {
    height: 320
  }
});

const Home = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom component="h2">
        Orders
      </Typography>

      <div>
        <SimpleTable />
      </div>
    </div>
  );
};

export default withStyles(styles)(Home);
