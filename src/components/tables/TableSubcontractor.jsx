import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { BsPencil, BsTrash } from "react-icons/bs";
import Subcontractor from "../../pages/Subcontractor";

function TableSubcontractor({ data, deleteSubcontractor }) {
  return (
    <MDBTable>
      <MDBTableHead dark>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Naziv</th>
          <th scope="col">PIB </th>
          <th scope="col">Vrsta </th>
          <th scope="col">Sedište </th>
          <th scope="col">Action </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map((subcontractor) => {
          return (
            <tr key={subcontractor.id}>
              <td>{subcontractor.id}</td>
              <td>{subcontractor.subcontractor_name}</td>
              <td>{subcontractor.subcontractor_taxID}</td>
              <td>{subcontractor.subcontractor_type}</td>
              <td>{`${subcontractor.city.city_name},${subcontractor.township.township_name},${subcontractor.address.address_name}`}</td>
              <td>
                <BsPencil
                  className="edit-btn"
                  onClick={() =>
                    window.location.replace(
                      `/formsubcontractoredit/${subcontractor.id}`
                    )
                  }
                />
                <BsTrash
                  className="delete-btn"
                  onClick={() => {
                    deleteSubcontractor(subcontractor.id);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </MDBTableBody>
    </MDBTable>
  );
}

export default TableSubcontractor;
