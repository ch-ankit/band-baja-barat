import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap'
import './Card.css'

class Cards extends Component {
    render() {
        return (
            <div>
                <Card border="dark" style={{ width: '18rem', height: 'auto' }} bg='dark' text='light' textAlign='left'>
                    <Card.Img height='200px' variant="top" src={this.props.image} />
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text style={{ textAlign: 'left' }}>
                            {this.props.Description}
                        </Card.Text>
                        <Card.Text className="Card-Price">
                            Price:{this.props.Price}
                        </Card.Text>
                        <Button className="hello" variant="primary">Buy</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Cards;