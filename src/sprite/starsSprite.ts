import {
    starsColor,
    starsOffset,
    starsSpeedRange,
    starsRadiusRange,
    starsSize
  } from '../config';
  import Sprite from './Sprite';
  
  /** 星星 */
  export default class starsSprite extends Sprite {
    /** 水平速度 */
    vx!: number;
    /** 垂直速度 */
    vy!: number;
  
    constructor(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      /** 攻击目标 */
      target: { x: number, y: number },
    ) {
      super(ctx, x, y);
      this.initBullet(target);
    }
  
    /** 初始化星星 */
    initBullet(target: { x: number, y: number }) {
      // 根据半径得到我们的速度
      const speed = starsSpeedRange[1] - (
        ((starsSize - starsRadiusRange[0]) / (starsRadiusRange[1] - starsRadiusRange[0])) // 子弹半径在半径范围里的比例
        * (starsSpeedRange[1] - starsSpeedRange[0]) // 乘以速度的范围
      );
  
      // 子弹偏差后的结果位置
      const targetX = target.x + ((Math.random() * starsOffset * 2) - starsOffset);
      const targetY = target.y + ((Math.random() * starsOffset * 2) - starsOffset);
  
      // 知道两点就能确定角度了
      const angle = Math.atan2(targetY - this.y, targetX - this.x);

      // 三角函数得到子弹的水平速度和垂直速度了
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
    }
  
    /** 绘制星星 */
    public render() {
      this.ctx.fillStyle = starsColor;
      this.ctx.beginPath();
      for (var i = 0; i < 5; i++) {
        //因为角度是逆时针计算的，而旋转是顺时针旋转，所以是度数是负值。
        this.ctx.lineTo(this.x + Math.cos((18 + 72 * i - 0) / 180 * Math.PI) * starsSize,
                       this.y - Math.sin((18 + 72 * i - 0) / 180* Math.PI)* starsSize);
        this.ctx.lineTo(this.x + Math.cos((54 + 72 * i - 0) / 180 * Math.PI)  * (starsSize/2),
                       this.y - Math.sin((54 + 72 * i - 0) / 180 * Math.PI) * (starsSize/2)); 
      }
      this.ctx.strokeStyle = starsColor;
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();
    }
  
    /** 更新星星位置 */
    public update() {
      this.x += this.vx;
      this.y += this.vy;
    }
  }