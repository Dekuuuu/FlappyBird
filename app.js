const express = require('express')

const app = new express()

app.engine('html', require('ejs').renderFile)
// 设置视图引擎
app.set('view engine', 'html')
app.get('/', (req, res) => {
	res.render('index')
})
app.get('/moni', (req, res) => {
	res.render('moni')
})
// 静态化资源文件
app.use(express.static('public'))

app.listen(3002)