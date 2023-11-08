const mongoose = require("mongoose");

const autoIncrementSchema = new mongoose.Schema({
  model: String, // Auto-increment를 적용할 대상 컬렉션의 이름
  field: String, // Auto-increment를 적용할 필드의 이름
  count: { type: Number, default: 0 }, // 현재까지 사용된 숫자 카운트
});

// 모델 정의
const Counter = mongoose.model("Counter", autoIncrementSchema);

module.exports = Counter;
