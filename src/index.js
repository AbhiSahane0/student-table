// fetches the saved data
document.addEventListener("DOMContentLoaded", loadStudents);

const form = document.getElementById("student-form");
const student_table_body = document.getElementById("student-table-body");

// Load students from local storage and display them
function loadStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach((student, index) => addStudentToTable(student, index));
}

// Add student to table 
function addStudentToTable(student, index) {
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td class="border border-blue-400 px-4 py-2 text-center">${student.name}</td>
    <td class="border border-blue-400 px-4 py-2 text-center">${student.roll}</td>
    <td class="border border-blue-400 px-4 py-2 text-center">${student.id}</td>
    <td class="border border-blue-400 px-4 py-2 text-center">${student.email}</td>
    <td class="border border-blue-400 px-4 py-2 text-center">${student.phone}</td>
    <td class="border border-blue-400 px-4 py-2 text-center">
      <button onclick="editStudent(${index})" class="mr-2 bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
      <button onclick="deleteStudent(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
    </td>
  `;

  student_table_body.appendChild(newRow);
}

// Submit Form action
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const student = {
    name: document.getElementById("student-name").value,
    id: document.getElementById("student-id").value,
    roll: document.getElementById("student-roll").value,
    email: document.getElementById("student-email").value,
    phone: document.getElementById("student-phone").value,
    class: document.getElementById("student-class").value,
  };

  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  student_table_body.innerHTML = "";
  loadStudents();
  form.reset();
});

// Edit Student
function editStudent(index) {
  const students = JSON.parse(localStorage.getItem("students"));
  const student = students[index];

  document.getElementById("student-name").value = student.name;
  document.getElementById("student-id").value = student.id;
  document.getElementById("student-roll").value = student.roll;
  document.getElementById("student-email").value = student.email;
  document.getElementById("student-phone").value = student.phone;
  document.getElementById("student-class").value = student.class;

  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));

  student_table_body.innerHTML = "";
  loadStudents();
}

// Delete Student
function deleteStudent(index) {
  const students = JSON.parse(localStorage.getItem("students"));
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));

  student_table_body.innerHTML = "";
  loadStudents();
}
