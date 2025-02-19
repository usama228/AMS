import Mock from "../mock";

// Mock user list
const userList = [
  {
    id: 1,
    role: "SA",
    name: "Jason Alexander",
    username: "jason_alexander",
    email: "jason@ui-lib.com",
    avatar: "/assets/images/face-6.jpg",
    age: 25
  },
  // You can add more mock users here if needed
];

// Mock login endpoint
Mock.onPost("/api/auth/login").reply(async (config) => {
  try {
    const { email } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (!user) return [400, { message: "Invalid email or password" }];

    // Optionally, you can return a token (JWT) if needed
    const payload = { user };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

// Mock register endpoint
Mock.onPost("/api/auth/register").reply((config) => {
  try {
    const { email, username } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (user) return [400, { message: "User already exists!" }];

    const newUser = {
      id: userList.length + 1, // Incrementing user ID based on length of userList
      role: "GUEST",
      name: "Unknown",
      age: 25,
      email: email,
      username: username,
      avatar: "/assets/images/face-6.jpg"
    };

    userList.push(newUser);

    const payload = { user: { ...newUser } };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

// Mock profile endpoint
Mock.onGet("/api/auth/profile").reply((config) => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: "Invalid Authorization token" }];
    }

    // Return the first user's data as the profile for now
    const payload = { user: userList[0] }; // Adjust if needed based on user session
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});
