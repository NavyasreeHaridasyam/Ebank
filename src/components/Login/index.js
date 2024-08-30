import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({errorMsg: error})
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangeUserPin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitLogin = async event => {
    event.preventDefault()

    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response.ok)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-container">
          <div className="left-side">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login"
            />
          </div>
          <div className="right-side">
            <h1 className="login-heading">Welcome Back!</h1>
            <form className="form-container" onSubmit={this.onSubmitLogin}>
              <label htmlFor="userId" className="label">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="input"
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
                value={userId}
              />
              <label htmlFor="userPin" className="label">
                PIN
              </label>
              <input
                type="password"
                id="userPin"
                className="input"
                placeholder="Enter PIN"
                onChange={this.onChangeUserPin}
                value={pin}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              <p className="error">{errorMsg}</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
