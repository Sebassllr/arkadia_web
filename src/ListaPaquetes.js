import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuItem from './components/MenuItem'

const populateHistorias = (historiasDeUsuario) => {
	return (
		historiasDeUsuario.map(
			historia => (
				<ListItem button key={historia._id}>
					<ListItemText primary={historia.nombre} />
				</ListItem>
			)
		) 
	)
}

const ListaPaquetes = ({ paquetes }) => {
  return(
		<div>
			{
				paquetes.map( paquete => (
					<MenuItem nombre={paquete.nombre} key={paquete._id}>
						{ populateHistorias(paquete.historiasDeUsuario) }
					</MenuItem>
				))
			}
  	</div>
	)
};

export default ListaPaquetes;

