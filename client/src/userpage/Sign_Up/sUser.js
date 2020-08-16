import React from 'react'
import {Form,FormControl,Button,Col} from 'react-bootstrap';


class Usign extends React.Component{
    render(){
        return(
            <div>
            <Form>
                <br/>
                <Form.Row>
                    <Col>
                        <div style={{textAlign:'start'}}><Form.Label>First Name</Form.Label></div>
                        <FormControl type='text' />
                    </Col>
                    <Col>
                        <div style={{textAlign:'start'}}><Form.Label>Middle Name</Form.Label></div>
                        <FormControl type='text' />
                    </Col>
                    <Col>
                        <div style={{textAlign:'start'}}><Form.Label>Last Name</Form.Label></div>
                        <FormControl type='text' />
                    </Col>
                </Form.Row>
                <br/>
                <div style={{textAlign:'start'}}><Form.Label>User Name</Form.Label></div>
                <FormControl type='text' />
                <br />
                <div style={{textAlign:'start'}}><Form.Label>Email</Form.Label></div>
                <FormControl type='email' />
                <br/>
                <div style={{textAlign:'start'}}><Form.Label>Contact info</Form.Label></div>
                <FormControl type='number' />
                <br />
                <div style={{textAlign:'start'}}><Form.Label>Address</Form.Label></div>
                <Form.Row>
                    <Col>
                        <div style={{textAlign:'start'}}><Form.Label>Zone</Form.Label></div>
                        <FormControl type='text' />
                    </Col>
                    <Col>
                        <div style={{textAlign:'start'}}><Form.Label>District</Form.Label></div>
                        <FormControl type='text' />
                    </Col>
                    <Col>
                        <div style={{textAlign:'start'}}><Form.Label>Ward no.</Form.Label></div>
                        <FormControl type='number' />
                    </Col>
                </Form.Row>
                <br />

                <p>
                <div style={{textAlign:'start',paddingLeft:'10px'}}>Password</div>
                </p>
                <FormControl type='password'/><br />
                <Button> Sign Up</Button>
                </Form>
        </div>  
        );
    }
}
export default Usign;