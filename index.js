const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser')
const db = require('./conection')
const response = require("./response")

app.use(bodyParser.json())

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
  const {nim, nama_lengkap, kelas, alamat } = req.body

  const sql = `INSERT INTO karyawan (nim, nama_lengkap, kelas, alamat) VALUES ('${nim}', '${nama_lengkap}', '${kelas}', '${alamat}')`

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

app.put("/karyawan", (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body
  
  const sql = `UPDATE karyawan SET nama_lengkap = '${nama_lengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE  nim = ${nim}`

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

app.delete("/karyawan", (req, res) => {
  const { nim } = req.body
  const sql = `DELETE FROM karyawan WHERE nim = ${nim}`
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
  const { nim, nama_lengkap, kelas, alamat } = req.body;

  const sql = `INSERT INTO jabatan (nim, nama_lengkap, kelas, alamat) VALUES ('${nim}', '${nama_lengkap}', '${kelas}', '${alamat}')`;

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

app.put("/jabatan", (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body;

  const sql = `UPDATE jabatan SET nama_lengkap = '${nama_lengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE  nim = ${nim}`;

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

app.delete("/jabatan", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM jabatan WHERE nim = ${nim}`;
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
  const { nim, nama_lengkap, kelas, alamat } = req.body;

  const sql = `INSERT INTO kontrak (nim, nama_lengkap, kelas, alamat) VALUES ('${nim}', '${nama_lengkap}', '${kelas}', '${alamat}')`;

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

app.put("/kontrak", (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body;

  const sql = `UPDATE kontrak SET nama_lengkap = '${nama_lengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE  nim = ${nim}`;

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

app.delete("/kontrak", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM kontrak WHERE nim = ${nim}`;
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