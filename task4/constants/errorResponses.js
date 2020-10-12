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

  createGroup: {
    created: `The Group created. ${GOBACKLINK}`,
    exists: `The Group already exist. Try another name. ${GOBACKLINK}`,
    updated: `The Group updated.  ${GOBACKLINK}`,
  },
  updateGroup: {
    groupUpdated: `The Group info updated. ${GOBACKLINK}`,
    groupNotUpdated: `The Group doesn't exist. Cannot update Group. ${GOBACKLINK}`,
  },
  deleteGroup: {
    deleted: `The Group deleted. ${GOBACKLINK}`,
    notExists: `The Group doesn't exist. ${GOBACKLINK}`,
  },
  getGroup: {
    groupExists: `Information about user by ID. ${GOBACKLINK}`,
    groupNotFound: `User with such ID not found. ${GOBACKLINK}`,
  },
  getGroups: {
    groupsList: `Please find group's list. ${GOBACKLINK}`,
    groupsNotFound: `Groups not found. ${GOBACKLINK}`,
  },
};

module.exports = RESPONSES;
