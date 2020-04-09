import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import axios from 'axios'

class Stripe extends React.Component {
	state = {
		message: {
			content: '',
			type: '',
		},
	}
	pay = (e) => {
		this.props.stripe.createToken({}).then((token) => {
			axios.post(`${process.env.REACT_APP_API}/pay`, token).then((res) => {
				let newMessage = this.state.message
				if (res.data.status === 'succeeded') {
					newMessage.type = res.data.status
					newMessage.content = res.data.outcome.seller_message
					this.setState({ message: newMessage })
					setTimeout(this.props.closePaywall, 2000)
				} else {
					newMessage.type = res.data.type
					newMessage.content = res.data.message
					this.setState({ message: newMessage })
				}
			})
		})
	}
	getMessageClass = () => {
		if (!this.state.message.type) {
			return ''
		} else if (this.state.message.type === 'succeeded') {
			return 'success'
		} else {
			return 'error'
		}
	}
	render() {
		return (
			<>
				<CardElement />
				{this.state.message ? (
					<div className={this.getMessageClass()}>
						{this.state.message.content}
					</div>
				) : (
					''
				)}
				<button className='submit' onClick={this.pay}>
					Pay
				</button>
			</>
		)
	}
}

export default injectStripe(Stripe)
