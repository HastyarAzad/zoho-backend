const db_connection = require('../config/db.config');

async function getAll() {

  const query = "SELECT * FROM student;"

  return new Promise((resolve, reject) => {
    
    db_connection.query(query, (err, result) => {
      if (err) {
        logger.info(err);
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
}


async function getById(id) {

  const query = `SELECT * FROM \`student\` WHERE \`User_id\` = ? ;`
  const params = [id];

  return new Promise((resolve, reject) => {
    
    db_connection.query(query, params, (err, result) => {
      if (err) {
        logger.info(err);
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
}


async function getByIds(ids) { // ids must be like   1,2,3,6,8,5,12

  const query = `SELECT * FROM \`student\` WHERE \`User_id\` in (${ids});`

  return new Promise((resolve, reject) => {
    
    db_connection.query(query, (err, result) => {
      if (err) {
        logger.info(err);
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function createOne(student) {

  const query = `INSERT INTO \`student\` (\`User_id\`, \`Username\`, \`Password\`,
                \`Email\`, \`Phone\`, \`Gender\`, \`Picture_url\`) 
                VALUES (NULL, ?, ?, ?, ?, ?, ?);`;
  const params = [
    student.username,
    student.password,
    student.email,
    student.phone,
    student.gender,
    student.picture_url,
  ];

  return new Promise((resolve, reject) => {
    
    db_connection.query(query, params, (err, result) => {
      if (err) {
        logger.info(err);
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
}


async function updateByID(id, student) {

  const query = `UPDATE \`student\` SET \`Username\` = ?, \`Password\` = ?, \`Email\` = ?,
                \`Phone\` = ?, \`Gender\` = ?, \`Picture_url\` = ?, WHERE \`student\`.\`User_id\` = ?`;
  const params = [
    student.username,
    student.password,
    student.email,
    student.phone,
    student.gender,
    student.picture_url,
    id
  ];
 
  return new Promise((resolve, reject) => {
    
    db_connection.query(query, params, (err, result) => {
      if (err) {
        logger.info(err);
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
}

// async function deleteByID(id) {

//   const query = `UPDATE \`student\` SET \`Account_deleted\` = ? WHERE \`student\`.\`User_id\` = ?;`;
//   const params = [1,id];

//   return new Promise((resolve, reject) => {
    
//     db_connection.query(query, params, (err, result) => {
//       if (err) {
//         logger.info(err);
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