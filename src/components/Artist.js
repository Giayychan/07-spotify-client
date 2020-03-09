import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/artist.css'

class Artist extends React.Component {
	render() {
		return (
			<Link to={`/artists/${this.props.artist.id}`} className="artist">
				<div
					className="cover"
					style={{ backgroundImage: `url('${this.props.artist.cover}')` }}
				></div>
				<h3>{this.props.artist.name}</h3>
			</Link>
		)
	}
}

export default Artist
