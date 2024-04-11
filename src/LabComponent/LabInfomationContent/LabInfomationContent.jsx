import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextContent from './TextContent';
import UpdateInformation from './UpdateInformation';

const cachingKey = 'cachedLabData';
const URL = 'http://localhost:33000/api/labs/3';

function LabInfomationContent() {
    const [data, setData] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false); // Define setShowUpdateForm state variable

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cachedData = localStorage.getItem(cachingKey);
                if (cachedData) {
                    setData(JSON.parse(cachedData));
                } else {
                    const response = await axios.get(URL);
                    setData(response.data);
                    localStorage.setItem(cachingKey, JSON.stringify(response.data));
                }
            } catch (error) {
                console.error("There was an error fetching the lab information: ", error);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async () => {
        try {
            localStorage.removeItem(cachingKey);
            setData(null);
            setShowUpdateForm(true); // Set setShowUpdateForm to true to render the UpdateInformation component
        } catch (error) {
            console.error("There was an error updating the information: ", error);
        }
    };

    // Render the UpdateInformation component if showUpdateForm is true
    if (showUpdateForm) {
        return <div><UpdateInformation/></div>;
    } else if (!data) {
        return <div></div>;
    }

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-md flex flex-col bg-gray-200">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Laboratory Info</h2>
            <form>
                <TextContent id="1" type="Laboratory Name" Data={data.labRegID}/>
                <TextContent id="2" type="Registration No" Data={data.labName}/>
                <TextContent id="3" type="Email" Data={data.address}/>
                <TextContent id="4" type="Telephone" Data={data.email}/>
                <TextContent id="5" type="Address" Data={data.telephone}/>
                <button
                    type="button"
                    onClick={handleUpdate}
                    className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                >
                    Update information
                </button>
            </form>
        </div>
    );
}

export default LabInfomationContent;
