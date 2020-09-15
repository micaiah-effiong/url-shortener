class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorResponse = (msg, statusCode) => {
  return new ErrorResponse(msg, statusCode);
};

module.exports = errorResponse;
