import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import Header from './Header';

function History({ userId }) {
    const [history, setHistory] = useState()
    useEffect(() => {
        async function fetchHistory() {
            const response = await fetch('http://localhost:9000/giftstore/orders')
            const data = await response.json();
            setHistory(data.data)
        }
        fetchHistory();
    }, [])
    const userHistory = Object.keys(history).map(keys => history[keys].userId === userId)
    return (
        <div className="history">
            <Header />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Model Number</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default History;