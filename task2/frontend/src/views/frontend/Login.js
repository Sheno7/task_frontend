import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Form, Input, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios'
import { connect } from 'react-redux'
import Validation from '../../containers/Validation'

const style = {
  error: {
      'color': 'red',
      'display': 'blocked',
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        email: '',
        password: '',
      },
      validation:new Validation({}, []),
      errors:''
    }
    if(this.props.Login)
      this.props.history.push('/')
  }
  loginHandle = async (event) => {
    event.preventDefault();
    await this.setState({
      input: {
        email: event.target.elements.email.value,
        password: event.target.elements.password.value,
      },
      validation:new Validation({}, [])

    });
    var rules = {
      'email': ['email','required'],
      'password': ['password']
    }
    await this.setState({validation:new Validation(this.state.input, rules)});
    if (!this.state.validation.success()) {
      this.setState({
        errors:''
      })
      return 0;
    }
    else {
      console.log('success')
    }
    try{
      var result = await axios.post(process.env.REACT_APP_ADMIN_URL + '/login', this.state.input);
      if (result.data.status === 1) {
        this.props.doLogin(result.data.data.user, result.data.data.token)
        this.props.history.push('/')
      }
    }
    catch(error){
      this.setState({
        errors:error.response.data.message
      })
    }
  }

  render() {

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.loginHandle}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
    {this.state.errors?(<p style={style.error}>{this.state.errors}</p>):''}
                      {this.state.validation.message('email')}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="email" placeholder="Email" ref={node => (this.inputNode = node)} autoComplete="email" />
                      </InputGroup>
                      {this.state.validation.message('password')}
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" ref={node => (this.inputNode = node)} autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" type="submit" className="px-4">Login</Button>
                        </Col>
                       
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
               </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { Login: state.login }
};
const mapMethodToProps = (dispatch) => {
  return {
    doLogin: (user, token) => { dispatch({ 'type': "DO_LOGIN", 'user': user, 'token': token }) }
  }
}
export default connect(mapStateToProps, mapMethodToProps)(Login);