import React from 'react';
import TextContent from './TextContent';

function LabInfomationContent()
{
    let data = [{
        "LaboratoryInfo": {
          "Id": "2332423",
          "LaboratoryName": "Asiri - Central Hospital",
          "RegistrationNo": "285389",
          "Email": "info@asiri.com",
          "Telephone": "+94-771234567",
          "Address": "Colombo-9"
        }
      }
      ]
return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-md flex flex-col">
        <h2 className="text-xl font-bold text-center mb-4">Laboratory Info</h2>
        <form>
            <TextContent id="1" type="Laboratory Name" Data={data[0].LaboratoryInfo.LaboratoryName}/>
            <TextContent id="2" type="Registration No" Data={data[0].LaboratoryInfo.RegistrationNo}/>
            <TextContent id="3" type="Email" Data={data[0].LaboratoryInfo.Email}/>
            <TextContent id="4" type="Telephone" Data={data[0].LaboratoryInfo.Telephone}/>
            <TextContent id="5" type="Address" Data={data[0].LaboratoryInfo.Address}/>
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
