import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { createSubcontractor } from "../api/subcontractor";
import { useState, useEffect } from "react";
import { getAllCities } from "../api/city";
import { getAllTownships } from "../api/township";
import { getAllAddresses } from "../api/address";

const FormSubcontractorNew = ({}) => {
  const [name, setName] = useState("");
  const [taxID, setTaxID] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState(null);
  const [township, setTownship] = useState(null);
  const [address, setAddress] = useState(null);

  const [nameError, setNameError] = useState(false);
  const [taxIDError, setTaxIDError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [townshipError, setTownshipError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const [cities, setCities] = useState([]);
  const [townships, setTownships] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const getCities = async () => {
    const res = await getAllCities();
    console.log(res);
    setCities(res.data);
  };

  const getTownships = async () => {
    const res = await getAllTownships(city);
    console.log(res);
    setTownships(res.data);
  };

  const getAddresses = async () => {
    const res = await getAllAddresses(township);
    console.log(res);
    setAddresses(res.data);
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    setAddress(null);
    setTownship(null);
    setTownships([]);
    setAddresses([]);
    if (city) {
      getTownships();
    }
  }, [city]);

  useEffect(() => {
    setAddress(null);
    setAddresses([]);
    if (township) {
      getAddresses();
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
        const res = await createSubcontractor({
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
            <Col>
              <Form.Label className="lblSubcontractor">Naziv</Form.Label>
              <Form.Control
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

export default FormSubcontractorNew;
