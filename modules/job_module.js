

const db_connection = require('../config/db.config');

async function getAll() {

  const query = "SELECT * FROM job;"

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

async function getByLimit(limit) {

  const query = `SELECT * FROM \`job\` LIMIT ${limit};`

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

  const query = `SELECT * FROM \`job\` WHERE \`Job_id\` = ? ;`
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

// get a job by company_id api
async function getByCompanyId(id) {

  const query = `SELECT * FROM \`job\` WHERE \`Company_id\` = ? ;`
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

// get jobs by params
async function getByParams(query, params) {

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

  const query = `SELECT * FROM \`job\` WHERE \`Job_id\` in (${ids});`

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

async function createOne(job) {

  const query = `INSERT INTO \`job\` (\`job_id\`, \`Title\`, \`Description\`, \`Company_id\`, \`Type\`, \`Gender\`, \`Expiration\`, \`Department_id\`, \`Skills\`) 
                VALUES (NULL, ? , ? , ? , ? , ? , ? , ? , ? );`;
  const params = [
    job.title,
    job.description,
    job.company_id,
    job.type,
    job.gender,
    job.expiration,
    job.department_id,
    job.skills
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


async function updateByID(id, job) {
  console.log(id);

  const query = `UPDATE \`job\` SET \`Title\` = ?, \`Description\` = ?,
                \`Company_id\` = ?, \`Type\` = ?, \`Gender\` = ?, \`Expiration\` = ?, 
                \`Department_id\` = ?, \`Skills\` = ? WHERE \`job\`.\`Job_id\` = ?;`;
  const params = [
    job.title,
    job.description,
    job.company_id,
    job.type,
    job.gender,
    job.expiration,
    job.department_id,
    job.skills,
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

//   const query = `UPDATE \`job\` SET \`Account_deleted\` = ? WHERE \`job\`.\`job_id\` = ?;`;
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
module.exports.getByLimit = getByLimit;
module.exports.getByCompanyId = getByCompanyId;
module.exports.getByParams = getByParams;
module.exports.getByIds = getByIds;
module.exports.createOne = createOne;
module.exports.updateByID = updateByID;
// module.exports.deleteByID = deleteByID;