import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Booking.css'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


function getSteps() {
  return ['Create Event', 'Create Menus', 'Complete booking'];
}


export default function Booking() {
  const [Condition, setCondition] = useState(true)
  const [EventName, setEventName] = useState(null);
  const [GroomName, setGroomName] = useState(null);
  const [BrideName, setBrideName] = useState(null);
  const [EventDate, setEventDate] = useState(null);
  const [Shift, setShift] = useState(null);
  const [snacks1, setsnacks1] = useState(null);
  const [snacks2, setsnacks2] = useState(null);
  const [snacks3, setsnacks3] = useState(null);
  const [mainDish1, setmainDish1] = useState(null);
  const [mainDish2, setmainDish2] = useState(null);
  const [sideDish1, setsideDish1] = useState(null);
  const [sideDish2, setsideDish2] = useState(null);
  const [Desert1, setDesert1] = useState(null);
  const [Desert2, setDesert2] = useState(null);
  const [ColdDrinks, setColdDrinks] = useState(null);
  const [Drinks, setDrinks] = useState(null);
  const [SpecialDish, setSpecialDish] = useState(null);
  const [Extra, setExtra] = useState(null);
  const [HallNumber, setHallNumber] = useState(null);
  const [ExpectedGuestNumber, setExpectedGuestNumber] = useState(null)
  const [EventId, setEventId] = useState(null);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const vatNo = useSelector(state => state.vatNo);
  const userData=useSelector(state=>state.userData);
  const [organizerId, setorganizerId] = useState(null)
  const [Dummy, setDummy] = useState(true)

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if ((EventName && EventDate && BrideName && GroomName && Shift) == null) {
          setCondition(true);
        } else {

          async function event() {
            const response = await fetch('http://localhost:9000/event', {
              body: JSON.stringify({
                "organizerId": organizerId,
                "eventName": EventName,
                "groomName": GroomName,
                "brideName": BrideName,
                "eventDate": EventDate,
                "shift": Shift
              }),
              headers: { "Content-type": "application/json" },
              method: "post"
            });
          }
          event();
          console.log(EventDate)
          async function getEventId() {
            const response = await fetch(`http://localhost:9000/event?organizerId=${organizerId}`);
            console.log(response)
            const data = await response.json();
            data.data[0] ==undefined ? setEventId(null) :setEventId(data.data[0].id);
            
          }
          getEventId();
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setCondition(true);
        }
        break;
      case 1:
        if ((snacks1 && mainDish1 && sideDish1 && Desert1) == null) {
          setCondition(true);
        } else {
          async function Menus() {
            const response = await fetch('http://localhost:9000/menu', {
              body: JSON.stringify({
                "eventId": EventId,
                "snacks1": snacks1,
                "snacks2": snacks2,
                "snacks3": snacks3,
                "mainDish1": mainDish1,
                "mainDish2": mainDish2,
                "sideDish1": sideDish1,
                "sideDish2": sideDish2,
                "desert1": Desert1,
                "desert2": Desert2,
                "coldDrinks": ColdDrinks,
                "drinks": Drinks,
                "specialDish": SpecialDish,
                "extra": Extra
              }),
              headers: { "Content-type": "application/json" },
              method: "post"
            });
          }
          Menus();
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setCondition(true);
        }
      case 2:
        if ((HallNumber && ExpectedGuestNumber) == null) {
          setCondition(true);
        } else {
          async function Book() {
            const response = await fetch('http://localhost:9000/booking', {
              body: JSON.stringify({
                "eventId": EventId,
                "vatNo": vatNo,
                "hallNo": HallNumber,
                "expectedGuestNo": ExpectedGuestNumber
              }),
              headers: { "Content-type": "application/json" },
              method: "post"
            });
          }
          Book();
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setCondition(true);
        }
    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  useEffect(()=>{
    async function getOrganizerId() {
      const response=await fetch(`http://localhost:9000/organizer?userName=${userData[0].userName}`)
      const data=await response.json();
      console.log(data)
      data.status=="Not registered" ? setorganizerId(null) : setorganizerId(data.data[0].id);
    }
    getOrganizerId()
  },[Dummy])

  async function becomeOrganizer() {
    const response = await fetch('http://localhost:9000/organizer',{
      method:'POST',
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({
        "userName":userData[0].userName
      })
    })
    setDummy(!Dummy);
  }

  return (
    <div>
      {console.log(organizerId)}
    {organizerId ?
    (<div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
              </Button>
                <Button variant="contained" color="primary" disabled={Condition} onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>)
      : (
        <div>
          <h1>Become an organizer</h1>
          <p>You have to be an organizer to organize an event</p>
          <button onClick={becomeOrganizer}>Become Organizer</button>
        </div>
      )  }
      </div>
      );

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div className='booking__Event'>
            <label>Event Name</label>
            <input type='text' value={EventName ?? ''} onBlur={() => setCondition((EventName && EventDate && BrideName && GroomName && Shift) == null)} onChange={(e) => { { e.target.value == '' ? setEventName(null) : setEventName(e.target.value) }; setCondition((EventName && EventDate && BrideName && GroomName && Shift) == null) }} required />
            <label>Groom Name</label>
            <input type='text' value={GroomName ?? ''} onBlur={() => setCondition((EventName && EventDate && BrideName && GroomName && Shift) == null)} onChange={(e) => { { e.target.value == '' ? setGroomName(null) : setGroomName(e.target.value) };; setCondition((EventName && EventDate && BrideName && GroomName && Shift) == null) }} required />
            <label>Bride Name</label>
            <input type='text' value={BrideName ?? ''} onBlur={() => setCondition((EventName && EventDate && BrideName && GroomName && Shift) == null)} onChange={(e) => { { e.target.value == '' ? setBrideName(null) : setBrideName(e.target.value) }; setCondition((EventName && EventDate && BrideName && GroomName && Shift) == null) }} required />
            <label>Event Date</label>
            <input type='date' onBlur={() => setCondition((EventName && EventDate && BrideName && GroomName && Shift) == null)} onChange={(e) => { { e.target.value == '' ? setEventDate(null) : setEventDate(e.target.value) }; setCondition((EventName && EventDate && BrideName && GroomName && Shift) == null) }} required />
            <label>Shift</label>
            <input type='text' value={Shift ?? ''} onBlur={() => setCondition((EventName && EventDate && BrideName && GroomName && Shift) == null)} onChange={(e) => { { e.target.value == '' ? setShift(null) : setShift(e.target.value) }; setCondition((EventName && EventDate && BrideName && GroomName && Shift) == null) }} required />

          </div>
        );
      case 1:
        return (
          <div className='booking__Menus'>
            <label>Snacks1</label>
            <input type='text' value={snacks1 ?? ''} onBlur={() => setCondition(((snacks1 && mainDish1 && sideDish1 && Desert1) == null))} onChange={(e) => { { e.target.value == '' ? setsnacks1(null) : setsnacks1(e.target.value) }; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>Snacks2</label>
            <input type='text' value={snacks2 ?? ''} onBlur={() => setCondition(((snacks1 && mainDish1 && sideDish1 && Desert1) == null))} onChange={(e) => { { e.target.value == '' ? setsnacks2(null) : setsnacks2(e.target.value) }; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>Snacks3</label>
            <input type='text' value={snacks3 ?? ''} onBlur={() => setCondition(((snacks1 && mainDish1 && sideDish1 && Desert1) == null))} onChange={(e) => { { e.target.value == '' ? setsnacks3(null) : setsnacks3(e.target.value) }; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>mainDish1</label>
            <input type='text' value={mainDish1 ?? ''} onBlur={() => setCondition(((snacks1 && mainDish1 && sideDish1 && Desert1) == null))} onChange={(e) => { { e.target.value == '' ? setmainDish1(null) : setmainDish1(e.target.value) }; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>mainDish2</label>
            <input type='text' value={mainDish2 ?? ''} onBlur={() => setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null)} onChange={(e) => { { e.target.value == '' ? setmainDish2(null) : setmainDish2(e.target.value) }; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>SideDish1</label>
            <input type='text' value={sideDish1 ?? ''} onBlur={() => setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null)} onChange={(e) => { { e.target.value == '' ? setsideDish1(null) : setsideDish1(e.target.value) }; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>SideDish2</label>
            <input type='text' value={sideDish2 ?? ''} onBlur={() => setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null)} onChange={(e) => { { e.target.value == '' ? setsideDish2(null) : setsideDish2(e.target.value) }; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>Desert1</label>
            <input type='text' value={Desert1 ?? ''} onBlur={() => setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null)} onChange={(e) => { { e.target.value == '' ? setDesert1(null) : setDesert1(e.target.value) };; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>Desert2</label>
            <input type='text' value={Desert2 ?? ''} onBlur={() => setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null)} onChange={(e) => { { e.target.value == '' ? setDesert2(null) : setDesert2(e.target.value) };; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>ColdDrinks</label>
            <input type='text' value={ColdDrinks ?? ''} onBlur={() => setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null)} onChange={(e) => { { e.target.value == '' ? setColdDrinks(null) : setColdDrinks(e.target.value) }; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>Drinks</label>
            <input type='text' value={Drinks ?? ''} onBlur={() => setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null)} onChange={(e) => { { e.target.value == '' ? setDrinks(null) : setDrinks(e.target.value) }; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>Special Dish</label>
            <input type='text' value={SpecialDish ?? ''} onBlur={() => setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null)} onChange={(e) => { { e.target.value == '' ? setSpecialDish(null) : setSpecialDish(e.target.value) }; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
            <label>Extra</label>
            <input type='text' value={Extra ?? ''} onBlur={() => setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null)} onChange={(e) => { { e.target.value == '' ? setExtra(null) : setExtra(e.target.value) }; setCondition((snacks1 && mainDish1 && sideDish1 && Desert1) == null) }} />
          </div>

        );
      case 2:
        return (
          <div className='booking__Book'>
            <label>Hall Number</label>
            <input type='number' value={HallNumber ?? ''} onBlur={() => setCondition((HallNumber && ExpectedGuestNumber) == null)} onChange={(e) => { { e.target.value == '' ? setHallNumber(null) : setHallNumber(e.target.value) }; setCondition((HallNumber && ExpectedGuestNumber) == null) }} />
            <label>Expected Guest Number</label>
            <input type='number' value={ExpectedGuestNumber ?? ''} onBlur={() => setCondition((HallNumber && ExpectedGuestNumber) == null)} onChange={(e) => { { e.target.value == '' ? setExpectedGuestNumber(null) : setExpectedGuestNumber(e.target.value) };; setCondition((HallNumber && ExpectedGuestNumber) == null) }} />
          </div>
        );
      default:
        return 'Unknown stepIndex';
    }
  }
}
