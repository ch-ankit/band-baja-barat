import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from "@material-ui/core/Avatar"
import './Drawer.css'
import { auth } from "./firebaseConfig"
import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { actionCreate, SetAdmin, AdminLog } from './redux/action.js';
import { useSelector } from 'react-redux';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});
export default function TemporaryDrawer({ isGiftStore }) {
  const Userdata = useSelector(state => state.userData)
  const admin = useSelector(state => state.isAdmin)
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: true,
  });
  const history = useHistory();


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {isGiftStore && <ListItem button onClick={() => admin ? history.push('/admin') : history.push('/User')}>
          <ListItemText primary='Homepage' />
        </ListItem>}
        {!admin && <ListItem button onClick={() => history.push('/User/userInfo')}>
          <ListItemText primary='My Information' />
        </ListItem>}
        {!admin && <ListItem button >
          <ListItemText primary='Invitations' onClick={() => history.push('/invite')} />
        </ListItem>}
        {!admin && <ListItem button >
          <ListItemText primary='Booking Status' onClick={() => history.push('/bookingstatus')} />
        </ListItem>}
        {!isGiftStore && <ListItem button >
          <ListItemText primary='Orders' onClick={() => history.push('/history')} />
        </ListItem>}
      </List>
      <Divider />
      <List>
        {['Log Out'].map((text, index) => (
          <ListItem button key={text} onClick={() => {
            auth.signOut();
            dispatch(actionCreate(null));
            dispatch(AdminLog(false));
            dispatch(SetAdmin(null));
            history.push('/');
          }}>

            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="drawer">
      <React.Fragment key={'left'}>
        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
          <div className="drawer__items">
            <h1 className="drawer__header">BBB</h1>
            {!admin ? Object.keys(Userdata).map((keys) => {
              return (
                <>
                  <Avatar src={Userdata[keys].photo} alt={Userdata[keys].userName} className="drawer__Avatar" />
                  <br /><h4>{Userdata[keys].userName}</h4>
                </>

              )
            }) : <>
                <Avatar src='https://pngimage.net/wp-content/uploads/2018/05/admin-logo-png-6.png' alt='admin' className="drawer__Avatar" />
                <br />
              </>}

            {list('left')}
          </div>
        </Drawer>
      </React.Fragment>

    </div>
  );
}
