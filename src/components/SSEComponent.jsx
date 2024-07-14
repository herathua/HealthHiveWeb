// import React, { useEffect, useRef } from 'react';
// import axios from 'axios';

// const SSEComponent = ({ labId }) => {
//   const eventSource = useRef(null);

//   useEffect(() => {
//     // Establish SSE connection
//     eventSource.current = new EventSource(`http://localhost:33000/api/labRequests/stream-sse/${labId}`);

//     eventSource.current.onopen = () => {
//       console.log('SSE connection established');
//     };

//     eventSource.current.onerror = (err) => {
//       console.error('SSE error:', err);
//     };

//     eventSource.current.addEventListener('labRequestUpdate', (event) => {
//       const newLabRequests = JSON.parse(event.data);
//       console.log('New lab requests:', newLabRequests);
//       // Handle the new data as needed (update state, UI, etc.)
//     });

//     return () => {
//       // Clean up the SSE connection
//       eventSource.current.close();
//       console.log('SSE connection closed');
//     };
//   }, [labId]);

//   return (
//     <div>
//       <h2>Lab Requests Stream</h2>
//       {/* Add UI elements to display streamed data */}
//     </div>
//   );
// };

// export default SSEComponent;
