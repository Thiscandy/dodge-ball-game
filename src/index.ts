import swal from 'sweetalert';

import Game from './game';

const isMobile = !!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));

const game = new Game(
  document.getElementById('app') as HTMLCanvasElement,
  {
    width: isMobile ? document.body.offsetWidth : 375,
    height: isMobile ? document.body.offsetHeight: 667,
    isMobile,
  }
);

game.start();

game.onGameOver = async(count: number) => {
  const alert = async (content: string) => swal(content, {
    buttons: ['不玩了', '再来一把!'],
    closeOnClickOutside: false,
  });
  const TIPS = {
    10: '有点弱诶 🥴',
    20: '还算不错 🤓',
    30: '强啊 🤠',
    100: '你已经超神了！🥳'
  }
  let tipsText = count > 100 ? '你丫的是开挂了吧？' : (()=>{
    for (var prop in TIPS) {
      if(Number(prop)>count) return TIPS[prop];
    }
  })()

  if (await alert(`你坚持了 ${count} 秒，` + tipsText)) game.start();
};