const MockedUsers = [
  {
    login: 'Artsiom',
    password: 1234567890,
    id: '1095c78d-a430-4170-b72e-a611af794465',
    age: 29,
    isdeleted: false
  },{
    login: 'Anton',
    password: 'qwerty',
    id: '27d2ae2e-01ab-4e6d-a217-16f9c5990b4f',
    age: 25,
    isdeleted: false
  },
];

const MockedGroups = {
  id: '80cdd44b-0947-43d6-88b3-7d6115f145b5',
  name: 'admin',
  permissions: ['write', 'delete', 'create']
};

module.exports = {
  MockedUsers, MockedGroups
};
