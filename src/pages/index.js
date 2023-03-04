import Head from "next/head";
import students from "../data/students.json";
import { useState, useMemo } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [page, setPage] = useState(1);

  const getStudents = useMemo(() => {
    const filteredStudents = students.filter((student) => {
      const nameFilter = student.StudentName.toLowerCase().includes(
        inputText.toLowerCase()
      );
      const idFilter = student.StudentID.includes(inputText.toLowerCase());
      return nameFilter || idFilter;
    });

    const sortedStudents = filteredStudents.sort((a, b) => {
      if (a.StudentName < b.StudentName) {
        return -1;
      }
      if (a.StudentName > b.StudentName) {
        return 1;
      }
      return 0;
    });

    const startIndex = (page - 1) * 15;
    const endIndex = startIndex + 15;
    const currentStudents = sortedStudents.slice(startIndex, endIndex);

    return currentStudents;
  }, [inputText, page, students]);

  const totalPages = Math.ceil(students.length / 15);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const goNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <Head>
        <title>Students</title>
      </Head>
      <div className="container py-4">
        <div className="row">
          <div className=" mx-auto">
            <h1 className="mb-2">Students</h1>

            <div className="mb-4">
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="form-control"
                autoFocus
                type="text"
                placeholder="Search"
              />
            </div>

            <div className="card card-body">
              <table class="table  table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {getStudents.map((student, i) => (
                    <tr key={i}>
                      <th scope="row">{student.StudentID}</th>
                      <td>{student.StudentName}</td>
                      <td>{student.Email}</td>
                      <td>{student.PhoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <nav
          className="mt-4 d-flex justify-content-end"
          aria-label="Page navigation example"
        >
          <ul class="pagination">
            <li class="page-item">
              <a onClick={goPrevPage} class="page-link" href="#">
                Previous
              </a>
            </li>
            {Array.from(Array(totalPages).keys()).map((pageNumber) => (
              <li class="page-item" key={pageNumber}>
                <a
                  onClick={() => handlePageChange(pageNumber + 1)}
                  className={`page-link ${
                    page === pageNumber + 1 ? "active" : ""
                  }`}
                  href="#"
                >
                  {pageNumber + 1}
                </a>
              </li>
            ))}

            <li class="page-item">
              <a onClick={goNextPage} class="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
