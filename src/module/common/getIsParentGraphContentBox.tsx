const getIsParentGraphContentBox = (parentRef: any): boolean => {
  let isParentGraphContentBox =
    parentRef?.current?.current.offsetParent.className.includes("GraphContentBox");

  return isParentGraphContentBox;
};

export default getIsParentGraphContentBox;
