require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getLocations() {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const result = await con.execute(
      `BEGIN 
         get_location_details(:cursor);
       END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      }
    );

    const resultSet = result.outBinds.cursor;
    const rows = [];

    let row;
    while ((row = await resultSet.getRow())) {
      rows.push(row);
    }

    await resultSet.close();
    return rows;
  } catch (err) {
    console.error('Error fetching locations:', err);
    throw err;
  } finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

async function deleteLocation(locationNo) {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    await con.execute(
      `BEGIN 
         delete_location(:locationNo);
       END;`,
      {
        locationNo: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: locationNo },
        
      }
    );
    console.log('Location deleted successfully');

  } catch (err) {
    if (err.errorNum === 20001) {
      console.error('Cannot delete location due to related records.');
    } else {
      console.error('Error deleting location:', err);
    }    throw err;
  } finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}



module.exports = { getLocations, deleteLocation };
