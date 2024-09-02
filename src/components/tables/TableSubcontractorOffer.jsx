import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { BsEye, BsPencil, BsSortAlphaDown } from "react-icons/bs";
import SubcontractorOffer from "../../pages/SubcontractorOffer";

function TableSubcontractorOffer({ data }) {
  return (
    <MDBTable>
      <MDBTableHead dark>
        <tr>
          <th scope="col">
            ID{" "}
            {/* <BsSortAlphaDown
              className="sort-btn"
              onClick={() => handleSort("name")}
            /> */}
          </th>
          <th scope="col">
            Naziv{" "}
            {/* <BsSortAlphaDown
              className="sort-btn"
              onClick={() => handleSort("lastname")}
            /> */}
          </th>
          <th scope="col">
            Cena{" "}
            {/* <BsSortAlphaDown
              className="sort-btn"
              onClick={() => handleSort("jmbg")}
            /> */}
          </th>
          <th scope="col">
            Datum predaje{" "}
            {/* <BsSortAlphaDown
              className="sort-btn"
              onClick={() => handleSort("phone")}
            /> */}
          </th>
          <th scope="col">
            Podizvođač{" "}
            {/* <BsSortAlphaDown
              className="sort-btn"
              onClick={() => handleSort("licenceNum")}
            /> */}
          </th>
          <th scope="col">
            Action{" "}
            {/* <BsSortAlphaDown
              className="sort-btn"
              onClick={() => handleSort("licenceNum")}
            /> */}
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map((subcontractorOffer) => {
          return (
            <tr key={subcontractorOffer.id}>
              <td>{subcontractorOffer.id}</td>
              <td>{subcontractorOffer.subcontractorOffer_name}</td>
              <td>{subcontractorOffer.subcontractorOffer_date}</td>
              <td>{subcontractorOffer.subcontractorOffer_price}</td>
              <td>{subcontractorOffer.subcontractor.subcontractor_name}</td>
              <td>
                <BsPencil
                  className="edit-btn"
                  onClick={() =>
                    window.location.replace(
                      `/formsubcontractorofferedit/${subcontractorOffer.id}`
                    )
                  }
                />
                {/* <BsEye
                  className="view-btn"
                  onClick={() =>
                    window.location.replace(
                      `/formsubcontractorofferview/${subcontractorOffer.id}`
                    )
                  }
                /> */}
              </td>
            </tr>
          );
        })}
      </MDBTableBody>
    </MDBTable>
  );
}

export default TableSubcontractorOffer;
