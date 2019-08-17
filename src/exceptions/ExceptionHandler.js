class ExceptionHandler extends Error {
  constructor(message, status) {
    super();
    this.message = {
      'message': message || 'Something went wrong. Please try again.',
      'status': status || 500
    };
  }
}
export default ExceptionHandler;