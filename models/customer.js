module.exports = {
  createUser: (firstName, lastName, email) => {
    return {
      'lastname': lastName,
      'firstname': firstName,
      'email': email,
      'store_id': 1,
      'website_id': 1
    }
  }
}
