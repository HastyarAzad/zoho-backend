

const db_connection = require('../config/db.config');

async function getAll() {

  const query = "SELECT * FROM application_data;"

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

  const query = `SELECT * FROM \`application_data\` WHERE \`Application_data_id\` = ? ;`
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


async function getByIds(ids) { // ids must be like   1,2,3,6,8,5,12

  const query = `SELECT * FROM \`application_data\` WHERE \`Application_data_id\` in (${ids});`

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


async function createOne(application_data) {

  const query = `INSERT INTO \`application_data\` (\`Application_data_id\`, \`Application_id\`, \`Question_id\`, \`Answer\`) 
                VALUES (NULL, ?, ?, ?);`;
  const params = [
    application_data.application_id,
    application_data.question_id,
    application_data.answer
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


async function updateByID(id, application_data) {

  const query = `UPDATE \`application_data\` SET \`Application_id\` = ?, \`Question_id\` = ?,
                \`Answer\` = ? WHERE \`application_data\`.\`Application_data_id\` = ?;`;
  const params = [
    application_data.application_id,
    application_data.question_id,
    application_data.answer,
    id
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

//   const query = `UPDATE \`application_data\` SET \`Account_deleted\` = ? WHERE \`application_data\`.\`application_data_id\` = ?;`;
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