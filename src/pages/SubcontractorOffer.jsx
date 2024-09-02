import TableSubcontractorOffer from "../components/tables/TableSubcontractorOffer";
import "../App.css";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { getAllSubcontractorOffers } from "../api/subcontractoroffer";
import { useState, useEffect } from "react";

const SubcontractorOffer = ({}) => {
  const [subcontractorOffers, setSubcontractorOffers] = useState([]);
  const [subcontractorOffer, setSubcontractorOffer] = useState([]);

  const getSubcontractorOffers = async () => {
    const res = await getAllSubcontractorOffers();
    console.log(res);
    setSubcontractorOffers(res.data);
  };

  useEffect(() => {
    getSubcontractorOffers();
  }, []);

  return (
    <div>
      <Row className="row-modal">
        <Col className="col-modal">
          <Link to="/formsubcontractoroffernew">
            <Button variant="primary" id="btn-new">
              Nova ponuda
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <TableSubcontractorOffer data={subcontractorOffers} />
        </Col>
      </Row>
    </div>
  );
};

export default SubcontractorOffer;
