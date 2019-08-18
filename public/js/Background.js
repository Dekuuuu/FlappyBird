(function () {
	var Background = window.Background = function () {
		// 背景
		this.image = game.R.bg_day
		// 坐标
		this.y = (game.canvas.height / 2) - (512 * 0.4)
		this.w = 288
		this.h = 512
		this.x = 0
		this.speed = 1
		game.ctx.drawImage(this.image, 100, 100)
	}
	// 更新
	Background.prototype.update = function () {
		this.x -= this.speed
		if (this.x < -this.w) {
			this.x = 0
		}
	}
	// 渲染
	Background.prototype.render = function () {
		// 渲染图片
		game.ctx.drawImage(this.image, this.x, this.y)
		game.ctx.drawImage(this.image, this.x + this.w, this.y)
		game.ctx.drawImage(this.image, this.x + (this.w * 2), this.y)
		// 补充天空矩形
		game.ctx.fillStyle = "#4EC0CA"
		game.ctx.fillRect(0, 0, game.canvas.width, this.y + 1)
		// 补充草丛
		game.ctx.fillStyle = "#ddd89d"
		game.ctx.fillRect(0, this.y + this.h - 1, game.canvas.width, game.canvas.height - this.h - this.y)
	}
})()