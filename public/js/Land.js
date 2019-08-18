(function () {
	var Land = window.Land = function () {
		// 背景
		this.image = game.R.land
		this.y = game.canvas.height * 0.8
		// 基准线高度
		this.lineH = game.canvas.height - this.h - this.y
		this.h = 112
		this.w = 336
		this.x = 0
		this.speed = 1
	}
	// 更新
	Land.prototype.update = function () {
		this.x -= this.speed
		if (this.x < -this.w) {
			this.x = 0
		}
	}
	// 渲染
	Land.prototype.render = function () {
		// 渲染图片
		game.ctx.drawImage(this.image, this.x, this.y)
		game.ctx.drawImage(this.image, this.x + this.w, this.y)
		game.ctx.drawImage(this.image, this.x + this.w * 2, this.y)
		// 补充大地
		game.ctx.fillStyle = "#ddd89d"
		game.ctx.fillRect(0, this.y + this.h - 1, game.canvas.width, this.lineH)
	}
})()