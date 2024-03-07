const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser')
const db = require('./conection')
const response = require("./response")
const helmet = require('helmet')
const xssClean = require('xss-clean')
const cors = require('cors')
const compression = require('compression')

app.use(bodyParser.json())

// Use helmet
app.use(helmet())

// Use xss-clean
app.use(xssClean())

// Use cors
app.use(cors())

// use compression
app.use(compression())


app.get("/", (req, res) => {
  response(200, "API V1 Ready to go", "SUCCESS", res)
})

// karyawan
app.get("/karyawan", (req, res) => {
  const sql = `SELECT * FROM karyawan`
  db.query(sql, (error, result) => {
    if (error) throw error 
    // <-- artinya kalau terjadi error tidak akan melanjutkan yang di bawah
    response(200, result,  "SUCCESS", res);
  })
});

app.post("/karyawan", (req, res) => {
  const { idcard, name, pekerjaan } = req.body;
  console.log(req.body)

  const sql = `INSERT INTO karyawan (idcard, name, pekerjaan) VALUES ('${idcard}', '${name}', '${pekerjaan}')`;

  db.query(sql, (error, result) => {
    if(error) response(500, "Invalid", "gagal menambah data", res)
    if (result?.affectedRows){ 
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "SUCCESS", res);
    }
  })
});

app.put("/karyawan/:id", (req, res) => {
  const { id } = req.params;
  const { idcard, name, pekerjaan } = req.body;
  
  const sql = `UPDATE karyawan SET idcard = '${idcard}', name = '${name}', pekerjaan = '${pekerjaan}' WHERE  id = ${id}`;

  db.query(sql, (error, result) => {
    if (error) response(500, error, "Invalid", res); 
    if (result?.affectedRows) {
      const data = {
        isSuccess : result.affectedRown,
        message: result.message,
      }
      response(200, data, "SUCCESS Update data", res);
    } else {
      response(500, "user not found", "Error", res)
    }
  })
});

app.delete("/karyawan/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM karyawan WHERE id = ${id}`
  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "error" ,res)
          const data = {
            isDeleted: result.affectedRown,
          };
    if (result?.affectedRows) {
      response(200, data, "Deleted data success", res)
    } else {
      response(500, "user not found", "Error", res);
    }
  })
});

// Jabatan
app.get("/jabatan", (req, res) => {
  const sql = `SELECT * FROM jabatan`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    // <-- artinya kalau terjadi error tidak akan melanjutkan yang di bawah
    response(200, result, "SUCCESS", res);
  });
});

app.post("/jabatan", (req, res) => {
  const { idcard, name, jabatan } = req.body;
  console.log(req.body)
  const sql = `INSERT INTO jabatan (idcard, name, jabatan) VALUES ('${idcard}', '${name}', '${jabatan}')`;

  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "gagal menambah data", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "SUCCESS", res);
    }
  });
});

app.put("/jabatan/:id", (req, res) => {
  const {id} = req.params
  const { idcard, name, jabatan } = req.body;

  const sql = `UPDATE jabatan SET idcard = '${idcard}', name = '${name}', jabatan = '${jabatan}' WHERE  id = ${id}`;
 
  db.query(sql, (error, result) => {
    if (error) response(500, error, "Invalid", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRown,
        message: result.message,
      };
      response(200, data, "SUCCESS Update data", res);
    } else {
      response(500, "user not found", "Error", res);
    }
  });
});
    
app.delete("/jabatan/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM jabatan WHERE id = ${id}`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "error", res);
    const data = {
      isDeleted: result.affectedRown,
    };
    if (result?.affectedRows) {
      response(200, data, "Deleted data success", res);
    } else {
      response(500, "user not found", "Error", res);
    }
  });
});

// kontrak
app.get("/kontrak", (req, res) => {
  const sql = `SELECT * FROM kontrak`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    // <-- artinya kalau terjadi error tidak akan melanjutkan yang di bawah
    response(200, result, "SUCCESS", res);
  });
});

app.post("/kontrak", (req, res) => {
  const { idcard, name, kontrak } = req.body;

  const sql = `INSERT INTO kontrak (idcard, name, kontrak) VALUES ('${idcard}', '${name}', '${kontrak}')`;

  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "gagal menambah data", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "SUCCESS", res);
    }
  });
});

app.put("/kontrak/:id", (req, res) => {
  const { id } = req.params;
   const { idcard, name, kontrak } = req.body;

  const sql = `UPDATE kontrak SET idcard = '${idcard}', name = '${name}', kontrak = '${kontrak}' WHERE  id = ${id}`;

  db.query(sql, (error, result) => {
    if (error) response(500, error, "Invalid", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRown,
        message: result.message,
      };
      response(200, data, "SUCCESS Update data", res);
    } else {
      response(500, "user not found", "Error", res);
    }
  });
});

app.delete("/kontrak/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM kontrak WHERE id = ${id}`;
  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "error", res);
    const data = {
      isDeleted: result.affectedRown,
    };
    if (result?.affectedRows) {
      response(200, data, "Deleted data success", res);
    } else {
      response(500, "user not found", "Error", res);
    }
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})