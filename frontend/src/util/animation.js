import {TimelineLite} from "gsap/TweenMax";

function battleAnimation () {
  const tl = new TimelineLite();
  tl.add('title');
  tl.to('#vsText', .2, {
    opacity: 0
  })
  tl.to('#vsText', .2, {
    opacity: 1
  })
  tl.to('#vsText', .2, {
    opacity: 0
  })
  tl.to('#vsText', .2, {
    opacity: 1
  })
  tl.to('#vsText', .2, {
    opacity: 0
  })
  tl.to('#vsText', .2, {
    opacity: 1
  })
  tl.to('#vsText', 2, {
    scaleX: 5, 
    scaleY: 5, 
    opacity: 0
  });
  tl.set('#fightText', {
    opacity:1
  })
  tl.to('#fightText', 2, {
    scaleX: 5,
    scaleY:5, 
    opacity: 0
  })
  tl.add('robotsMove');
  tl.to("#robot1", 1.4, {
    x: 420
  }, 'robotsMove');
  tl.to("#robot2", 1.4, {
    x: -365
  },'robotsMove');
  tl.to('#cloud',.8, {
    opacity: 1,
    scaleX: 1.4,
    scaleY: 1.4,
  }, '-=.8');
  tl.to('#robot1, #robot2', 0.5, {
    opacity: 0,
  });
  tl.to('#cloud',1.3, {
    opacity: 1,
    x: Math.random() * 400,
    y: -Math.random() * 400,
  });
  tl.to('#cloud',1.3, {
    opacity: 1,
    x: -Math.random() * 400,
    y: -Math.random() * 200,
  });
  tl.to('#cloud',1.3, {
    opacity: 1,
    x: Math.random() * 400,
    y: -Math.random() * 600,
  });
  tl.to('#cloud',1.3, {
    opacity: 1,
    x: - Math.random() * 400,
    y: -Math.random() * 200,
  });
  tl.to('#cloud',1.3, {
    opacity: 1,
    x: 0,
    y: 0,
  });
  tl.add('battleOver')
  tl.to('#winner', 1.3, {
    opacity: 1,
    x: -80
  }, 'battleOver');
  tl.to('#cloud', 1.3, {
    opacity: 0
  }, 'battleOver')
  tl.to('#ash', 1.3, {
    opacity: 1,
  }, 'battleOver')
  tl.to('#Winner', 1.5, {
    opacity: 1,
    scale: (1, 1)
  }, 'battleOver');
  tl.to('#buttons', .5, {
    opacity: 1,

  }, 'battleOver')
  return tl
}

export default battleAnimation;