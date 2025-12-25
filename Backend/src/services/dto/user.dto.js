// Backend/src/services/dtos/user.dto.js
class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.username = user.username;
    this.email = user.email;
    this.role = 'admin';
  }
}

export default UserDTO;