const sendApiSuccess = (res, status, data, message) => {
  return res.status(status)
    .send({
      ok: true,
      status,
      message,
      data,
      error: null
    })
}

const sendApiError = (res, status, error, message) => {
  return res.status(status)
    .send({
      ok: false,
      status,
      message,
      data: null,
      error
    })
}

module.exports = {
  sendApiSuccess,
  sendApiError
}