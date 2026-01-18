import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import corsConfig from './src/configs/corsConfig.js';
import adminRoutes from './src/routes/adminRouter.js';
import orderRoutes from './src/routes/orderRouter.js';
import ownerRoutes from './src/routes/ownerRouter.js';
import productionRoutes from './src/routes/productionRouter.js';
import userRoutes from './src/routes/userRouter.js';
import authRoutes from './src/routes/authRouter.js';
import MongoDBConfig from './src/configs/MongoDBConfig.js';
import session from 'express-session';
import passport from './src/configs/passport.js';

import http from "http";
import { Server } from "socket.io";

const app = express();
app.set('trust proxy', 1);

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use(cookieParser());

corsConfig(app);

app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/order', orderRoutes);
app.use('/owner', ownerRoutes);
app.use('/production', productionRoutes);
app.use('/auth', authRoutes);

app.get('/me', (req, res) => {
  res.json(req.user || null);
});

MongoDBConfig();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", socket => {
  socket.on("join_owner", (email) => {
    socket.join(email);
  });
  socket.on("customer_order", (order) => {
    const email = order.ownerEmail;
    io.to(email).emit("restaurant_order", order);
  });
  socket.on("staff_update_status", (email, order_id) => {
    io.to(email).emit("order_success", order_id);
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});