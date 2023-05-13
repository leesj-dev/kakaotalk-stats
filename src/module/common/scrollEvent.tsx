const scrollToEvent = (top: number) => {
  window.scrollTo({
    top: top,
    behavior: "smooth",
  });
};

export default scrollToEvent;
