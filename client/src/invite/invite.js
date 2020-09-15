import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Accordion from 'react-bootstrap/Accordion'

import Card from 'react-bootstrap/Card'
import './comp1.css'
import UserHeader from '../UserHeader.js'
class Invite extends React.Component{
    render(){
        return(
            <div>
            <UserHeader />
            <div id='inv' style={{paddingLeft:'350px'}}>
                <Accordion style={{width:'600px'}}>
                    <Card>
                        <Accordion.Toggle eventKey='0'>
                            <Card.Header id='invit'>
                                Name: Babin Khatri
                            </Card.Header>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='0'>
                            <Card.Body id='invite'>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
            </div>
        );
    }
}
export default Invite;