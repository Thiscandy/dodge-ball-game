import BulletSprite from './sprite/BulletSprite';
import {
  BackgroundColor,
  BulletRadiusRange,
  BulletCount,
  CountFont,
  PlayerHeight,
  RectangleSize,
  RectangleCount,
  StarsCount,
  starsSize,
  RectangleInvincibleTime,
} from './config';
import PlayerSprite from './sprite/PlayreSprite';
import RectangleSprite from './sprite/RectangleSprite';
import StarsSprite from './sprite/StarsSprite';

export default class Game {
  private ctx!: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  /** 游戏是否已开始 */
  private isStart: boolean = false;
  /** 是否无敌 */
  private invincible: boolean = false;
  /** 是否缩小 */
  private small: boolean = false;
  /** 子弹列表 */
  private bullets: BulletSprite[] = [];
  /** 矩形 */
  private Rectangles: RectangleSprite[] = [];
  /** 星星 */
  private Stars: StarsSprite[] = [];
  /** 玩家 */
  private player: PlayerSprite;
  /** 游戏进行的秒数 */
  public second: number = 0;
  /** 是否移动端 */
  public isMobile: boolean;
  /** 游戏结束时回调 */
  onGameOver?: (count: number) => void;

  constructor(
    private canvas: HTMLCanvasElement,
    options: {
      width: number;
      height: number;
      isMobile?: boolean;
    }
  ) {
    this.isMobile = options.isMobile;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width = options.width * dpr;
    this.canvas.height = this.height = options.height * dpr;
    this.canvas.style.width = `${options.width}px`;
    this.canvas.style.height = `${options.height}px`;
    this.ctx = this.canvas.getContext('2d');
  }

  /** 游戏分数 */
  get count() {
    return ~~(this.second / 1000);
  }

  /** 开始游戏 */
  start() {
    if (this.isStart) return;

    // 初始化玩家
    this.player = new PlayerSprite(
      this.ctx,
      this.width / 2,
      this.height / 2,
      this.isMobile ? 'touch' : 'keyboard',
    );

    // 初始化分数
    this.second = 0;

    this.player.startListener();

		const step = () => {
      if (!this.isStart) {
        this.render();
        this.stop();
        this?.onGameOver(this.count);
        return;
      }
      // 记录当前游戏时间
      this.second += 16.67;
			this.render();
      this.update();
			requestAnimationFrame(step);
		};
    this.isStart = true;
		requestAnimationFrame(step);
  }

  /** 结束游戏 */
  stop() {
    this.isStart = false;
    this.invincible = false;
    this.player?.stopListener();
    this.bullets.length = 0;
    this.Rectangles.length = 0;
    this.Stars.length = 0;
  }

  /** 生成一个子弹 */
  addNewBullet() {
    // 生成一个随机的子弹半径
    const r = (Math.random() * (BulletRadiusRange[1] - BulletRadiusRange[0])) + BulletRadiusRange[0];

    // 生成一个随机位置（随机从四个方向进入）
    const { x, y } = [
      { x: Math.random() * this.width, y: -r * 2 },                // 上面
      { x: Math.random() * this.width, y: this.height + (r * 2) }, // 下面
      { x: -r * 2, y: Math.random() * this.height },               // 左边
      { x: this.width + (r * 2), y: Math.random() * this.height }, // 右边
    ][~~(Math.random() * 4)]

    const bullet = new BulletSprite(
      this.ctx,
      x,
      y,
      r,
      this.player,
    )

    this.bullets.push(bullet);
  }

  // 生成一个矩形
  addNewRectangle() {
    // 生成一个随机位置（随机从四个方向进入）
    const { x, y } = [
      { x: Math.random() * this.width, y: 2 },                // 上面
      { x: Math.random() * this.width, y: this.height }, // 下面
      { x: 2, y: Math.random() * this.height },               // 左边
      { x: this.width, y: Math.random() * this.height }, // 右边
    ][~~(Math.random() * 4)]

    const Rectangle = new RectangleSprite(
      this.ctx,
      x,
      y,
      this.player,
    )

    this.Rectangles.push(Rectangle);
  }

