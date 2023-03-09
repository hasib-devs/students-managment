import Head from "next/head";
import studentsList from "../data/students.js";
import { useState, useMemo } from "react";

function Home() {
  const [inputText, setInputText] = useState("");
  const [students, setStudents] = useState(studentsList);
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setcurrentStudent] = useState({
    StudentName: "",
    isPresent: false,
    StudentID: "",
    Email: "",
    PhoneNumber: "",
  });

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
    return sortedStudents;
  }, [inputText, students]);

  const openModal = (st) => {
    setcurrentStudent(st);
    setShowModal(true);
  };

  const setAbsent = () => {
    setStudents((prevState) => {
      const studentsCopy = [...prevState];
      const index = studentsCopy.findIndex(
        (s) => s.StudentID === currentStudent.StudentID
      );
      studentsCopy[index].isPresent = false;

      return studentsCopy;
    });
    setShowModal(false);
  };
  const setPresent = () => {
    setStudents((prevState) => {
      const studentsCopy = [...prevState];
      const index = studentsCopy.findIndex(
        (s) => s.StudentID === currentStudent.StudentID
      );
      studentsCopy[index].isPresent = true;

      return studentsCopy;
    });
    setShowModal(false);
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
          </div>
        </div>
      </div>

      {showModal && (
        <div className="my-modal">
          <div className="content">
            <div className="body ">
              <h5 className="text-center mb-5">{currentStudent.StudentName}</h5>
              <div className="d-flex justify-content-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Cancle
                </button>
                {currentStudent.isPresent ? (
                  <button onClick={setAbsent} className="btn btn-warning ms-3">
                    Set Absent
                  </button>
                ) : (
                  <button onClick={setPresent} className="btn btn-primary ms-3">
                    Set Present
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
Home.getInitialProps = () => {
  return {};
};
export default Home;
