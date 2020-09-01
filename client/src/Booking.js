import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Booking.css'
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
  return ['Create Event', 'Create Menus', 'Complete booking','Draft Invitation'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <div className='booking__Event'>
          <label>Event Name</label>
          <input type='text' />
          <label>Groom Name</label>
          <input type='text' />
          <label>Bride Name</label>
          <input type='text' />
          <label>Event Date</label>
          <input type='date' />
          <label>Shift</label>
          <input type='text' />
        </div>
      );
    case 1:
      return(
        <div className='booking__Menus'>
          <label>Snacks1</label>
          <input type='text' />
          <label>Snacks2</label>
          <input type='text' />
          <label>Snacks3</label>
          <input type='text' />
          <label>mainDish1</label>
          <input type='text' />
          <label>mainDish2</label>
          <input type='text' />
          <label>SideDish1</label>
          <input type='text' />
          <label>SideDish2</label>
          <input type='text' />
          <label>Desert1</label>
          <input type='text' />
          <label>Desert2</label>
          <input type='text' />
          <label>ColdDrinks</label>
          <input type='text' />
          <label>Drinks</label>
          <input type='text' />
          <label>Special Dish</label>
          <input type='text' />
          <label>Extra</label>
          <input type='text' />
        </div>

      );
    case 2:
      return(
        <div className='booking__Book'>
          <label>Hall Number</label>
          <input type='number' />
          <label>Expected Guest Number</label>
          <input type='number' />
        </div>
      );
    default:
      return 'Unknown stepIndex';
  }
}

export default function Booking() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
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
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
