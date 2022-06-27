function sendSuccess(res, payload) {
  return res.json({
    success: true,
    payload,
  });
}

function sendError(next, message, status) {
  const err = new Error(message || "Something went wrong");
  err.status = status;

  return next(err);
}

module.exports = {
  sendSuccess,
  sendError,
};
