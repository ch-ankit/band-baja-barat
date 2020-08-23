import React, {useEffect,useState} from 'react'
import DetailCard from './DetailCard'
import "./Party.css"
import HeaderHome from './HeaderHome'
function Party() {
    const [data, setdata] = useState([]);
    useEffect(() => {
        async function getHostData() {
            const response = await fetch('http://localhost:9000/host');
            const allData = await response.json()
            setdata(allData.data)
        }
        getHostData();
    }, [])
    return (
        <div>
            <div className="userPage__header">
                <HeaderHome />
            </div>
            <div className="party">
                {Object.keys(data).map((keys)=>{
                return( <DetailCard path='/party' image={data[keys].profilePhoto} name={data[keys].hostName} details={data[keys].description} />
                )})}
            </div>
        </div>

    )
}

export default Party
