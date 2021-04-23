/**
 * 游戏相关配置
 */
/** 游戏背景颜色 */
export const BackgroundColor = '#f3f3f3';
/** 一个屏幕中子弹的数量 */
export const BulletCount = 30;
/** 一个屏幕中矩形的数量 */
export const RectangleCount = 1;
/** 一个屏幕中星星的数量 */
export const StarsCount = 1;
/** 矩形无敌时间 */
export const RectangleInvincibleTime = 3;
/** 分数文本样式 */
export const CountFont = '50px Georgia';
/** 虚拟摇杆距离屏幕的距离 */
export const JoystickOffset = 50;
/** 虚拟摇杆的半径 */
export const JoystickRadius = 120;
/** 虚拟摇杆的背景颜色 */
export const JoystickBgcColor = 'rgba(0, 0, 0, .16)';
/** 虚拟摇杆的摇杆的颜色 */
export const JoystickInnerColor = 'rgba(0, 0, 0, .5)';
/** 虚拟摇杆的摇杆的半径 */
export const JoystickInnerRadius = 40;

/**
 * 子弹相关配置
 * */
/** 生成的子弹半径范围 */
export const BulletRadiusRange = [8, 16];
/** 生成的子弹颜色列表 */
export const BulletColorList = ['#3da8f5', '#d71345', '#ffaf38', '#f7acbc', '#7b5d5f', '#f47920', '#f05b72'];
/** 生成的子弹速度范围 */
export const BulletSpeedRange = [1, 3];
/** 子弹射击偏离范围 */
export const BulletOffset = 500;

/**
 * 矩形相关配置
 * */
/** 生成的矩形半径范围 */
export const RectangleRadiusRange = [20, 36];
/** 生成的矩形颜色列表 */
export const RectangleColor = '#000';
/** 生成的矩形速度范围 */
export const RectangleSpeedRange = [1, 3];
/** 矩形射击偏离范围 */
export const RectangleOffset = 400;
/** 矩形大小*/
export const RectangleSize = 30;

/**
 * 星星相关配置
 */
/** 生成的矩形半径范围 */
export const starsRadiusRange = [20, 36];
/** 生成的星星颜色列表 */
export const starsColor = '#BA55D3';
/** 生成的星星速度范围 */
export const starsSpeedRange = [1, 3];
/** 星星射击偏离范围 */
export const starsOffset = 200;
/** 星星大小*/
export const starsSize = 20;

/**
 * 玩家相关配置
 */
/** 玩家颜色 */
export const PlayerColor = '#232323';
/** 玩家三角形的高 */
export const PlayerHeight = 30;
/** 玩家每次移动的距离 */
export const PlayerStep = 5;