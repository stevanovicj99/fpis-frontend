import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAllSubcontractors, getSubcontractor } from "../api/subcontractor";
import { getAllEmployees } from "../api/employee";
import { getAllConsents } from "../api/consent";
import TableContractsEdit from "../components/tables/TableContractsEdit";
import {
  updateSubcontractorOffer,
  getSpecificSubcontractorOffer,
} from "../api/subcontractoroffer";
import { useParams } from "react-router";

const FormSubcontractorNew = ({}) => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const [price, setPrice] = useState("");
  const [subcontractor, setSubcontractor] = useState(null);
  const [status, setStatus] = useState(null);

  const [nameError, setNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [subcontractorError, setSubcontractorError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const [contractID, setContractID] = useState(null);
  const [conclusionDate, setConclusionDate] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [consent, setConsent] = useState(null);

  const [conclusionDateError, setConclusionDateError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const [employeeError, setEmployeeError] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const [subcontractors, setSubcontractors] = useState([]);
  const [subcontractorOffer, setSubcontractorOffer] = useState();

  const [employees, setEmployees] = useState([]);
  const [consents, setConsents] = useState([]);

  const [contracts, setContracts] = useState([]);

  const [subcontractorContractsEdit, setSubcontractorContractsEdit] = useState(
    []
  );

  const [subcontractorContractsCreate, setSubcontractorContractsCreate] =
    useState([]);

  const [subcontractorContractsDelete, setSubcontractorContractsDelete] =
    useState([]);

  const populateContractEditForm = (currentContractID) => {
    const contract = contracts.find(
      (contract) => contract.id === currentContractID
    );

    setContractID(contract.id);
    setConclusionDate(contract.subcontractorContract_conclusionDate);
    setDeadline(contract.subcontractorContract_deadline);
    setEmployee(contract.employee_id);
    setConsent(contract.consent_id);
  };

  const handleDeleteContract = (currentContractID) => {
    let contractsForEdit = JSON.parse(
      JSON.stringify(subcontractorContractsEdit)
    );
    contractsForEdit = contractsForEdit.filter(
      (contractForEdit) => contractForEdit.id != currentContractID
    );

    setSubcontractorContractsEdit(contractsForEdit);

    let contractsTmp = JSON.parse(JSON.stringify(contracts));
    contractsTmp = contractsTmp.filter(
      (contractTmp) => contractTmp.id != currentContractID
    );

    setContracts(contractsTmp);

    let contractsForDelete = JSON.parse(
      JSON.stringify(subcontractorContractsDelete)
    );
    contractsForDelete.push({
      id: currentContractID,
    });
    setSubcontractorContractsDelete(contractsForDelete);
  };

  const handleSaveContract = () => {
    if (contractID) {
      if (!deadline || !deadline.length) {
        setDeadlineError(true);
      } else {
        const contractsTmp = contracts.map((contract) => {
          if (contract.id === contractID) {
            contract.subcontractorContract_deadline = deadline;
          }
          return contract;
        });
        setContracts(contractsTmp);

        let contractsForEdit = subcontractorContractsEdit.filter(
          (subcontractorContractEdit) =>
            subcontractorContractEdit.id != contractID
        );

        contractsForEdit.push({ id: contractID, deadline: deadline });
        setSubcontractorContractsEdit(contractsForEdit);

        setContractID("");
        setConclusionDate("");
        setDeadline("");
        setEmployee("");
        setConsent("");
      }
    } else {
      saveContract();
    }
  };

  const getSubcontractorOffer = async () => {
    const res = await getSpecificSubcontractorOffer(id);
    setSubcontractorOffer(res.data.subscontractorOffer);
    setEmployees(res.data.employees);
    setConsents(res.data.consents);
    setSubcontractors(res.data.subcontractors);

    setName(res.data.subscontractorOffer.subcontractorOffer_name);
    setDate(res.data.subscontractorOffer.subcontractorOffer_date);
    setPrice(res.data.subscontractorOffer.subcontractorOffer_price);
    setStatus(res.data.subscontractorOffer.subcontractor_status);
    setContracts(res.data.subscontractorOffer.contracts);
    setSubcontractor(res.data.subscontractorOffer.subcontractor_id.toString());
  };

  useEffect(() => {
    getSubcontractorOffer();
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
        const res = await updateSubcontractorOffer(id, {
          subcontractorOffer_name: name,
          subcontractorOffer_date: date,
          subcontractor_id: subcontractor,
          subcontractor_status: status,
          subcontractor_contracts_create: subcontractorContractsCreate,
          subcontractor_contracts_edit: subcontractorContractsEdit,
          subcontractor_contracts_delete: subcontractorContractsDelete,
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
      let contractsTmp = JSON.parse(
        JSON.stringify(subcontractorContractsCreate)
      );
      contractsTmp.push({
        subcontractorContract_conclusionDate: conclusionDate,
        subcontractorContract_deadline: deadline,
        consent_id: consent,
        employee_id: employee,
      });
      setSubcontractorContractsCreate(contractsTmp);
      setConclusionDate("");
      setDeadline("");
      setConsent("");
      setEmployee("");
      contractsTmp = JSON.parse(JSON.stringify(contracts));

      contractsTmp.push({
        subcontractorContract_conclusionDate: conclusionDate,
        subcontractorContract_deadline: deadline,
        consent_id: consent,
        employee_id: employee,
      });
      setContracts(contractsTmp);
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
            <Form.Label className="lblSubcontractor">ID</Form.Label>
            <Form.Control value={id} disabled />
          </Row>
          <Row>
            <Col>
              <Form.Label className="lblSubcontractor">Naziv</Form.Label>
              <Form.Control
                onChange={(event) => setName(event.target.value)}
                value={name}
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
                disabled
                value={price}
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
              value={date}
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
                value={subcontractor}
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
                value={status}
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

        {/* ovde krece mala forma */}
        <div className="little-container">
          <Form.Group>
            <Row>
              <Form.Label className="lblTitle">
                Ugovori sa podizvođačom
              </Form.Label>
            </Row>
            <Row>
              <Form.Label className="lblSubcontractor">ID</Form.Label>
              <Form.Control value={contractID} disabled />
            </Row>
            <Row>
              <Col>
                <Form.Label className="lblSubcontractor">
                  Rok izvršenja
                </Form.Label>
                <Form.Control
                  type="date"
                  value={deadline}
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
                  value={conclusionDate}
                  onChange={(event) => setConclusionDate(event.target.value)}
                  placeholder="Izaberi datum zakljucenja"
                  disabled={contractID}
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
                  value={employee}
                  className="mb-3"
                  disabled={contractID}
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
                  value={consent}
                  onChange={(event) => setConsent(event.target.value)}
                  className="mb-3"
                  disabled={contractID}
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
            <Button
              type="button"
              id="btn-save-litle"
              onClick={handleSaveContract}
            >
              Sačuvaj ugovor
            </Button>
            <Row>
              <TableContractsEdit
                data={contracts}
                employees={employees}
                populateContractEditForm={populateContractEditForm}
                handleDeleteContract={handleDeleteContract}
              />
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
