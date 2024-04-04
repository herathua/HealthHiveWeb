import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextContent from './TextContent';

function LabInfomationContent() {
    const [data, setData] = useState(null); // Initialize state to hold your data

    // Fetch data from the server when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:33000/api/labs/5');
                setData(response.data); // Set your data to state
            } catch (error) {
                console.error("There was an error fetching the lab information: ", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    // Render loading state or no data state
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-md flex flex-col">
            <h2 className="text-xl font-bold text-center mb-4">Laboratory Info</h2>
            <form>
                <TextContent id="1" type="Laboratory Name" Data={data.labRegID}/>
                <TextContent id="2" type="Registration No" Data={data.labName}/>
                <TextContent id="3" type="Email" Data={data.address}/>
                <TextContent id="4" type="Telephone" Data={data.email}/>
                <TextContent id="5" type="Address" Data={data.telephone}/>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update information
                </button>
            </form>
        </div>
    );
}

export default LabInfomationContent;
