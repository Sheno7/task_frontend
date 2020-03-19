import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import {connect} from 'react-redux'

class AuthMiddleware extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            redirect: false,
          };
    }
   async componentWillMount() {
        try {
            await axios.post(process.env.REACT_APP_ADMIN_URL + '/checktoken',{},{
                headers:{'Authorization':'Bearer '+this.props.token},
            })        
            this.setState({ loading: false });
        }
        catch (error) {
            this.props.Logout();
            this.setState({ loading: false, redirect: true });
        }
    }
    render() {
        const { loading, redirect } = this.state;
        if (loading) {
            return null;
          }
          if (redirect) {
            return <Redirect to="/login" />;
          }
          return React.cloneElement(this.props.children, { token: this.props.token })
        //   return this.props.children.
        }

}
const mapStateToProps=(state)=>{
    return {Login:state.login,token:state.token}
  };
  const mapMethodToProps = (dispatch) => {
    return {
      Logout: () => { dispatch({ 'type': "LOGOUT"}) }
    }
  }
export default connect(mapStateToProps,mapMethodToProps)(AuthMiddleware);