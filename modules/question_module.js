

const db_connection = require('../config/db.config');

async function getAll() {

  const query = "SELECT * FROM question;"

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

  const query = `SELECT * FROM \`question\` WHERE \`Question_id\` = ? ;`
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

  const query = `SELECT * FROM \`question\` WHERE \`Question_id\` in (${ids});`

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


async function createOne(question) {

  const query = `INSERT INTO \`question\` (\`Question_id\`, \`Text\`, \`Job_id\`) 
                VALUES (NULL, ?, ?);`;
  const params = [
    question.text,
    question.job_id
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


async function updateByID(id, question) {

  const query = `UPDATE \`question\` SET  \`Text\` = ?, \`Job_id\` = ? WHERE \`question\`.\`Question_id\` = ?;`;
  const params = [
    question.text,
    question.job_id,
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

//   const query = `UPDATE \`question\` SET \`Account_deleted\` = ? WHERE \`question\`.\`question_id\` = ?;`;
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