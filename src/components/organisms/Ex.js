/* Credit and Tnanks: 
   SliderJS: Traversy Media,
   Photos: Unsplash,
   Fonts: GoogleFonts,
   DesignCSS: Sara Mazal Web */

   const upBtn = document.querySelector(".up-button");
   const downBtn = document.querySelector(".down-button");
   const sidebar = document.querySelector(".sidebar");
   const container = document.querySelector(".container");
   const mainSlide = document.querySelector(".main-slide");
   const slideCount = mainSlide.querySelectorAll("div").length;
   
   let activeSlideIndex = 0;
   
   sidebar.style.top = `-${(slideCount - 1) * 100}vh`;
   
   upBtn.addEventListener("click", () => {
     changeSlide("up");
   });
   
   downBtn.addEventListener("click", () => {
     changeSlide("down");
   });
   
   function changeSlide(direction) {
     if (direction === "up") {
       activeSlideIndex++;
       if (activeSlideIndex === slideCount) {
         activeSlideIndex = 0;
       }
     } else if (direction === "down") {
       activeSlideIndex--;
       if (activeSlideIndex < 0) {
         activeSlideIndex = slideCount - 1;
       }
     }
     const height = container.clientHeight;
   
     mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
   
     sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
   }
   /* Credit and Tnanks: 
      SliderJS: Traversy Media,
      Fonts: GoogleFonts,
      Photos: Unsplash,
      DesignCSS: Sara Mazal Web */
      .container
      .sidebar
        div(
          style="background-image: linear-gradient(235deg, #97abff 10%, #5f5987 100%)"
        )
          h1 VR WORLDs
          p awesome. love. creative.
        div(
          style="background-image: linear-gradient(135deg, #3b2667 10%, #bc78ec 100%)"
        )
          h1 Magic Trees
          p awesome. love. creative.
        div(
          style="background: linear-gradient(221.87deg, #c247b2 1%, #00a3dd 100%)"
        )
          h1 Cyber Unicorns
          p awesome. love. creative.
        div(
          style="background-image: linear-gradient(235deg, #52e5e7 10%, #130cb7 100%)"
        )
          h1 It&apos;s a FUTURE
          p awesome. love. creative.
      .main-slide
        div(
          style="\
                                      background-image: url('https://images.unsplash.com/photo-1580428180098-24b353d7e9d9?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMzUwODg5MA&ixlib=rb-1.2.1&q=85');\
                                      "
        )
        div(
          style="\
                                      background-image: url('https://images.unsplash.com/photo-1534823983341-d4e6e4aa046c?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMzUxMTc4Nw&ixlib=rb-1.2.1&q=85');"
        )
        div(
          style="background-image: url('https://images.unsplash.com/photo-1516496636080-14fb876e029d?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMzUxMjgzOA&ixlib=rb-1.2.1&q=85')"
        )
        div(
          style="\
                                      background-image: url('https://images.unsplash.com/photo-1593508512255-86ab42a8e620?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMzUxMzc3OA&ixlib=rb-1.2.1&q=85');"
        )
      .controls
        button.down-button
          i.fas.fa-arrow-down
        button.up-button
          i.fas.fa-arrow-up
    


          @import url("https://fonts.googleapis.com/css2?family=Lato&family=Poppins:wght@100;200;300;500;700;900&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 16px;
}

body {
  font-family: "Lato", sans-serif;
  height: 100vh;
}

.container {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

.sidebar {
  height: 100%;
  width: 35%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.5s ease-in-out;
}

.sidebar > div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.sidebar h1 {
  font-family: "Poppins", sans-serif;
  font-weight: 900;
  font-size: 34px;
  margin-bottom: 10px;
  margin-top: -30px;
  padding: 20px;
  text-align: center;
}

.main-slide {
  height: 100%;
  position: absolute;
  top: 0;
  left: 35%;
  width: 65%;
  transition: transform 0.5s ease-in-out;
}

.main-slide > div {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100%;
  width: 100%;
}

button {
  background-color: #fff;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 16px;
  padding: 15px;
}

button:hover {
  color: #222;
}

button:focus {
  outline: none;
}

.container .controls button {
  position: absolute;
  left: 35%;
  top: 50%;
  z-index: 100;
}

.container .controls .down-button {
  transform: translateX(-100%);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.container .controls .up-button {
  transform: translateY(-100%);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
