const users = [
  { id: 1, name: "jean" },
  { id: 2, name: "paul" },
  { id: 3, name: "simon" },
  { id: 4, name: "meiling" },
  { id: 5, name: "kyubong" },
];

export class UserService {
  async findAll() {
    //try catch
    return users;
  }
  async findById(id: number) {
    try {
      const user = users.find((user) => user.id === id);
      if (!user) throw new Error("Not found user");
      return user;
    } catch (error) {
      throw new Error("An error occurred while getting the user");
    }
  }
}
