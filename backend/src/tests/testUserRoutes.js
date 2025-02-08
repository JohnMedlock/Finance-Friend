import axios from 'axios';

// URL of the running API
const API_URL = 'http://localhost:3000/api/users';

// Create a new user
const createUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/add`, {
      name: 'John Doe',
      email: 'john@example.com',
      updatedAt: new Date(),
      picture: 'http://example.com/pic.jpg',
    });
    console.log('User Created:', response.data);
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error);
  }
};

// Get user by email
const getUser = async () => {
  try {
    const email = 'john@example.com'
    const response = await axios.get('http://localhost:3000/api/users/get/' + email)
    console.log('User Retrieved:', response.data);
  } catch (error) {
    console.error('Error getting user:', error.response?.data || error.message);
  }
};

// Create a model
const createModel = async () => {
  try {
    const response = await axios.post(`${API_URL}/models/add`, { 
      email: 'john@example.com', 
      modelName: 'abcde', 
      link: 'https://www.example.com' 
    });
    console.log('Model Added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding model:', error.response?.data || error.message);
  } // try
} // addModel

// Get a model by email and model name
const getModel = async () => {
  try {
    const email = 'john@example.com';
    const modelName = 'abcde';
    // Use query parameters instead of URL path
    const response = await axios.get(`${API_URL}/models/get?email=${email}&modelName=${modelName}`);
    console.log('Model Retrieved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving model:', error.response?.data || error.message);
  } // try
} // getModel

// Update user by email
const updateUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/update`, {
      email: 'john@example.com',
      name: 'John Updated',
      updatedAt: new Date(),
      picture: 'http://example.com/updated_pic.jpg',
    });
    console.log('User Updated:', response.data);
  } catch (error) {
    console.error('Error updating user:', error.response?.data || error);
  }
};

// Delete user by email
const deleteUser = async () => {
  try {
    const email = 'john@example.com'
    const response = await axios.get(`${API_URL}/delete/` + email);
    console.log('User Deleted:', response.data);
  } catch (error) {
    console.error('Error deleting user:', error.response?.data || error.message);
  }
};


// Run the functions to test the API routes
(async () => {
    await createUser()
    await getUser();
    await createModel();
    await getModel();
    await updateUser();
    await deleteUser();
})();