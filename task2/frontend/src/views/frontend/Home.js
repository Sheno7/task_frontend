import React, { Component } from 'react';
import { Col, Row, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import axios from 'axios'
import { connect } from 'react-redux'
import Validation from '../../containers/Validation'
import Item from '../../containers/Components/Item'
import CustomModal from '../../containers/Components/Modal'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      item: {},
      validation: new Validation({}, []),
      errors: ''
    };
  }
  async componentDidMount() {
    const data = await axios.get(process.env.REACT_APP_ADMIN_URL + '/get-items');
    if (data) {
      this.setState({
        data: data.data.data,
        modal: false
      })
    }
  }
  addToCart = async (event) => {
    event.preventDefault();
    var inputs = { quantity: event.target.elements.quantity.value }
    var rules = {
      'quantity': ['number', 'required'],
    }
    await this.setState({ validation: new Validation(inputs, rules) });
    if (!this.state.validation.success()) {
      this.setState({
        errors: ''
      })
      return 0;
    }
    else {
      var items = this.props.items.length?this.props.items:[];
      var objIndex = items.findIndex((obj => obj.id === this.state.item.id));
      if (items[objIndex]) {
          items[objIndex].quantity = parseInt(items[objIndex].quantity) + parseInt(inputs.quantity);
      }
      else {
        items.push({ ...this.state.item, quantity: inputs.quantity });
      }

      this.props.addCart(items)
      this.setState({
        modal: !this.state.modal,
        item: {}
      })
      return this.state.modal
    }

  }
  openModal = (item) => {
    this.setState({
      modal: !this.state.modal,
      item: item
    })
    return this.state.modal
  }



  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          {this.state.data.map(row => { return <Col xs="12" sm="6" md="4" key={row.id} ><Item key={row.id} data={row} modal={this.openModal} /></Col> })}

        </Row>
        <CustomModal handleSubmit={this.addToCart} buttonLabel="create" toggle={this.openModal} modal={this.state.modal}>
          <FormGroup>
            {this.state.validation.message('quantity')}
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Quantity</InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="quantity" ref={node => (this.inputNode = node)} autoComplete="count" />
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-user"></i></InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </CustomModal>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { items: state.items, token: state.token }
};
const mapMethodToProps = (dispatch) => {
  return {
    addCart: (items) => { dispatch({ 'type': "ADD_CART", 'items': items }) }
  }
}
export default connect(mapStateToProps, mapMethodToProps)(Home);
