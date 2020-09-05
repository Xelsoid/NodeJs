const GOBACKLINK = '<a href="/">Go back</a>';
const RESPONSES = {
  userCreated: `The user created. ${GOBACKLINK}`,
  userExistError: `The user already exist. Try another name. ${GOBACKLINK}`,
  userDeleted: `The user deleted. ${GOBACKLINK}`,
  userDeleteError: `The password doesn't match. Cannot delete user. ${GOBACKLINK}`,
  userNotExists: `The user doesn't exist. ${GOBACKLINK}`,
  userUpdated: `The user info updated. ${GOBACKLINK}`,
  userUpdateError: `The password doesn't match. Cannot update user. ${GOBACKLINK}`,
  userExists: `Information about user by ID. ${GOBACKLINK}`,
  usersNotFound: `Users not found. ${GOBACKLINK}`,
  userList: `Please find user's list. ${GOBACKLINK}`,
};
module.exports = RESPONSES;
