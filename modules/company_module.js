

const db_connection = require('../config/db.config');

async function getAll() {

  const query = "SELECT * FROM company;"

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

  const query = `SELECT * FROM \`company\` WHERE \`Company_id\` = ? ;`
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

  const query = `SELECT * FROM \`company\` WHERE \`Email\` = ? ;`
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

  const query = `SELECT * FROM \`company\` WHERE \`Email\` = ? AND \`Password\` = ?;`
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

async function getByIds(ids) { // ids must be like   1,2,3,6,8,5,12

  const query = `SELECT * FROM \`company\` WHERE \`Company_id\` in (${ids});`

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

async function createOne(company) {

  const query = `INSERT INTO \`company\` (\`Company_id\`, \`Username\`, \`Password\`,
                \`Email\`, \`Phone\`, \`Address\`, \`Logo\`, \`description\`) 
                VALUES (NULL, ?, ?, ?, ?, ?, ?, ?);`;
  const params = [
    company.username,
    company.password,
    company.email,
    company.phone,
    company.address,
    company.logo,
    company.description
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


async function updateByID(id, company) {

  const query = `UPDATE \`company\` SET \`Username\` = ?, \`Password\` = ?, \`Email\` = ?,
                \`Phone\` = ?, \`Address\` = ?, \`Logo\` = ?, \`Description\` = ? WHERE \`company\`.\`Company_id\` = ?`;
  const params = [
    company.username,
    company.password,
    company.email,
    company.phone,
    company.address,
    company.logo,
    company.description,
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

//   const query = `UPDATE \`company\` SET \`Account_deleted\` = ? WHERE \`company\`.\`Company_id\` = ?;`;
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