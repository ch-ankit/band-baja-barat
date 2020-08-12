import React from 'react';
import { useStateValue } from './StateProvider';

function Points(props) {
    const [{ basket, isAdmin }] = useStateValue();
    console.log(isAdmin)
    return (
        <div className="points">

        </div>
    );
}

export default Points;