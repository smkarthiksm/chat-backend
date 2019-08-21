class ExceptionHandler extends Error {
  constructor(message, statusCode) {
    super();
    this.message = {
      'message': message || 'Something went wrong. Please try again.',
      'statusCode': statusCode || 500
    };
  }
}
export default ExceptionHandler;