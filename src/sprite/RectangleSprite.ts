import {
  RectangleColor,
  RectangleOffset,
  RectangleRadiusRange,
  RectangleSpeedRange,
  RectangleSize
} from '../config';
import Sprite from './Sprite';

/** 矩形 */
export default class RectangleSprite extends Sprite {
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

  /** 初始化矩形 */
  initBullet(target: { x: number, y: number }) {
    // 根据半径得到我们的速度
    const speed = RectangleSpeedRange[1] - (
      ((RectangleSize - RectangleRadiusRange[0]) / (RectangleRadiusRange[1] - RectangleRadiusRange[0])) // 子弹半径在半径范围里的比例
      * (RectangleSpeedRange[1] - RectangleSpeedRange[0]) // 乘以速度的范围
    );

    // 子弹偏差后的结果位置
    const targetX = target.x + ((Math.random() * RectangleOffset * 2) - RectangleOffset);
    const targetY = target.y + ((Math.random() * RectangleOffset * 2) - RectangleOffset);

    // 知道两点就能确定角度了
    const angle = Math.atan2(targetY - this.y, targetX - this.x);

    // 三角函数得到子弹的水平速度和垂直速度了
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }

  /** 绘制矩形 */
  public render() {
    this.ctx.fillStyle = RectangleColor;
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, RectangleSize, RectangleSize);
    this.ctx.closePath();
    this.ctx.fill();
  }

  /** 更新矩形位置 */
  public update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}