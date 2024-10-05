const express = require('express');
const cors = require('cors');
const { connectDB } = require('./models/db');
const menuRoutes = require('./routes/menuRoutes');


const cors = require('cors');
app.use(cors());
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const { sequelize } = require('./models/db');
const MenuItem = require('./models/menuItem');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');

const createTables = async () => {
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
};

createTables();
