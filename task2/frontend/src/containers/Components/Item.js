import React, { Component } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Row, Col, Button } from 'reactstrap';

export class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      items:[],
      item:{}
    }
  }
  componentDidMount(){
      var items=this.props.items;
      this.setState({
        items:items
      })
  }
  render() {
    var item=this.state.data;
    return (
      <>
        <Card>
          <CardHeader>
            {item.name}
          </CardHeader>
          <CardBody>  {item.description}</CardBody>
          <CardFooter>
            <Row>
              <Col xs="6">
                Price: {item.price} EGP
                </Col>
              <Col xs="6">
                <Button className="btn btn-success" onClick={()=>this.props.modal(item)}>Add to Card</Button>
                </Col>
            </Row>
          </CardFooter>
        </Card>
      </>
    )
  }
}

export default Item
