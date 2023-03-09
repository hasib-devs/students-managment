import React from "react";

function DataTable({ getStudents }) {
  return (
    <div className="card card-body">
      <table className="table  table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Present</th>
          </tr>
        </thead>
        <tbody>
          {getStudents.map((student, i) => (
            <tr key={i} onClick={() => openModal(student)}>
              <th scope="row">{student.StudentID}</th>
              <td>{student.StudentName}</td>
              <td>
                {student.isPresent ? (
                  <span className="badge bg-primary">Yes</span>
                ) : (
                  <span className="badge bg-warning">No</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
