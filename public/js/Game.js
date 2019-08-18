(function () {
	var Game = window.Game = function (params) {
		// 得到画布
		this.canvas = document.querySelector(params.id)
		// 上下文
		this.ctx = this.canvas.getContext("2d")
		// 资源文件地址
		this.RjsonUrl = params.RjsonUrl 
		// 帧编号
		this.fno = 0
		// 设置宽度和高度
		this.init()
		// 分数
		this.score = 0
		var self = this
		// 读取资源
		this.loadAllResource(function () {
			self.start()
			// 绑定监听
			self.bindEvent()
		})
	}
	// 初始化，设置画布的宽度和高度 
	Game.prototype.init = function () {
		// 读取视图的高度和宽度
		var windowW = document.documentElement.clientWidth
		var windowH = document.documentElement.clientHeight
		if (windowW > 411) {
			windowW = 411
		}else if (windowW < 320) {
			windowW = 320
		}
		if (windowH > 823) {
			windowW = 823
		}else if (windowH < 640) {
			windowH = 640
		}

		this.canvas.width = windowW
		this.canvas.height = windowH
	}

	// 读取资源
	Game.prototype.loadAllResource = function (callback) {
		// 准备一个 R 对象
		this.R = {}
		// 备份 this
		var self = this
		// 计数器
		var alreadyDoneNumber = 0
		// 发出请求，请求 JSON 文件
		var xhr = new XMLHttpRequest()
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				var Robj = JSON.parse(xhr.responseText)
				// 遍历数组
				for (var i = 0; i < Robj.images.length; i ++) {
					// 创建一个同名的 key
					self.R[Robj.images[i].name] = new Image()
					// 请求
					self.R[Robj.images[i].name].src = Robj.images[i].url
					// 监听
					self.R[Robj.images[i].name].onload = function () {
						alreadyDoneNumber ++
						// 清屏
						self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
						
						// 判断是否已经加载完毕
						if (alreadyDoneNumber == Robj.images.length) {
							callback()
						}
					}

				}
			}
			
		}
		xhr.open("get", this.RjsonUrl, true)
		xhr.send(null)
	}

	// 开始游戏
	Game.prototype.start = function () {
		// 实例化背景
		this.background = new Background()
		// 实例化大地
		this.land = new Land()
		// 实例化小鸟
		this.bird = new Bird()
		// 管子数组
		this.pipeArr = []
		var self = this
		// 设置定时器
		this.timer = setInterval(function () {
			// 清屏
			self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
			self.fno ++
			// 更新背景
			self.background.update()
			// 渲染背景
			self.background.render()
			// 更新大地
			self.land.update()
			// 渲染大地
			self.land.render()
			// 更新小鸟
			self.bird.update()
			// 渲染小鸟
			self.bird.render()
			// 更新渲染所有的管子
			for (var i = 0; i < self.pipeArr.length; i++) {
				// 如果管子存在，则渲染更新
				self.pipeArr[i] && self.pipeArr[i].update()
				self.pipeArr[i] && self.pipeArr[i].render()
			}
			// 实例化管子
			self.fno % 250 == 0 && new Pipe()
			// self.ctx.font = "16px Monaco"
			// self.ctx.textAlign = "left"
			// self.ctx.fillText("FNO:" + self.fno, 10, 20)
			
			// 打印当前分数
			var scoreLength = self.score.toString().length
			for (var i = 0; i < scoreLength; i ++) {
				self.ctx.drawImage(self.R["shuzi" + self.score.toString().charAt(i)], self.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i, 100)
			}
			
		}, 20)
	}

	Game.prototype.bindEvent = function () {
		var self = this
		this.canvas.onclick = function () {
			self.bird.fly()
		}
	}
})()