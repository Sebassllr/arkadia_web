import React, { Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Tooltip from '@material-ui/core/Tooltip';
import ListaPaquetes from './ListaPaquetes';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DriveEta from '@material-ui/icons/DriveEta';
import ChildCare from '@material-ui/icons/ChildCare';
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import Commute from '@material-ui/icons/Commute';
import School from '@material-ui/icons/School';
import Group from '@material-ui/icons/Group';
import SimpleTable from './SimpleTable';
import PACKAGE from '../package.json'

const drawerWidth = 270;

const API_URL = PACKAGE.config.api[process.env.NODE_ENV]

const iconos = {
	"NotificationsIcon": NotificationsIcon,
	"DriveEta": DriveEta,
	"ChildCare": ChildCare,
	"DirectionsBike": DirectionsBike,
	"Commute": Commute,
	"School": School,
	"Group": Group
}

const styles = theme => ({
   typography: {
     useNextVariants: true,
   },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			open: true,
			proyectos: [],
			paquetes: [],
			nombreProyecto: '',
		}

		this.getProyectos = this.getProyectos.bind(this)
		this.getPaquetes = this.getPaquetes.bind(this)
		this.showProject = this.showProject.bind(this)
		this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
		this.handleDrawerClose = this.handleDrawerClose.bind(this)
	}

	componentDidMount() {
		this.getProyectos()
		this.getPaquetes()
	}

	getProyectos() {
		axios
      .get(`${API_URL}/proyectos/`)
      .then(res => {
				const { data } = res
	
        this.setState({
          proyectos: data,
        })
      })
	}
	
	getPaquetes() {
		axios
      .get(`${API_URL}/proyectos/5bbbfcf4225d3d0015b172d7/paquetes`)
      .then(res => {
				const { data } = res
	
        this.setState({
					nombreProyecto: 'eParking',
          paquetes: data,
        })
      })
	}

	showProject(projectId, nombreProyecto) {
		console.log(projectId)
		axios
      .get(`${API_URL}/proyectos/${projectId}/paquetes`)
      .then(res => {
				const { data } = res
	
        this.setState({
					nombreProyecto: nombreProyecto,
          paquetes: data,
        })
      })
	}

  handleDrawerOpen() {
    this.setState({ open: true });
  };

  handleDrawerClose() {
    this.setState({ open: false });
	};
	
	setProjectIcon(icono) {
	let Tagname = iconos[icono];
		return(
			<Tagname />
		)

	}

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
              	{ this.state.nombreProyecto }
              </Typography>
              {
								this.state.proyectos.map( proyecto => (
									<Tooltip 
										title={proyecto.nombre}
										key={proyecto._id}
										onClick={() => {this.showProject(proyecto._id, proyecto.nombre)}}
									>
										<IconButton aria-label={proyecto.nombre} color="inherit">
											{
												this.setProjectIcon(proyecto.icono)
											}
										</IconButton>  
                	</Tooltip>
								))
							}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
						<List>
							<ListaPaquetes paquetes={this.state.paquetes} />
						</List>
					</Drawer>
					<main className={classes.content}>	
            <div className={classes.appBarSpacer} />	
            <Typography variant="h4" gutterBottom component="h2">	
              ...
            </Typography>	
            <div className={classes.tableContainer}>	
              <SimpleTable />	
            </div>	
          </main>
        </div>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
