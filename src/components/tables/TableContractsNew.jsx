import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { BsPencil, BsSortAlphaDown, BsTrash } from "react-icons/bs";

function TableContracts({ data, employees }) {
  return (
    <MDBTable className="table-contracts">
      <MDBTableHead dark>
        <tr>
          <th scope="col">ID ugovora sa podizvođačom </th>
          <th scope="col">Rok izvršenja </th>
          <th scope="col">Datum zaključenja </th>
          <th scope="col">Saglasnost </th>
          <th scope="col">Potpisnik</th>
          {/* <th scope="col">Action</th> */}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map((contract) => {
          const specificEmployee = employees.find(
            (employee) =>
              employee.employee_identificator == contract.employee_id
          );

          return (
            <tr key={contract.id}>
              <td>{contract.id}</td>
              <td>{contract.subcontractorContract_deadline}</td>
              <td>{contract.subcontractorContract_conclusionDate}</td>
              <td>{contract.consent_id}</td>
              <td>{`${specificEmployee.employee_firstname} ${specificEmployee.employee_lastname}`}</td>
              {/* <td>
                <BsPencil
                  className="edit-btn"
                  // onClick={() =>
                  //   window.location.replace(
                  //     `/formsubcontractoredit/${subcontractor.id}`
                  //   )
                  // }
                />
                <BsTrash
                  className="delete-btn"
                  // onClick={() => {
                  //   deleteSubcontractor(subcontractor.id);
                  // }}
                />
              </td> */}
            </tr>
          );
        })}
      </MDBTableBody>
    </MDBTable>
  );
}

export default TableContracts;
