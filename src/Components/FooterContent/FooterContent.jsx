import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function FooterContent() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <Container>
        <Row>
          <Col className="text-center">
            {/* Your footer content */}
            <p>&copy; {new Date().getFullYear()} Health hive Pvt (Ltd)</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterContent;
