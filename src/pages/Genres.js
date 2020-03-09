import React from 'react'
import axios from 'axios'

import '../styles/albums.css'

import Sidebar from '../components/Sidebar'
import Genre from '../components/Genre'

class Genres extends React.Component {
	state = {
		genres: []
	}
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/genres`)
			.then(res => {
				this.setState({
					genres: res.data
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
				<div id="albums">
					{this.state.genres.map(genre => {
						return <Genre genre={genre} key={genre.id} />
					})}
				</div>
			</div>
		)
	}
}

export default Genres
