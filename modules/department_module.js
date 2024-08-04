const db_connection = require("../config/db.config");

async function getAll() {
  const query = "SELECT * FROM department;";

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
  const query = `SELECT * FROM \`department\` WHERE \`department_id\` = ? ;`;
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

async function getByIds(ids) {
  // ids must be like   1,2,3,6,8,5,12

  const query = `SELECT * FROM \`department\` WHERE \`department_id\` in (${ids});`;

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

async function createOne(department) {
  const query = `INSERT INTO \`department\` (\`department_id\`, \`name\`) 
                VALUES (NULL, ? );`;
  const params = [department.name];

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

async function updateByID(id, department) {
  const query = `UPDATE \`department\` SET \`name\` = ? WHERE \`department\`.\`department_id\` = ?`;
  const params = [department.name, id];

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

//   const query = `UPDATE \`department\` SET \`Account_deleted\` = ? WHERE \`department\`.\`Department_id\` = ?;`;
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
module.exports.getByIds = getByIds;
module.exports.createOne = createOne;
module.exports.updateByID = updateByID;
// module.exports.deleteByID = deleteByID;
