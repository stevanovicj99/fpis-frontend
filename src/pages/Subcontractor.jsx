import "../App.css";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import TableSubcontractor from "../components/tables/TableSubcontractor";
import { useState, useEffect } from "react";
import {
  getAllSubcontractors,
  deleteSpecificSubcontractor,
  getSubcontractor,
} from "../api/subcontractor";
import Alert from "react-bootstrap/Alert";

const Subcontractor = ({}) => {
  const [subcontractors, setSubcontractors] = useState([]);
  const [subcontractor, setSubcontractor] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getSubcontractors = async () => {
    const res = await getAllSubcontractors();
    console.log(res);
    setSubcontractors(res.data);
  };

  const deleteSubcontractor = async (id) => {
    try {
      await deleteSpecificSubcontractor(id);
      setSuccessMessage("Uspešno obrisan podizvođač!");

      let subcontractorsOld = JSON.parse(JSON.stringify(subcontractors));
      subcontractorsOld = subcontractorsOld.filter(
        (subcontractorOld) => subcontractorOld.id !== id
      );
      setSubcontractors(subcontractorsOld);
    } catch (e) {
      setErrorMessage("Podizvođač ne može biti obrisan!");
    }
  };

  useEffect(() => {
    getSubcontractors();
  }, []);

  return (
    <div>
      <Row className="row-modal">
        <Col className="col-modal">
          <Link to="/formsubcontractornew">
            <Button variant="primary" id="btn-new">
              Novi podizvođač
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <TableSubcontractor
            data={subcontractors}
            deleteSubcontractor={deleteSubcontractor}
          />
        </Col>
      </Row>
      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage("")}
          dismissible
        >
          <Alert.Heading>{successMessage}</Alert.Heading>
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          <Alert.Heading>{errorMessage}</Alert.Heading>
        </Alert>
      )}
    </div>
  );
};

export default Subcontractor;
