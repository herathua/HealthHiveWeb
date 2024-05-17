import React from 'react';
import QrCodeContent from '../QrCodeContent/QrCodeContent';

function Dashboard() {
    return (
        <div>
            
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full flex flex-col">
                    <QrCodeContent className="flex-grow" />
                </div>
         

        </div>
    );
};

export default Dashboard;