  // 生成一个星星
  addNewStars() {
    // 生成一个随机位置（随机从四个方向进入）
    const { x, y } = [
      { x: Math.random() * this.width, y: 2 },                // 上面
      { x: Math.random() * this.width, y: this.height }, // 下面
      { x: 2, y: Math.random() * this.height },               // 左边
      { x: this.width, y: Math.random() * this.height }, // 右边
    ][~~(Math.random() * 4)]

    const Stars = new StarsSprite(
      this.ctx,
      x,
      y,
      this.player,
    )

    this.Stars.push(Stars);
  }

  /** 绘制游戏 */
  render() {
    // 每次绘制前都需要先清空画布
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.renderBackground();
    this.renderCount();
    this.bullets.forEach(bullet => bullet.render());
    this.Rectangles.forEach(Rectangle => Rectangle.render());
    this.Stars.forEach(stars => stars.render());
    this.player.render();
  }

  /** 更新游戏 */
  update() {
    // 更新玩家位置
    this.player.update();

    // 不允许超出游戏屏幕边缘
    const edge = PlayerHeight / 2;
    if (this.player.x < edge) this.player.x = edge;
    if (this.player.y < edge) this.player.y = edge;
    if (this.player.x > this.width - edge) this.player.x = this.width - edge;
    if (this.player.y > this.height - edge) this.player.y = this.height - edge;

    this.Rectangles = this.Rectangles.filter(Rectangle => {
      // 更新矩形位置
      Rectangle.update();

      // 判断矩形是否射中玩家
      if (!this.invincible && this.player.isCrashRectangle(Rectangle)) {
        this.invincible = true;
        setTimeout(()=>{ this.invincible = false }, RectangleInvincibleTime*1000);
        return false;
      }

      // 如果飞出屏幕则将矩形销毁
      return !(
        Rectangle.x < -RectangleSize * 2 ||               // 飞出左边屏幕
        Rectangle.x > this.width + (RectangleSize * 2) || // 飞出右边屏幕
        Rectangle.y < -RectangleSize * 2 ||               // 飞出上边屏幕
        Rectangle.y > this.height + (RectangleSize * 2)   // 飞出下边屏幕
      );
    });

    this.bullets = this.bullets.filter(bullet => {
      // 更新子弹位置
      bullet.update();

      // 判断子弹是否射中玩家
      if (!this.invincible && this.player.isCrash(bullet)) {
        this.isStart = false;
      }

      // 如果飞出屏幕则将子弹销毁
      return !(
        bullet.x < -bullet.r * 2 ||               // 飞出左边屏幕
        bullet.x > this.width + (bullet.r * 2) || // 飞出右边屏幕
        bullet.y < -bullet.r * 2 ||               // 飞出上边屏幕
        bullet.y > this.height + (bullet.r * 2)   // 飞出下边屏幕
      );
    });

    this.Stars = this.Stars.filter(stars=>{
      // 更新星星位置
      stars.update();

      // 判断星星是否射中玩家
      if (!this.invincible && this.player.isCrashStars(stars)) {
        this.player.updateSizeBig();
        return false;
      }

      // 如果飞出屏幕则将星星销毁
      return !(
        stars.x < -starsSize ||               // 飞出左边屏幕
        stars.x > this.width + (starsSize) || // 飞出右边屏幕
        stars.y < -starsSize ||               // 飞出上边屏幕
        stars.y > this.height + (starsSize)   // 飞出下边屏幕
      );
    })

    // 如果屏幕中的子弹数量低于设置的数量，则补全数量
    for (let i = this.bullets.length; i < BulletCount; i++) this.addNewBullet();
    // 矩形可以无视碰撞
    if (!this.invincible) {
      for (let i = this.Rectangles.length; i < RectangleCount; i++) this.addNewRectangle();
    }
    // 星星变小
    if (this.count%6==0 && !this.small) {
      for (let i = this.Stars.length; i < StarsCount; i++) this.addNewStars();
    }
  }

  /** 绘制游戏背景 */
  renderBackground() {
    this.ctx.fillStyle = BackgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** 绘制分数 */
  renderCount() {
    this.ctx.font = CountFont;
    this.ctx.textAlign = 'right';
    this.ctx.fillStyle = '#000';
    this.ctx.fillText(`${this.count}`, this.width - 20, 50);
  }
}
