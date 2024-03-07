const response = (statusCode, datas, message, res) => {
  res.status(statusCode).json({
    payload: {
      status_code: statusCode,
      massage: message,
      datas: datas,
    },
  });
};

module.exports = response;