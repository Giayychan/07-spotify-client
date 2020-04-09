import React from 'react'
import axios from 'axios'

import '../styles/albums.css'
import '../styles/songs.css'

import Sidebar from '../components/Sidebar'
import Song from '../components/Song'

class Genre extends React.Component {
	state = {
		genre: {},
		songs: []
	}
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/genres/${this.props.match.params.id}`)
			.then(res => {
				this.setState({
					genre: res.data[0]
				})
			})
			.catch(err => {
				console.log({ err })
			})
		axios
			.get(
				`${process.env.REACT_APP_API}/songs?genre=${this.props.match.params.id}`
			)
			.then(res => {
				this.setState({
					songs: res.data
				})
			})
			.catch(err => {
				console.log({ err })
			})
	}
	render() {
		return (
			<div id="page">
				<Sidebar page="genres" />
				<div id="album">
					<div className="album">
						<div
							className="cover"
							style={{ backgroundImage: `url('${this.state.genre.cover}')` }}
						></div>
						<div className="info">
							<h2>{this.state.genre.name}</h2>
						</div>
					</div>
					<div id="songs">
						<table>
							<thead>
								<tr>
									<th></th>
									<th>Name</th>
									<th>Artist</th>
									<th>Album</th>
									<th>Genre</th>
								</tr>
							</thead>
							<tbody>
								{this.state.songs.map(song => {
									return <Song song={song} key={song.id} />
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

export default Genre
