(function () {
	var Bird = window.Bird = function () {
		// 随机小鸟颜色 0，1，2
		this.color = parseInt(Math.random() * 3)
		// 图片
		this.imageArr = [
			game.R["bird" + this.color + "_0"],
			game.R["bird" + this.color + "_1"],
			game.R["bird" + this.color + "_2"]
		]
		// 翅膀动画
		this.wing = 0
		// x 轴
		this.x = game.canvas.width * 0.3 - 24
		// y 轴
		this.y = 100
		// 帧
		this.fno = 0
		// 角度
		this.d = 0
		// 爆发
		this.boom = false
	}
	Bird.prototype.update = function () {
		// 计算碰撞检测值
		this.T = this.y + 13 // 13 是修正值，鸟的图片有空白
		this.R = this.x + 40
		this.B = this.y + 37
		this.L = this.x + 6

		// 验证是否撞地
		if (this.B > game.canvas.height * 0.8) {
			clearInterval(game.timer)
		}
		game.fno % 5 == 0 && this.wing ++
		if (this.wing > 2) {
			this.wing = 0
		}

		// 掉落算法
		if (!this.boom) {
			this.y += this.fno * 0.3
		} else { // 上升算法 上升到一定高度的时候
			this.y -= (20 - this.fno) * 0.3
			if (this.fno > 20) {
				this.boom = false
			}
		}
		this.d += 0.04
		this.fno ++
	}
	Bird.prototype.render = function () {
		game.ctx.save()
		game.ctx.translate(this.x + 24, this.y + 24)
		game.ctx.rotate(this.d)
		game.ctx.drawImage(this.imageArr[this.wing], -24, -24)
		game.ctx.restore()
	}

	Bird.prototype.fly = function () {
		this.boom = true
		this.d = -0.6
		this.fno = 0
	}
})()