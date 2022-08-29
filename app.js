// 用require載入express
const express = require('express')
const app = express()
const port = 3000
// 將JSON檔載入express中
const restaurantList = require("./restaurant.json").results

// 用require載入express-handlebars，定義樣板引擎
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定express靜態檔案路由
app.use(express.static('public'))


// 將資料帶入index列表樣板
app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurantList })
})

// 將資料帶入show個別樣板
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})


// 設定搜尋路由
app.get('/search', (req, res) => {
  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  const restaurants = restaurantList.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || 
    restaurant.category.includes(keyword)
  })
  res.render('index', { restaurantList: restaurants, keywords: keywords })
})



// 啟動伺服器去監聽
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})