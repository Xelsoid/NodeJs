const GOBACKLINK = '<a href="/">Go back</a>';
const RESPONSES = {
  createUser: {
    created: `The user created. ${GOBACKLINK}`,
    exists: `The user already exist. Try another name. ${GOBACKLINK}`,
  },
  deleteUser: {
    deleted: `The user deleted. ${GOBACKLINK}`,
    notExists: `The user doesn't exist or wrong password entered. ${GOBACKLINK}`,
  },
  updateUser: {
    userUpdated: `The user info updated. ${GOBACKLINK}`,
    userNotUpdated: `The user doesn't exist or the password doesn't match. Cannot update user. ${GOBACKLINK}`,
  },
  findUsers: {
    usersList: `Please find user's list. ${GOBACKLINK}`,
    usersNotFound: `The password doesn't match. Cannot update user. ${GOBACKLINK}`,
  },
  getUser: {
    usersExists: `Information about user by ID. ${GOBACKLINK}`,
    usersNotFound: `User with such ID not found. ${GOBACKLINK}`,
  },
};

module.exports = RESPONSES;
