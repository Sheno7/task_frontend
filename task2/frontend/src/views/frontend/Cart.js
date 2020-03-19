import React, { Component } from 'react';
import axios from 'axios';
import {
    Card, CardBody,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText, CardHeader, Col, Row, Table, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Validation from '../../containers/Validation'
import CustomModal from '../../containers/Components/Modal'

const style = {
    error: {
        'color': 'red',
        'display': 'blocked',
    },
    success: {
        'color': 'green',
        'display': 'blocked',
    }
}

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 0,
            item: {},
            validation: new Validation({}, []),
            errors: '',
            success: ''
        }

    }
    componentDidMount() {
        this.calculate()
    }
    updateCart = async (event) => {
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
            var items = this.props.items.length ? this.props.items : [];
            var objIndex = items.findIndex((obj => obj.id === this.state.item.id));
            if (items[objIndex]) {
                items[objIndex].quantity = parseInt(inputs.quantity);
            }

            await this.props.updateCart(items)
            this.setState({
                updateModal: !this.state.updateModal,
                item: {}
            })
            this.calculate();
            return this.state.updateModal
        }

    }
    deleteItem = async (item) => {
        var items = this.props.items;
        var newItems = items.filter((row) => {
            return row.id !== item.id
        })
        await this.props.updateCart(newItems)
        this.calculate();
    }

    updateToggle = (item) => {
        this.setState({
            updateModal: !this.state.updateModal,
            item: item
        })
        return this.state.updateModal
    }
    completeToggle = () => {
        this.setState({
            completeModal: !this.state.completeModal,
        })
        return this.state.completeModal
    }
    calculate() {
        let items = this.props.items;
        let totalPrice = 0;
        items.forEach(row => {
            totalPrice += row.price * row.quantity;
        });
        this.setState({
            totalPrice: totalPrice
        })
    }

    completeOrder = async (event) => {
        event.preventDefault();
        var inputs = {
            address: event.target.elements.address.value,
            phone: event.target.elements.phone.value,
        }
        var rules = {
            'address': ['required'],
            'phone': ['phone','required'],
        }
        await this.setState({ validation: new Validation(inputs, rules) });
        if (!this.state.validation.success()) {
            this.setState({
                errors: ''
            })
            return 0;
        }
        else {
            let items = this.props.items;
            var requests = [];

            items.forEach(row => {
                requests.push({ id: row.id, quantity: row.quantity })
            });
            console.log(requests)
            try {
                await axios.post(process.env.REACT_APP_ADMIN_URL + '/cart', {
                    items: requests,
                    address: inputs.address,
                    phone: inputs.phone,
                }, {
                    headers: { 'Authorization': 'Bearer ' + this.props.token },
                })
                this.setState({
                    totalPrice:0,
                    errors: '',
                    success: 'Order has been sent'
                })
                this.completeToggle();
                this.props.updateCart([]);
            }
            catch (error) {
                if (error.response.status === 400)
                    this.setState({
                        errors: error.response.data.message,
                        success: ''
                    })
                else
                    this.setState({
                        errors: 'something went wrong',
                        success: ''
                    })

            }
        }


    }

    render() {
        let { items } = this.props
        return (
            <div className="animated fadeIn">

                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                {this.state.success ? (<p style={style.success}>{this.state.success}</p>) : ''}
                                <Row>
                                    <Col xs="10">
                                        <i className="fa fa-align-justify"></i> Cart
                                    </Col>
                                    <Col xs="2">
                                        <Link to='/' className="btn btn-success">back</Link>
                                    </Col>

                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Item Price</th>
                                            <th>quantity</th>
                                            <th>Total Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item => {
                                            return (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price * item.quantity} EGP</td>
                                                <td>
                                                    <Button className="btn btn-success" onClick={() => this.updateToggle(item)}><i className="fa fa-pencil"></i></Button>
                                                    <Button className="btn btn-danger" onClick={() => this.deleteItem(item)}><i className="fa fa-trash"></i></Button>
                                                </td>
                                            </tr>
                                            )})}
                                        {this.state.totalPrice > 0 ? (
                                            <tr>
                                                <td colSpan="3">Total price</td>
                                                <td colSpan="1" >{this.state.totalPrice} EGP</td>
                                                <td colSpan="1" ><Button className="btn btn-success" onClick={this.completeToggle}>Complete order</Button></td>
                                            </tr>
                                        ) : ''}

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <CustomModal handleSubmit={this.updateCart} buttonLabel="update" toggle={this.updateToggle} modal={this.state.updateModal}>
                    <FormGroup>
                        {this.state.validation.message('quantity')}
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Quantity</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" name="quantity" defaultValue={this.state.item.quantity} ref={node => (this.inputNode = node)} autoComplete="count" />
                            <InputGroupAddon addonType="append">
                                <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </CustomModal>

                <CustomModal handleSubmit={this.completeOrder} buttonLabel="update" toggle={this.completeToggle} modal={this.state.completeModal}>
                    <FormGroup>
                        {this.state.errors ? (<p style={style.error}>{this.state.errors}</p>) : ''}
                        {this.state.validation.message('address')}
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Address</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" name="address" ref={node => (this.inputNode = node)} autoComplete="address" />
                            <InputGroupAddon addonType="append">
                                <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>

                    </FormGroup>
                    <FormGroup>
                        {this.state.validation.message('phone')}
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Phone</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" name="phone" ref={node => (this.inputNode = node)} autoComplete="phone" />
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
    return { items: state.items }
};
const mapMethodToProps = (dispatch) => {
    return {
        updateCart: (items) => { dispatch({ 'type': "ADD_CART", 'items': items }) }
    }
}
export default connect(mapStateToProps, mapMethodToProps)(Cart);
