import React from 'react'
import './FooterContent.css'
import { Container, Row, Col } from 'react-bootstrap';
function FooterContent() {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            {/* Your footer content */}
            © 2024 Your Company Name
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default FooterContent



