"use client"


const LogoAnimation: React.FC = () => {
  // State variables
  // const [isLoading, setIsLoading] = useState(false);
  // const [cursorDown, setCursorDown] = useState(false);
  // const [cursorDeltaY, setCursorDeltaY] = useState(0);

  // // Constants
  // const refreshDragThreshold = 100; // Adjust as needed
  // const refreshGrowMultiplier = 0.5; // Adjust as needed

  // // Event listeners
  // useEffect(() => {
  //   const pageElement = document.querySelector(".page");
  //   const refresherElement = document.querySelector(".refresher");
  //   const logoElement = document.querySelector("#animated-logo");

  //   if (!pageElement || !refresherElement || !logoElement) return;

  //   // Event listener for mouse down or touch start
  //   const onPress = () => {
  //     setCursorDown(true);
  //   };

  //   // Event listener for mouse up or touch end
  //   const onRelease = () => {
  //     setCursorDown(false);
  //     if (cursorDeltaY === refreshDragThreshold) {
  //       startLoading();
  //     }
  //     // Additional logic for resetting animation
  //   };

  //   // Event listener for mouse move or touch move
  //   const onDrag = (e: MouseEvent | TouchEvent) => {
  //     // Handle cursor drag and animation
  //   };

  //   // Add event listeners
  //   pageElement.addEventListener("mousedown", onPress);
  //   pageElement.addEventListener("touchstart", onPress);
  //   pageElement.addEventListener("mouseup", onRelease);
  //   pageElement.addEventListener("touchend", onRelease);
  //   pageElement.addEventListener("mousemove", (e) => onDrag(e as MouseEvent)); // Explicitly specify MouseEvent type
  //   pageElement.addEventListener("touchmove", (e) => onDrag(e as TouchEvent)); // Explicitly specify TouchEvent type

  //   // Cleanup event listeners
  //   return () => {
  //     pageElement.removeEventListener("mousedown", onPress);
  //     pageElement.removeEventListener("touchstart", onPress);
  //     pageElement.removeEventListener("mouseup", onRelease);
  //     pageElement.removeEventListener("touchend", onRelease);
  //     pageElement.removeEventListener("mousemove", (e) => onDrag(e as MouseEvent)); // Explicitly specify MouseEvent type
  //     pageElement.removeEventListener("touchmove", (e) => onDrag(e as TouchEvent)); // Explicitly specify TouchEvent type
  //   };
  // }, [cursorDeltaY]);

  // // Animation functions
  // const startLoading = () => {
  //   // Implement your loading animation logic here
  //   setIsLoading(true);
  // };

  // Add additional animation functions as needed

  return (
    <div className="refresher">
      <div className="logoWrapper">
          <div className="logo">
            <div id="animated-logo">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="animated-logo-base" d="M15.5412 3.75C10.0779 9.97529 7.5301 15.1319 7.83728 20.3404C8.11277 25.0118 10.6937 29.9251 15.5524 36.2481L18 34" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path className="animated-logo-base" d="M7.90894 20.0538H11.098" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" d="M15.5771 3.75L18.0854 5.82828" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" d="M19.8769 7.26154C10.9275 16.5834 11.0586 22.1949 19.8769 32.8459" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" d="M23.0302 10.4148C15.5371 17.9429 15.6436 22.3861 23.0302 29.6926" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" d="M17.5479 20.0538H21.7761" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" d="M26.1835 13.5681C20.9594 18.1875 21.0669 21.5375 26.1835 26.5394" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" fill-rule="evenodd" clip-rule="evenodd" d="M28.6408 17.4219C30.0921 17.4219 31.25 18.6093 31.25 20.0513C31.25 21.5084 30.1072 22.7344 28.6408 22.7344C27.1701 22.7344 26.0156 21.5127 26.0156 20.0513C26.0156 18.6049 27.1851 17.4219 28.6408 17.4219Z" stroke="white" stroke-width="2"/>

                <path className="animated-logo-runner" d="M15.5412 3.75C10.0779 9.97529 7.5301 15.1319 7.83728 20.3404C8.11277 25.0118 10.6937 29.9251 15.5524 36.2481L18 34" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path className="animated-logo-runner" d="M7.90894 20.0538H11.098" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" d="M15.5771 3.75L18.0854 5.82828" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" d="M19.8769 7.26154C10.9275 16.5834 11.0586 22.1949 19.8769 32.8459" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" d="M23.0302 10.4148C15.5371 17.9429 15.6436 22.3861 23.0302 29.6926" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" d="M17.5479 20.0538H21.7761" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" d="M26.1835 13.5681C20.9594 18.1875 21.0669 21.5375 26.1835 26.5394" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" fill-rule="evenodd" clip-rule="evenodd" d="M28.6408 17.4219C30.0921 17.4219 31.25 18.6093 31.25 20.0513C31.25 21.5084 30.1072 22.7344 28.6408 22.7344C27.1701 22.7344 26.0156 21.5127 26.0156 20.0513C26.0156 18.6049 27.1851 17.4219 28.6408 17.4219Z" stroke="white" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>
    </div>
  );
};

export default LogoAnimation;
