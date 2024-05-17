import React, { useState, useEffect } from 'react';
import { fetchLabData, updateLabData } from '../../services/apiService';
import TextContent from './TextContent';
import UpdateInformation from './UpdateInformation';

function LabInformationContent() {
    const [data, setData] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLabData(3); // Assuming labId is 3
                setData(data);
            } catch (error) {
                console.error("There was an error fetching the lab information: ", error);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async () => {
        try {
            setShowUpdateForm(true);
        } catch (error) {
            console.error("There was an error updating the information: ", error);
        }
    };

    if (showUpdateForm) {
        return <div><UpdateInformation/></div>;
    } else if (!data) {
        return <div></div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Laboratory Info</h2>
            <form>
                <TextContent id="1" type="Registration No" Data={data.labRegID}/>
                <TextContent id="2" type="Laboratory Name" Data={data.labName}/>
                <TextContent id="3" type="Address" Data={data.address}/>
                <TextContent id="4" type="Email" Data={data.email}/>
                <TextContent id="5" type="Telephone" Data={data.telephone}/>
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

export default LabInformationContent;
