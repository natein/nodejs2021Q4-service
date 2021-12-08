function errorHandler(err, reply) {
  if(err.code) {
    const {message} = err;
    return reply.status(err.code).send({ message });
  } throw err; 
}

module.exports = { errorHandler };