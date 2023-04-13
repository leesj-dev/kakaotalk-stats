import getKeywordCount from "../module/unit/getKeywordCount";

describe("getKeywordCount", () => {
  it("should return 0 for an empty array", () => {
    const textMessage = [];
    expect(getKeywordCount(textMessage)).toBe(0);
  });

  it("should return the correct count for a non-empty array", () => {
    const textMessage = [{ message: "hello" }, { message: "world" }, { message: "hello" }];
    expect(getKeywordCount(textMessage, "hello")).toBe(2);
  });
});
