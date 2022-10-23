import { useEffect, useState } from "react";
import styles from "./index.module.scss";

const MAX_SCROLL_HEIGHT = 800;

const Top = () => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="5570"
    width="200"
    height="200"
  >
    <path
      d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m5.333333 232.085334L322.752 576l45.248 45.248 149.333333-149.333333 149.333334 149.333333L711.914667 576l-194.581334-194.581333z"
      p-id="5571"
      fill="#3b3b3b"
    ></path>
  </svg>
);
export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  const onPageScroll = () => {
    // 先不用防抖了
    if (window.document.documentElement.scrollTop > MAX_SCROLL_HEIGHT)
      setShow(true);
    else setShow(false);
  };

  const toTop = () => {
    // 开始时间
    const beginTime = Date.now();
    // 初始位置
    const beginValue = document.documentElement.scrollTop;
    const cubic = (value: number) => Math.pow(value, 3);

    const easeInOutCubic = (value: number) =>
      value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
    const rAF =
      window.requestAnimationFrame || ((func) => setTimeout(func, 16));
    const frameFunc = () => {
      // 进度，500ms 内将页面滚动到顶部
      const progress = (Date.now() - beginTime) / 500;
      if (progress < 1) {
        // 根据进度修改 scrollTop 的值
        document.documentElement.scrollTop =
          beginValue * (1 - easeInOutCubic(progress));
        rAF(frameFunc);
      } else {
        document.documentElement.scrollTop = 0;
      }
    };
    rAF(frameFunc);
  };

  useEffect(() => {
    window.document.addEventListener("scroll", onPageScroll);
    return () => window.document.removeEventListener("scroll", onPageScroll);
  }, []);

  if (!show) return null;
  return (
    <div className={styles.scrollToTop} onClick={toTop}>
      <Top />
    </div>
  );
}
