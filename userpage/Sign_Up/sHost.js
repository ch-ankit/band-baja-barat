import React from 'react'
import {Form,FormControl,Col,Button} from 'react-bootstrap'
import ImageSelectPreview from 'react-image-select-pv'

class SHost extends React.Component{
    render(){
        return(
            <div>
            <Form>
                <br/>
                <div style={{textAlign:'start'}}><Form.Label>Party Palce</Form.Label></div>
                <FormControl type='text' />
                <br/>
                <div style={{textAlign:'start'}}><Form.Label>Vat no.</Form.Label></div>
                <FormControl type='number' />
                <br/>
                <Form.Row>
                    <Col>
                        <div style={{textAlign:'start'}}><Form.Label>Lattitude</Form.Label></div>
                        <FormControl type='number' />
                    </Col>
                    <Col>
                        <div style={{textAlign:'start'}}><Form.Label>Longitude</Form.Label></div>
                        <FormControl type='number' />
                    </Col>
                </Form.Row>
                <br/>
                    <ImageSelectPreview />
                <br/>
                <p>
                <div style={{textAlign:'start',paddingLeft:'10px'}}>Password</div>
                </p>
                <FormControl type='password'/><br />
                <Button href='/pp'> Sign Up</Button>
                </Form>
        </div>
        );
    }
}
export default SHost;