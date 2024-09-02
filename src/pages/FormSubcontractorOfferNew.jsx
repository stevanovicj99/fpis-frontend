import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAllSubcontractors } from "../api/subcontractor";
import { getAllEmployees } from "../api/employee";
import { getAllConsents } from "../api/consent";
import TableContractsNew from "../components/tables/TableContractsNew";
import { createSubcontractorOffer } from "../api/subcontractoroffer";
const FormSubcontractorNew = ({}) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const [price, setPrice] = useState("");
  const [subcontractor, setSubcontractor] = useState(null);
  const [status, setStatus] = useState(null);

  const [nameError, setNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [subcontractorError, setSubcontractorError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const [conclusionDate, setConclusionDate] = useState();
  const [deadline, setDeadline] = useState();
  const [employee, setEmployee] = useState(null);
  const [consent, setConsent] = useState(null);

  const [conclusionDateError, setConclusionDateError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const [employeeError, setEmployeeError] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const [subcontractors, setSubcontractors] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [consents, setConsents] = useState([]);

  const [contracts, setContracts] = useState([]);
  const getSubcontractors = async () => {
    const res = await getAllSubcontractors();
    console.log(res);
    setSubcontractors(res.data);
  };

  const getEmployees = async () => {
    const res = await getAllEmployees();
    console.log(res);
    setEmployees(res.data);
  };

  const getConsents = async () => {
    const res = await getAllConsents();
    console.log(res);
    setConsents(res.data);
  };

  useEffect(() => {
    getSubcontractors();
    getEmployees();
    getConsents();
  }, []);

  const save = async () => {
    setNameError(false);
    setDateError(false);
    setPriceError(false);
    setSubcontractorError(false);
    setStatusError(false);

    let error = false;

    if (!name || !name.length) {
      setNameError(true);
      error = true;
    }

    if (!date || !date.length) {
      setDateError(true);
      error = true;
    }

    if (!price || !price.length) {
      setPriceError(true);
      error = true;
    }

    if (!subcontractor || !subcontractor.length) {
      setSubcontractorError(true);
      error = true;
    }

    if (!status || !status.length) {
      setStatusError(true);
      error = true;
    }

    if (!error) {
      try {
        const res = await createSubcontractorOffer({
          subcontractorOffer_name: name,
          subcontractorOffer_date: date,
          subcontractorOffer_price: price,
          subcontractor_id: subcontractor,
          subcontractor_status: status,
          subcontractor_contracts: contracts,
        });
        window.location.replace("/subcontractoroffer");
      } catch (e) {}
    }
  };

  const saveContract = async () => {
    setConclusionDateError(false);
    setDeadlineError(false);
    setEmployeeError(false);
    setConsentError(false);

    let error = false;

    if (!conclusionDate || !conclusionDate.length) {
      setConclusionDateError(true);
      error = true;
    }

    if (!deadline || !deadline.length) {
      setDeadlineError(true);
      error = true;
    }

    if (!employee || !employee.length) {
      setEmployeeError(true);
      error = true;
    }

    if (!consent || !consent.length) {
      setConsentError(true);
      error = true;
    }

    if (!error) {
      try {
        let contractsTmp = JSON.parse(JSON.stringify(contracts));
        contractsTmp.push({
          subcontractorContract_conclusionDate: conclusionDate,
          subcontractorContract_deadline: deadline,
          consent_id: consent,
          employee_id: employee,
        });
        setContracts(contractsTmp);
        setConclusionDate("");
        setDeadline("");
        setEmployee("");
        setConsent("");
      } catch (e) {}
    }
  };

  return (
    <div>
      <Form className="containter">
        <Form.Group>
          <Row>
            <Form.Label className="lblTitle">Ponuda podizvođača</Form.Label>
          </Row>
          <Row>
            <Col>
              <Form.Label className="lblSubcontractor">Naziv</Form.Label>
              <Form.Control
                onChange={(event) => setName(event.target.value)}
                placeholder="Unesi naziv"
              />
              {nameError && (
                <Form.Control.Feedback type="invalid">
                  Molimo Vas da unesete naziv ponude.
                </Form.Control.Feedback>
              )}
            </Col>
            <Col className="col-input">
              <Form.Label className="lblSubcontractor">Cena</Form.Label>
              <Form.Control
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Unesi cenu"
              />
              {priceError && (
                <Form.Control.Feedback type="invalid">
                  Molimo Vas da unesete cenu ponude.
                </Form.Control.Feedback>
              )}
            </Col>
          </Row>

          <Row>
            <Form.Label className="lblSubcontractor">Datum predaje</Form.Label>
            <Form.Control
              type="date"
              onChange={(event) => setDate(event.target.value)}
              placeholder="Izaberi datum predaje"
            />
            {dateError && (
              <Form.Control.Feedback type="invalid">
                Molimo Vas da izaberete datum predaje.
              </Form.Control.Feedback>
            )}
          </Row>
          <Row>
            <Col>
              <Form.Label className="lblSubcontractor">Podizvođač</Form.Label>
              <Form.Select
                onChange={(event) => setSubcontractor(event.target.value)}
                className="mb-3"
              >
                <option value="">Izaberi podizvođača</option>
                {subcontractors.map((subcontractor) => {
                  return (
                    <option key={subcontractor.id} value={subcontractor.id}>
                      {subcontractor.subcontractor_name}
                    </option>
                  );
                })}
              </Form.Select>
              {subcontractorError && (
                <Form.Control.Feedback type="invalid">
                  Molimo Vas da izaberete podizvođača.
                </Form.Control.Feedback>
              )}
            </Col>
            <Col className="col-input">
              <Form.Label className="lblSubcontractor">Status</Form.Label>
              <Form.Select
                onChange={(event) => setStatus(event.target.value)}
                className="mb-3"
              >
                <option value="">Izaberi status</option>
                <option value="created">Kreirana</option>
                <option value="updated">Izmenjena</option>
                <option value="signed">Potipisana</option>
              </Form.Select>
              {statusError && (
                <Form.Control.Feedback type="invalid">
                  Molimo Vas da izaberete status.
                </Form.Control.Feedback>
              )}
            </Col>
          </Row>
        </Form.Group>

        <div className="little-container">
          <Form.Group>
            <Row>
              <Form.Label className="lblTitle">
                Ugovori sa podizvođačom
              </Form.Label>
            </Row>
            <Row>
              <Col>
                <Form.Label className="lblSubcontractor">
                  Rok izvršenja
                </Form.Label>
                <Form.Control
                  type="date"
                  onChange={(event) => setDeadline(event.target.value)}
                  placeholder="Izaberi rok izvršenja"
                />
                {deadlineError && (
                  <Form.Control.Feedback type="invalid">
                    Molimo Vas da izaberete rok izvršenja.
                  </Form.Control.Feedback>
                )}
              </Col>
              <Col className="col-input">
                <Form.Label className="lblSubcontractor">
                  Datum zaključenja
                </Form.Label>
                <Form.Control
                  type="date"
                  onChange={(event) => setConclusionDate(event.target.value)}
                  placeholder="Izaberi datum zakljucenja"
                />
                {conclusionDateError && (
                  <Form.Control.Feedback type="invalid">
                    Molimo Vas da izaberete datum zaključenja.
                  </Form.Control.Feedback>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label className="lblSubcontractor">Potpisnik</Form.Label>
                <Form.Select
                  onChange={(event) => setEmployee(event.target.value)}
                  className="mb-3"
                >
                  <option value="">Izaberi zaposlenog</option>
                  {employees.map((employee) => {
                    return (
                      <option
                        key={employee.employee_identificator}
                        value={employee.employee_identificator}
                      >
                        {`${employee.employee_firstname} ${employee.employee_lastname}`}
                      </option>
                    );
                  })}
                </Form.Select>
                {employeeError && (
                  <Form.Control.Feedback type="invalid">
                    Molimo Vas da izaberete zaposlenog.
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="col-input">
                <Form.Label className="lblSubcontractor">Saglasnost</Form.Label>
                <Form.Select
                  onChange={(event) => setConsent(event.target.value)}
                  className="mb-3"
                >
                  <option value="">Izaberi saglasnost</option>
                  {consents.map((consent) => {
                    return (
                      <option key={consent.id} value={consent.id}>
                        {consent.id}
                      </option>
                    );
                  })}
                </Form.Select>
                {consentError && (
                  <Form.Control.Feedback type="invalid">
                    Molimo Vas da izaberete saglasnost.
                  </Form.Control.Feedback>
                )}
              </Col>
            </Row>
            <Button type="button" id="btn-save-litle" onClick={saveContract}>
              Sačuvaj ugovor
            </Button>
            <Row>
              <TableContractsNew data={contracts} employees={employees} />
            </Row>
          </Form.Group>
        </div>

        <Button type="button" id="btn-save" onClick={save}>
          Sačuvaj
        </Button>
      </Form>
    </div>
  );
};

export default FormSubcontractorNew;
