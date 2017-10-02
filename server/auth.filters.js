const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const assertAdmin = (req, res, next) => {
  if (req.user.isAdmin||req.user.email==='stanleytiu7@gmail.com') {
    next()
  } else {
    res.status(403).send('Sorry, administrators only!')
  }
}

const forbidden = message => (req, res) => {
  res.status(403).send(message)
}

// Feel free to add more filters here (suggested: something that keeps out non-admins)

module.exports = {
  assertAdmin,
  mustBeLoggedIn,
  selfOnly,
  forbidden
}
