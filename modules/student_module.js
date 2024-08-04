const db_connection = require("../config/db.config");

async function getAll() {
  const query = "SELECT * FROM student;";

  return new Promise((resolve, reject) => {
    db_connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getById(id) {
  const query = `SELECT * FROM \`student\` WHERE \`Student_id\` = ? ;`;
  const params = [id];

  return new Promise((resolve, reject) => {
    db_connection.query(query, params, (err, result) => {
      if (err) {
        console.log(err);
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getByEmail(email) {
  const query = `SELECT * FROM \`student\` WHERE \`Email\` = ? ;`;
  const params = [email];

  return new Promise((resolve, reject) => {
    db_connection.query(query, params, (err, result) => {
      if (err) {
        console.log(err);
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
}

// check if the email and password are correct
async function login(email, password) {
  const query = `SELECT * FROM \`student\` WHERE \`Email\` = ? AND \`Password\` = ?;`;
  const params = [email, password];

  return new Promise((resolve, reject) => {
    db_connection.query(query, params, (err, result) => {
      if (err) {
        console.log(err);
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getByIds(ids) {
  // Ensure ids is an array and has elements
  if (!Array.isArray(ids) || ids.length === 0) {
    return []; // Return an empty array if no ids are provided
  }

  // Use placeholders for the SQL query
  const placeholders = ids.map(() => "?").join(",");
  const query = `SELECT * FROM \`student\` WHERE \`Student_id\` IN (${placeholders})`;

  return new Promise((resolve, reject) => {
    db_connection.query(query, ids, (err, result) => {
      if (err) {
        console.log(err);
        reject(err); // Reject the promise on error
      } else {
        resolve(result); // Resolve with the result
      }
    });
  });
}

async function createOne(student) {
  const query = `INSERT INTO \`student\` (\`Student_id\`, \`Username\`, \`Password\`,
                \`Email\`, \`Phone\`, \`Picture_url\`) 
                VALUES (NULL, ?, ?, ?, ?, ?);`;
  const params = [
    student.username,
    student.password,
    student.email,
    student.phone,
    student.picture_url,
    student.description,
  ];

  return new Promise((resolve, reject) => {
    db_connection.query(query, params, (err, result) => {
      if (err) {
        console.log(err);
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function updateByID(id, student) {
  const query = `UPDATE \`student\` SET \`Username\` = ?, \`Password\` = ?, \`Email\` = ?,
                \`Phone\` = ?, \`Gender\` = ?, \`Picture_url\` = ?, \`Skills\` = ?, \`Description\` = ? WHERE \`student\`.\`Student_id\` = ?`;
  const params = [
    student.username,
    student.password,
    student.email,
    student.phone,
    student.gender,
    student.picture_url,
    student.skills,
    student.description,
    id,
  ];

  return new Promise((resolve, reject) => {
    db_connection.query(query, params, (err, result) => {
      if (err) {
        console.log(err);
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
}

// async function deleteByID(id) {

//   const query = `UPDATE \`student\` SET \`Account_deleted\` = ? WHERE \`student\`.\`Student_id\` = ?;`;
//   const params = [1,id];

//   return new Promise((resolve, reject) => {

//     db_connection.query(query, params, (err, result) => {
//       if (err) {
//         console.log(err);
//         resolve(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// }

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.getByEmail = getByEmail;
module.exports.login = login;
module.exports.getByIds = getByIds;
module.exports.createOne = createOne;
module.exports.updateByID = updateByID;
// module.exports.deleteByID = deleteByID;
