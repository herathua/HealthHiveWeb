import Table from './Table';
import TableRow from './TableRow';
import TableCell from './TableCell';

function PationListComponent() {
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Table>
        <thead>
          <TableRow isHeader>
            <TableCell isHeader>Nic no</TableCell>
            <TableCell isHeader>Name</TableCell>
            <TableCell isHeader>Address</TableCell>
            // ... other headers
          </TableRow>
        </thead>
        <tbody>
          {/* Loop through data and create rows */}
          <TableRow>
            <TableCell>987654321v</TableCell>
            <TableCell>Christian Bale</TableCell>
            <TableCell>Kandy</TableCell>
            // ... other cells
          </TableRow>
          {/* ... other rows */}
        </tbody>
      </Table>
    </div>
  );
}
export default PationListComponent