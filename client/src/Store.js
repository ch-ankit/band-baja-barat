import React, { Component } from 'react';
import { Navbar, Nav, CardDeck } from 'react-bootstrap'
import tv from './tv.jpg'
import wash from './wash.jpg'
import cook from './cook.jpg'
import Cards from './Card'
import Form from './Form'

class Store extends Component {
    static defaultProps = {
        gifts: [{
            image: tv,
            title: 'Television',
            Description: 'A television set or television receiver, more commonly called a television, TV, TV set, telly, or tele, is a device that combines a tuner, display, and loudspeakers, for the purpose of viewing and hearing television broadcasting through satellites or cables, or viewing and hearing a computer.',
            Price: '2,00,000'
        },
        {
            image: wash,
            title: 'Washing Machine',
            Description: 'Washing machines, because of their weight and the need for water connections, are permanently installed appliances that rely on mobile customer service. This appliance is part of a product family that comprises household, semi-commercial, and commercial machines.',
            Price: '90,000'
        },
        {
            image: cook,
            title: 'Cooking Set',
            Description: 'Cookware and bakeware are types of food preparation containers, commonly found in a kitchen. Cookware comprises cooking vessels, such as saucepans and frying pans, intended for use on a stove or range cooktop. Bakeware comprises cooking vessels intended for use inside an oven.',
            Price: '20,000'
        }]
    }
    render() {
        const deck = this.props.gifts.map(el => <Cards title={el.title} Description={el.Description} image={el.image} Price={el.Price} />)
        let form;
        if (this.props.isAdmin) {
            form = <Form />
        }
        return (
            <div style={{ height: '100vh', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,93,1) 35%, rgba(0,212,255,1) 100%)' }} >
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/store">Gift Store</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/store">Home</Nav.Link>
                        <Nav.Link href="/purchased">Purchased Gifts</Nav.Link>
                        <Nav.Link href="/">Dashboard</Nav.Link>
                    </Nav>
                </Navbar>
                <CardDeck style={{ padding: '1rem' }}>{deck}</CardDeck>
                <div>{form}</div>
            </div>
        );
    }
}

export default Store;