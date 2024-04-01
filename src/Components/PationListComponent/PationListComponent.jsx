import React from 'react'
import Stack from 'react-bootstrap/Stack';
function PationListComponent() {
    return (
        <div>
            <div>
                <Stack gap={3}>
                    <div className="p-2" style={{ backgroundColor: "red" }}>First item</div>
                    <div className="p-2" style={{ backgroundColor: "blue" }}>Second item</div>
                    <div className="p-2" style={{ backgroundColor: "green" }}>Third item</div>
                </Stack>
            </div>
        </div>
    )
}
export default PationListComponent