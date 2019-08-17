class UserModel {
  constructor(id,firstName, lastName, email, phoneNumber, gender, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.password = password;
  }
}

export default UserModel;