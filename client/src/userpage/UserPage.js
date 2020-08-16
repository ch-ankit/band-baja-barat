import React from 'react'
import UserHeader from './UserHeader'
import SimpleMap from './GoogleMap'
import {BrowserRouter as Router , Route} from "react-router-dom"
import './UserPage.css'
import Party from "./Party"
import Band from "./Band"
function UserPage() {
    return (
        <Router>
        <div className="userPage">
            <div className="userPage__header">
                <UserHeader/>
            </div>
            
                <Route path="/User">
                    <div className="userPage__rest">
                        <SimpleMap />
                    </div>
                </Route>
                <Route path="/Party" component={Party} />
                <Route path="/Band" component={Band} />
        </div>
        </Router>
    )
}

export default UserPage
