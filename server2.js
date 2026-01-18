const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');  // Import jwt để sử dụng
const dotenv = require('dotenv');


dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_URL,  // Cho phép yêu cầu từ frontend tại localhost:8080
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Cho phép gửi cookie
}));
// Cấu hình CORS cho cả REST API và Socket.IO
const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://192.168.43.181:8080',  // Cho phép frontend từ localhost:8080
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,  // Cho phép gửi cookie và header Authorization
    }
});

// Thông tin người dùng giả (trong thực tế bạn sẽ lấy từ database)
const users = [
    { username: "admin", password: "duc", role: "admin" },
];
//User: username, password, email, role, phone
//Food: name, price, type, imgSrc
//Order: foodId, quatity, tableId
const SECRET_KEY = "your_secret_key";

// API đăng nhập
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    // Kiểm tra tên người dùng và mật khẩu
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Tên người dùng hoặc mật khẩu không đúng" });
    }

    // Tạo Bearer Token
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    // Lưu token vào cookie HTTP-Only (hoặc trả token về frontend)
    res.cookie('auth_token', token, {
        httpOnly: true,  // Cookie không thể truy cập từ JavaScript
        // secure: 'none',   // Đặt false trong môi trường phát triển (chưa dùng HTTPS)
        // sameSite: 'none',
        maxAge: 3600 * 1000,  // Thời gian sống của cookie (1 giờ)
    });

    // Trả token trong body response nếu cần
    res.json({ message: 'Đăng nhập thành công', token: token });
});

// Middleware xác thực token
function verifyToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1]; // Lấy Bearer Token từ header

    if (!token) {
        return res.status(403).json({ message: "Không có quyền truy cập" });
    }

    // Kiểm tra token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }
        req.user = decoded; // Lưu thông tin người dùng vào req.user
        next(); // Tiếp tục với các middleware khác hoặc handler
    });
}

// API bảo mật, chỉ có người đã đăng nhập mới có quyền truy cập
app.get('/api/orders', verifyToken, (req, res) => {
    // Trả về danh sách đơn hàng nếu người dùng đã được xác thực
    res.json({ orders: [] }); // Ví dụ trả về danh sách đơn hàng rỗng
});

app.get('/api/verify', (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    //console.log(token);
    let response = {}
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }
        response = decoded;
    });
    res.send({ usename: response.username, role: response.role });
});

// Kết nối với Socket.IO
let orders = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('new_request', (order) => {
        console.log('New order from table:', order.table);
        console.log('Customer info:', order.customer_name, order.customer_phone);
        orders.push(order);
        io.emit('admin_got_new_request', order);  // Emit the new request to all clients
        io.emit()
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// 1:MQ==
// 2:Mg==
// 3:NA==
/*
thêm trạng thái bàn (bàn đang có người đặt, gộp đơn hàng của một người trong một bàn)
waiter không cần thấy story, chỉ admin thấy
tích hợp thanh toán

thêm thanh toán
*/