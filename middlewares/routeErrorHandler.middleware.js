// not route found error Handler

function routeErrorHandler(req, res) {
  res
    .status(404)
    .json({
      success: false,
      message: "route not found on server, please check",
    });
}

module.exports = { routeErrorHandler };
