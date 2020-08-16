import React from 'react'
import UserHeader from './UserHeader'
import SimpleMap from './GoogleMap'
import './UserPage.css'

function UserPage() {
    return (
        <div className="userPage">
            <div className="userPage__header">
                <UserHeader />
            </div>
            <div className="userPage__rest">
                <SimpleMap />
            </div>
        </div>
    )
}

export default UserPage
