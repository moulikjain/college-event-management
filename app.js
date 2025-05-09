// ===== app.js (Backend with Express) =====
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

let events = []; // In-memory array to store events

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Home Page
app.get('/', (req, res) => {
    res.render('index');
});

// Events Page
app.get('/events', (req, res) => {
    res.render('events', { events });
});

// Register Route
app.post('/register', (req, res) => {
    const { name, eventName } = req.body;
    console.log(`${name} registered for ${eventName}`);
    res.send(`<h2>Thank you, ${name}, for registering!</h2><a href="/">Back to Home</a>`);
});

// Admin Panel
app.get('/admin', (req, res) => {
    res.render('admin', { events });
});

// Add Event
app.post('/admin', (req, res) => {
    const { title, date } = req.body;
    events.push({ title, date });
    res.redirect('/admin');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// ===== views/index.ejs =====
/*
<!DOCTYPE html>
<html>
<head><title>College Event System</title></head>
<body>
<h1>Welcome to College Events</h1>
<a href="/events">View Events</a> | <a href="/admin">Admin Panel</a>
</body>
</html>
*/

// ===== views/events.ejs =====
/*
<!DOCTYPE html>
<html>
<head><title>Events</title></head>
<body>
<h2>Upcoming Events</h2>
<ul>
    <% events.forEach(event => { %>
        <li><%= event.title %> on <%= event.date %></li>
    <% }) %>
</ul>
<h3>Register</h3>
<form action="/register" method="POST">
    Name: <input name="name" required><br>
    Event Name: <input name="eventName" required><br>
    <button type="submit">Register</button>
</form>
<a href="/">Back to Home</a>
</body>
</html>
*/

// ===== views/admin.ejs =====
/*
<!DOCTYPE html>
<html>
<head><title>Admin Panel</title></head>
<body>
<h2>Admin Panel</h2>
<h3>Add New Event</h3>
<form action="/admin" method="POST">
    Title: <input name="title" required><br>
    Date: <input name="date" required><br>
    <button type="submit">Add Event</button>
</form>
<h3>Existing Events:</h3>
<ul>
    <% events.forEach(event => { %>
        <li><%= event.title %> on <%= event.date %></li>
    <% }) %>
</ul>
<a href="/">Back to Home</a>
</body>
</html>
*/

// ===== public/style.css =====
/*
body { font-family: Arial; padding: 20px; }
input, button { margin: 5px 0; padding: 5px; }
a { display: inline-block; margin-top: 10px; }
*/
