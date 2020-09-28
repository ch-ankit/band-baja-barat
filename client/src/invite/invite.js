import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Accordion from 'react-bootstrap/Accordion'

import Card from 'react-bootstrap/Card'
import './comp1.css'
import UserHeader from '../UserHeader.js'
class Invite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            invitation: []
        }
    }
    async componentDidMount() {
        const response = await fetch('http://localhost:9000/userhome/invitationrecieved?userName=mda');
        const data = await response.json();
        this.setState({
            invitation: data.data
        })

    }
    render() {
        return (
            <div>
                <UserHeader />
                <div id='inv'>
                    {Object.keys(this.state.invitation).map((keys) => {
                        return (<div style={{ paddingTop: '20px' }}>
                            <Accordion style={{ width: '600px' }}>
                                <Card>
                                    <Accordion.Toggle eventKey='0'>
                                        <Card.Header id='invit'>
                                            Name: {this.state.invitation[keys].userName}
                                        </Card.Header>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey='0'>
                                        <Card.Body id='invite'>
                                            <p> {this.state.invitation[keys].groomName} son of {this.state.invitation[keys].groomFather} and {this.state.invitation[keys].groomMother}</p>
                                            <h4>Weds</h4>
                                            <p> {this.state.invitation[keys].brideName} daughter of {this.state.invitation[keys].brideFather} and {this.state.invitation[keys].brideMother}</p>
                                            <div className='invitationDraft__location'>
                                                Party Palace:{this.state.invitation[keys].hostName}<br />
                                        Date:{this.state.invitation[keys].eventDate.slice(0, 10)}
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>)
                    })}
                </div>
            </div>
        );
    }
}
export default Invite;