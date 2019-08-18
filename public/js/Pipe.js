(function () {
	var Pipe = window.Pipe = function () {
		// 管子图片宽高
		this.w = 52
		this.h = 320
		// 空隙大小
		this.interspace = 200
		//  从右边出现
		this.x = game.canvas.width
		// 上管子 
		this.imagedown = game.R.pipe_down
		// 上管子 Y 坐标随机
		this.downY = Math.random() * (this.h - 100)
		// 上管子实际高度
		this.downH = this.h - this.downY
		// 下管子
		this.imageup = game.R.pipe_up
		// 下管子 Y 坐标 = 上管子实际高度 + 空隙高度
		this.upY = this.downH + this.interspace
		// 大地基准线高度
		this.lineH = game.canvas.height * 0.8
		// 下管子实际高度 = 下管子 Y 坐标 - 下管子 Y 坐标
		this.upH = this.lineH - this.upY
		// 速度
		this.speed = 1
		// 是否得分
		this.scored = false
		// 将自己推入数组
		game.pipeArr.push(this)
	}
	// 更新
	Pipe.prototype.update = function () {
		this.x -= this.speed
		// 碰撞检测，让管子每一帧都检测是否碰撞小鸟
		if (game.bird.R > this.x && game.bird.L < this.x + 52 && (game.bird.T < this.downH || game.bird.B > this.upY)) {
			clearInterval(game.timer)
		}
		// 得分计算
		if (game.bird.R > this.x + 52 && !this.scored) {
			game.score ++
			this.scored = true
		}
		// 管子出了画布，就从数组中删除
		if (this.x < -52) {
			for (var i = 0; i < game.pipeArr.length; i ++) {
				if (game.pipeArr[i] === this) {
					game.pipeArr.splice(i, 1)
				}
			}
		}
	}
	// 渲染
	Pipe.prototype.render = function () {
		// 渲染上管子    
		game.ctx.drawImage(this.imagedown, 0, this.downY, this.w, this.downH, this.x, 0, this.w, this.downH)
		// 渲染下管子
		game.ctx.drawImage(this.imageup, 0, 0, this.w, this.upH, this.x, this.upY, this.w, this.upH)
		// 下管子长度不够时候填充
		if (this.lineH > (this.upY + this.h)) {
			for (var i = 0; i < parseInt(this.lineH - this.upY - this.h) + 1; i ++) {
				game.ctx.drawImage(this.imageup, 0, this.h - 1, this.w, 1, this.x, this.upY + this.h + i, this.w, 1)
			}
		}
	}
})()