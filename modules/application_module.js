

const db_connection = require('../config/db.config');

async function getAll() {

  const query = "SELECT * FROM application;"

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

  const query = `SELECT * FROM \`application\` WHERE \`Application_id\` = ? ;`
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

// get all applications by company_id api
async function getByCompanyId(id) {

  const query = `SELECT * FROM \`application\` WHERE \`Job_id\` in (SELECT \`Job_id\` FROM \`job\` WHERE \`Company_id\` = ?);` // get all jobs by company_id then get all applications by job_id
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

// get all applications by job_id api
async function getByJobId(id) {

  const query = `SELECT * FROM \`application\` WHERE \`Job_id\` = ? ;`
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

  const query = `SELECT * FROM \`application\` WHERE \`Application_id\` in (${ids});`

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

async function createOne(application) {

  const query = `INSERT INTO \`application\` (\`Application_id\`, \`Job_id\`, \`Student_id\`, \`Cv_link\`) 
                VALUES (NULL, ?, ?, ?);`;
  const params = [
    application.job_id,
    application.student_id,
    application.cv_link
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

async function updateByID(id, application) {

  const query = `UPDATE \`application\` SET \`Job_id\` = ?, \`Student_id\` = ? ,\`Cv_link\` = ? WHERE \`application\`.\`Application_id\` = ?`;
  const params = [
    application.job_id,
    application.student_id,
    application.cv_link,
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

//   const query = `UPDATE \`application\` SET \`Account_deleted\` = ? WHERE \`application\`.\`application_id\` = ?;`;
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
module.exports.getByCompanyId = getByCompanyId;
module.exports.getByJobId = getByJobId;
module.exports.getByIds = getByIds;
module.exports.createOne = createOne;
module.exports.updateByID = updateByID;
// module.exports.deleteByID = deleteByID;