import React from 'react';
import LabInfomationContent from '../LabInfomationContent/LabInfomationContent';
import QrCodeContent from '../QrCodeContent/QrCodeContent';

function Dashboard() {
    return (
        <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-4">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full flex flex-col">
                    <QrCodeContent className="flex-grow" />
                </div>
            </div>
            <div className="w-full md:w-1/2 p-4">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full flex flex-col">
                    <LabInfomationContent className="flex-grow" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
