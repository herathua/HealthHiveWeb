import React from 'react';
import LabInfomationContent from '../Components/LabInfomationContent/LabInfomationContent';
import QrCodeContent from '../Components/QrCodeContent/QrCodeContent';

function Dashboard() {
    return (
        <div className="flex flex-row">
            <div className="w-1/2 p-4"> {/* Left side container */}
                <QrCodeContent /> {/* QrCodeContent component */}
            </div>
            <div className="w-1/2 p-4"> {/* Right side container */}
                <LabInfomationContent /> {/* LabInfomationContent component */}
            </div>
        </div>
    );
}

export default Dashboard;
