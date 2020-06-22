import React from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import myFirebase from '../../firebase'

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        error: '',
        isLoading: false
    }

    render() {
        const { username, email, password, passwordConfirmation, error, isLoading } = this.state

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for DevChat
                    </Header>
                    <Form stacked>
                        <Segment stacked>
                            <Form.Input value={username} type="text" fluid name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange} />
                            <Form.Input value={email} type="email" fluid name="email" icon="mail" iconPosition="left" placeholder="Email" onChange={this.handleChange} />
                            <Form.Input value={password} type="password" fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} />
                            <Form.Input value={passwordConfirmation} type="password" fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={this.handleChange} />
                            <Button disabled={isLoading} fluid size="large" onClick={this._handleSubmit} className={isLoading ? 'loading' : ''}>Submit</Button>
                        </Segment>
                    </Form>
                    <Message>Already a user? <Link to='/login'>Login</Link></Message>
                    {error && <Message error>{error}</Message>}
                </Grid.Column>
            </Grid>
        )
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    _handleSubmit = event => {
        if (this._isFormValid()) {
            this.setState({ error: '', isLoading: true })
            event.preventDefault()
            myFirebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    createdUser.user.updateProfile({
                        displayName: this.state.username
                    })
                    this._clearForm()
                }
                ).catch(err => this.setState({ isLoading: false }))
        }
    }

    _isFormValid = () => {
        if (this._isformEmpty()) {
            this.setState({ error: 'Fill in all details' })
            return false
        } else if (!this._isPasswordValid()) {
            this.setState({ error: 'Password is invalid' })
            return false
        } else {
            return true
        }
    }

    _isformEmpty = () => {
        const { username, email, password, passwordConfirmation } = this.state

        return !username || !email || !password || !passwordConfirmation
    }

    _isPasswordValid = () => {
        const { password, passwordConfirmation } = this.state

        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false
        } else if (password !== passwordConfirmation) {
            return false
        } else {
            return true
        }
    }

    _clearForm = () => {
        this.setState({
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            isLoading: false
        })
    }
}

export default Register