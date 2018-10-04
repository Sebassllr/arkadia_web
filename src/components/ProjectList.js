import React from 'react'

const ProjectList = ({ projects }) => (
	<table className="table is-hoverable">
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Descripción</th>
			</tr>
		</thead>
		<tbody>
			{
				projects.map((project) => {
					return (
						<tr key={project.name}>
							<td>{project.name}</td>
							<td>{project.description}</td>
						</tr>
					)
				}) 
			}
		</tbody>
	</table>
)

export default ProjectList