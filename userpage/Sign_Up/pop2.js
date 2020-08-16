import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Button,ButtonGroup} from 'react-bootstrap'
import {connect} from 'react-redux'
import SHost from './sHost'
import Usign from './sUser'


function Pop2(props){
    const [host,setHost]=useState(true);
    const [hcolor,sethcolor]=useState('yellow');
    const [lcolor,setlcolor]=useState('white')
    const Host=()=>{
        setHost(true);
        sethcolor('yellow');
        setlcolor('white');
    }
    const User=()=>{
        setHost(false);
        setlcolor('yellow');
        sethcolor('white');
    }
    return(
        <div>
            <Modal show={true} onHide={props.change} style={{textAlign:'center'}}>
                <Modal.Header closeButton>
                    <h1 style={{width:'100%',color:'blue'}}>Sign Up</h1>
                </Modal.Header>
                <Modal.Body>
                <ButtonGroup style={{width:'100%'}}>
                        <Button style={{backgroundColor:hcolor,color:'black'}} onClick={Host}>Host</Button>
                        <Button style={{backgroundColor:lcolor,color:'black'}} onClick={User}>User</Button>
                    </ButtonGroup>
                    {host?<SHost/>:<Usign />}
                </Modal.Body>
            </Modal>
        </div>
    );
}
const mapStatetoProps=state=>{
    return{
        logIn:state.logIn,
        name:state.name
    }
  };
  
  const mapDispatch=dispatch=>{
    return{change:()=>
        dispatch({type:'SignUp'})
    }
  }
export default connect(mapStatetoProps,mapDispatch)(Pop2);