import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';

import { AppSidebarToggler } from '@coreui/react';
import axios from 'axios'
import { connect } from 'react-redux'

class DefaultHeader extends Component {
  logoutHandle = () => {
    axios.post(process.env.REACT_APP_ADMIN_URL + '/logout', {}, { headers: { 'Authorization': 'Bearer ' + this.props.token } })
    this.props.doLogout(this.props.user, this.props.token);
    return this.props.history.push("/login");
  }
  render() {

    // eslint-disable-next-line
    let { children, items,count, ...attributes } = this.props;
    console.log('test')
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/" className="nav-link" >Home</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="/carts" className="nav-link"><i className="icon-basket-loaded"></i>
              {count > 0 ? (<Badge pill color="danger">{count}</Badge>) : ''}
            </NavLink>
          </NavItem>
          {this.props.Login ? (
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav>
                <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>

                <DropdownItem onClick={this.logoutHandle}><i className="fa fa-lock"></i> Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
              <NavItem className="d-md-down-none">
                <NavLink to="/login" className="nav-link">Login</NavLink>
              </NavItem>
            )}
          <NavItem className="d-md-down-none"></NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  let count=state.items.length;
  return { count:count, Login: state.login, token: state.token }
};
const mapMethodToProps = (dispatch) => {
  return {
    doLogout: (user, token) => { dispatch({ 'type': "LOGOUT", 'user': user, 'token': token }) }
  }
}
export default connect(mapStateToProps, mapMethodToProps)(withRouter(DefaultHeader));
