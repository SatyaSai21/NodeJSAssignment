module.exports.Response = (res, data, status = 200) => {
  return res.status(status).json({ success: true, Data:data });
};

module.exports.Error = (res, message, status = 500, title = "Error") => {
  return res.status(status).json({
    success: false,
    title,
    message,
    status,
    stack: process.env.NODE_ENV === "production" ? null : new Error().stack,
  });
};