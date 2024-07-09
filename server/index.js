const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb+srv://dhinaashwin11:Mongodbpassword@shopstopcluster.d9uxour.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ShopStopCluster';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
  const { uid, email, displayName } = req.body;

  const newUser = new User({
    uid,
    email,
    displayName,
    // Add other fields as needed
  });

  try {
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Failed to create user');
  }
});

// Item Schema and Model
const itemSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  main_image: { type: String, required: true },
  image_2: { type: String },
  image_3: { type: String },
  image_4: { type: String },
  category: { type: String, required: true },
  new_product: { type: Boolean, required: true },
  discount: { type: Boolean, required: true },
  gender: { type: String, required: true },
  fit: { type: String, required: true },
  fabric: { type: String, required: true },
  sleeve: { type: String, required: true },
  color: { type: String, required: true },
  design: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  sizes: { type: Object, required: true },
});

const Item = mongoose.model('allproducts', itemSchema);

app.get('/', (req, res) => {
  res.send('Connected');
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Failed to fetch items');
  }
});

app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).send('Failed to fetch item');
  }
});

app.post('/upload', async (req, res) => {
  const { id, name, description, new_price, old_price, main_image, image_2, image_3, image_4, category, new_product, discount, gender, fit, fabric, sleeve, color, design, sizes } = req.body;

  const newItem = new Item({
    id,
    name,
    description,
    new_price,
    old_price,
    main_image,
    image_2,
    image_3,
    image_4,
    category,
    new_product,
    discount,
    gender,
    fit,
    fabric,
    sleeve,
    color,
    design,
    sizes,
  });

  try {
    await newItem.save();
    res.status(201).send('Item created successfully');
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).send('Failed to create item');
  }
});
// Add this route to check if a user exists by uid
app.get('/users/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Failed to fetch user');
  }
});


app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.status(200).send('Item deleted');
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send('Failed to delete item');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
