import React, { Component } from 'react';
import Store from './Store';
import tv from './tv.jpg'
import wash from './wash.jpg'
import cook from './cook.jpg'

class AdminStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }
    render() {
        return (
            <div>
                <Store gifts={this.state.gifts} isAdmin={true} />
            </div>
        );
    }
}

export default AdminStore;