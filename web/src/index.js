const path = require('path')
const express = require('express')

// Initialization
const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(express.static(path.resolve(__dirname, './views')))

// Web
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './views', 'index.html')))

// Start server
app.listen(PORT, () => console.log(`Web started at http://localhost:${PORT}`))