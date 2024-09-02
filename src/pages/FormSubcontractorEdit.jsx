import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col, Card } from "react-bootstrap";
import { getSubcontractor, editSubcontractor } from "../api/subcontractor";
import { useState, useEffect } from "react";
import { getAllCities } from "../api/city";
import { getAllTownships } from "../api/township";
import { getAllAddresses } from "../api/address";
import { useParams } from "react-router";

const FormSubcontractorEdit = ({}) => {
  const [name, setName] = useState("");
  const [taxID, setTaxID] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [township, setTownship] = useState("");
  const [address, setAddress] = useState("");

  const [nameError, setNameError] = useState(false);
  const [taxIDError, setTaxIDError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [townshipError, setTownshipError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const [cities, setCities] = useState([]);
  const [townships, setTownships] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [subcontractor, setSubcontractor] = useState([]);

  const { id } = useParams();

  const getSpecificSubcontractor = async () => {
    const res = await getSubcontractor(id);
    setSubcontractor(res.data.subcontractor);
    setCities(res.data.cities);
    setAddresses(res.data.addresses);
    setTownships(res.data.townships);

    setName(res.data.subcontractor.subcontractor_name);
    setTaxID(res.data.subcontractor.subcontractor_taxID);
    setType(res.data.subcontractor.subcontractor_type);
    setCity(res.data.subcontractor.city_id.toString());
    setAddress(res.data.subcontractor.address_id.toString());
    setTownship(res.data.subcontractor.township_id.toString());
  };

  const getTownships = async (city_id = null) => {
    const res = await getAllTownships(city_id ? city_id : city);
    setTownships(res.data);
  };

  const getAddresses = async (township_id = null) => {
    const res = await getAllAddresses(township_id ? township_id : township);
    setAddresses(res.data);
  };

  useEffect(() => {
    getSpecificSubcontractor();
  }, []);

  useEffect(() => {
    if (city !== "" && subcontractor.city_id != city) {
      setAddress("");
      setTownship("");
      setTownships([]);
      setAddresses([]);
      if (city) {
        getTownships();
      }
    }
  }, [city]);

  useEffect(() => {
    if (
      township !== "" &&
      township !== null &&
      subcontractor.township_id != township
    ) {
      setAddress("");
      setAddresses([]);
      if (township) {
        getAddresses();
      }
    }
  }, [township]);

  const save = async () => {
    setNameError(false);
    setTaxIDError(false);
    setTypeError(false);
    setCityError(false);
    setTownshipError(false);
    setAddressError(false);

    let error = false;

    if (!name || !name.length) {
      setNameError(true);
      error = true;
    }

    if (!taxID || !taxID.length) {
      setTaxIDError(true);
      error = true;
    }

    if (!type || !type.length) {
      setTypeError(true);
      error = true;
    }

    if (!city || !city.length) {
      setCityError(true);
      error = true;
    }

    if (!township || !township.length) {
      setTownshipError(true);
      error = true;
    }

    if (!address || !address.length) {
      setAddressError(true);
      error = true;
    }

    if (!error) {
      try {
        const res = await editSubcontractor(id, {
          subcontractor_name: name,
          subcontractor_taxID: taxID,
          subcontractor_type: type,
          city_id: city,
          township_id: township,
          address_id: address,
        });
        window.location.replace("/subcontractor");
      } catch (e) {}
    }
  };

  return (
    <div>
      <Form className="containter">
        <Form.Group>
          <Row>
            <Form.Label className="lblTitle">Podizvođač</Form.Label>
          </Row>
          <Row>
            <Form.Label className="lblSubcontractor">ID</Form.Label>
            <Form.Control value={id} disabled />
          </Row>

          <Row>
            <Col>
              <Form.Label className="lblSubcontractor">Naziv</Form.Label>
              <Form.Control
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Unesi naziv"
              />
              {nameError && (
                <Form.Control.Feedback type="invalid">
                  Molimo Vas da unesete naziv podizvođača.
                </Form.Control.Feedback>
              )}
            </Col>
            <Col className="col-input">
              <Form.Label className="lblSubcontractor">PIB</Form.Label>
              <Form.Control
                value={taxID}
                onChange={(event) => setTaxID(event.target.value)}
                placeholder="Unesi PIB"
              />
              {taxIDError && (
                <Form.Control.Feedback type="invalid">
                  Molimo Vas da unesete PIB podizvođača.
                </Form.Control.Feedback>
              )}
            </Col>
          </Row>

          <Row>
            <Form.Label className="lblSubcontractor">Vrsta</Form.Label>
            <Form.Control
              value={type}
              onChange={(event) => setType(event.target.value)}
              placeholder="Unesi vrstu"
            />
            {typeError && (
              <Form.Control.Feedback type="invalid">
                Molimo Vas da unesete vrstu podizvođača.
              </Form.Control.Feedback>
            )}
          </Row>
          <Row>
            <Col>
              <Form.Label className="lblSubcontractor">Grad</Form.Label>
              <Form.Select
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="mb-3"
              >
                <option value="">Izaberi grad</option>
                {cities.map((city) => {
                  return (
                    <option key={city.id} value={city.id}>
                      {city.city_name}
                    </option>
                  );
                })}
              </Form.Select>
              {cityError && (
                <Form.Control.Feedback type="invalid">
                  Molimo Vas da izaberete grad.
                </Form.Control.Feedback>
              )}
            </Col>
            <Col className="col-input">
              <Form.Label className="lblSubcontractor">Opština</Form.Label>
              <Form.Select
                value={township}
                onChange={(event) => setTownship(event.target.value)}
                className="mb-3"
                aria-label="Selektuj grad"
              >
                <option value=""> Izaberi opštinu</option>
                {townships.map((township) => {
                  return (
                    <option key={township.id} value={township.id}>
                      {township.township_name}
                    </option>
                  );
                })}
              </Form.Select>
              {townshipError && (
                <Form.Control.Feedback type="invalid">
                  Molimo Vas da izaberete opštinu.
                </Form.Control.Feedback>
              )}
            </Col>
            <Col className="col-input">
              <Form.Label className="lblSubcontractor">Adresa</Form.Label>
              <Form.Select
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="mb-3"
                aria-label="Selektuj grad"
              >
                <option value="">Izaberi adresu</option>
                {addresses.map((address) => {
                  return (
                    <option key={address.id} value={address.id}>
                      {address.address_name}
                    </option>
                  );
                })}
              </Form.Select>
              {addressError && (
                <Form.Control.Feedback type="invalid">
                  Molimo Vas da izaberete opštinu.
                </Form.Control.Feedback>
              )}
            </Col>
          </Row>
        </Form.Group>
        <Button type="button" id="btn-save" onClick={save}>
          Sačuvaj
        </Button>
      </Form>
    </div>
  );
};

export default FormSubcontractorEdit;
