const updateCount = (el) => {
  const target = +el.getAttribute('data-target'); // 目標值
  const duration = 2000; // 動畫持續時間 (2秒)
  const start = 0;
  let startTime = null;

  const animation = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    
    // 使用 Ease Out Expo 讓結尾變慢，看起來更專業
    const easeOutNumber = Math.floor(progress === 1 ? target : target * (1 - Math.pow(2, -10 * progress)));
    
    el.innerText = easeOutNumber;

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

// 偵測滾動到位置才觸發
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      updateCount(entry.target);
      observer.unobserve(entry.target); // 只跑一次動畫
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => observer.observe(counter));