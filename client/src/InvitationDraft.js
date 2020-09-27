import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Accordion from 'react-bootstrap/Accordion'

import Card from 'react-bootstrap/Card'
import './InvitationDraft.css'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import UserHeader from './UserHeader'
import { EventData } from './redux/action'
class InvitationDraft extends React.Component{
    constructor(props){
        console.log(props.eventData)
        super(props);
        this.state={
            GFather:'',
            GMother:'',
            BFather:'',
            BMother:'',
            eventData:props.eventData,
            honorableMention:''
        }
        this.draftInvitation=this.draftInvitation.bind(this);
    }
    async draftInvitation(){
        const response = await fetch('http://localhost:9000/invitation/draft',{
            body:JSON.stringify({
                "eventId":this,state.eventData.eventId,
                "G"
            }),
            method: 'POST',
            headers:{
                "Content-type":'application/json'
            }
        })
    }
    
    render(){
        return(
            <div>
                <UserHeader />
                <input type='number' placeholder='eventID' value={this.state.eventData.eventId} onBlur={this.eventDetails} />
                <input type='text' placeholder="Groom's Father Name" onChange={(e)=>{this.setState({GFather:e.target.value})}} value={this.state.GFather}/>
                <input type='text' placeholder="Groom's Mother Name" onChange={(e)=>{this.setState({GMother:e.target.value})}} value={this.state.GMother} />
                <input type='text' placeholder="Bride's Father Name" onChange={(e)=>{this.setState({BFather:e.target.value})}} value={this.state.BFather} />
                <input type='text' placeholder="Bride's Mother Name" onChange={(e)=>{this.setState({BMother:e.target.value})}} value={this.state.BMother} />
                <input type='text' placeholder="Honorable Mentions" onChange={(e)=>{this.setState({honorableMention:e.target.value})}} value={this.state.honorableMention} />
￼            <div id='inv' style={{paddingLeft:'350px'}}>
                <Accordion style={{width:'600px'}}>
                    <Card>
                        <Accordion.Toggle eventKey='0'>
                            <Card.Header id='invit'>
                                Name: Babin Khatri
                            </Card.Header>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='0'>
                            <Card.Body id='invite'>
                              <p> {this.state.eventData.groomName} son of {this.state.GFather} and {this.state.GMother}</p>
                              <h4>Weds</h4>
                              <p> {this.state.eventData.brideName} son of {this.state.BFather} and {this.state.BMother}</p> 
                                <div className='invitationDraft__location'>
                                    Party Palace:{this.state.eventData.hostName}<br />
                                    Date:{this.state.eventData.eventDate.slice(0,10)}
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <button onClick={}>OK</button>
            </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    eventData: state.eventData
  });
export default connect(mapStateToProps)(InvitationDraft);