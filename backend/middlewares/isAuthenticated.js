const isAuthenticated = (req, res, next) => {
  if (typeof req.session.username !== 'undefined') {
    console.log('first')
    next()
  } else {
    console.log('second')

    next(new Error(`You aren't allowed to be here!`))
  }
}

module.exports = isAuthenticated
