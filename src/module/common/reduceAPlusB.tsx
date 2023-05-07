/**
 * 배열의 요소를 누적하여 더하는 함수입니다.
 * @param {any[]} array - 더할 요소들이 포함된 배열
 * @returns {any} 요소를 누적하여 더한 결과
 */
export const reduceAPlusB = (array: any[]) => {
  return array.reduce((a: number, b: number) => a + b, 0);
};
