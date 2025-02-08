import axios from 'axios';

// URL of the running API
const API_URL = 'http://localhost:3000/api/users';


const register = async (name, email, password, picture) => {
  try {
    // Send a POST request to create a new user
    const response = await axios.post('http://localhost:3000/register', {
      name: name,
      email: email,
      password: password,
      picture: picture
    });

    // Check if the user was created successfully
    console.log('User created successfully!');
    console.log('User details:', response.data);
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error);
  }
};

const login = async (email, password) => {
  try {
    // Send a POST request to the login endpoint
    const response = await axios.post('http://localhost:3000/login', {
      email: email,
      password: password,
    });

    // Check if the login was successful
    if (response.data.jwt) {
      console.log('Login successful!');
      console.log('JWT Token:', response.data.jwt);
    } else {
      console.log('Login failed:', response.data.message || response.data.error);
    }
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
  }
};

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
} // createModel

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

// Create a chart container
const createChartContainer = async () => {
  try {
    const response = await axios.post(`${API_URL}/charts/add`, { 
      email: 'john@example.com', 
      chart1: {
        value1: 2, 
        value2: 4
      },
      chart2: "c2",
      chart3: "c3",
      chart4: "c4"
    });
    console.log('Model chart container:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding chart container:', error.response?.data || error.message);
  } // try
} // createModel

// Update a chart container by email
const updateChartContainer = async () => {  
  try {
    const email = 'john@example.com';
    const response = await axios.post(`${API_URL}/charts/update`, { 
      email: 'john@example.com', 
      chart1: {
        value1: 6, 
        value2: 8
      },
      chart2: "c22",
      chart3: "c33",
      chart4: "c44"
    });
    console.log('Chart Container Retrieved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving chart container:', error.response?.data || error.message);
  } // try
} // updateChartContainer

// Get a chart container by email
const getChartContainer = async () => {
  try {
    const email = 'john@example.com';
    const response = await axios.get(`${API_URL}/charts/get?email=${email}`);
    console.log('Chart Container Retrieved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving chart container:', error.response?.data || error.message);
  } // try
} // getModel

// Run the functions to test the API routes
(async () => {
    await register('John Doe', 'john@example.com', 'password123', 'picture.com');
    //await login('john2@example.com', 'password123');
    //await login('john2@example.com', '22');
    await login('john@example.com', 'password123');
    //await createUser()
    //await getUser();
    
    console.log("==================================================================================")
    
    //await createModel();
    //await getModel();

    console.log("==================================================================================")
    
    //await createChartContainer();
    //await getChartContainer();
    //await updateChartContainer();
    //await getChartContainer();

    console.log("==================================================================================")

    // await updateUser();
    // await deleteUser();
})();