const mongoose = require("mongoose");

const dummySchema = new mongoose.Schema({
  dummy: mongoose.Schema.Types.Mixed,
});

const createDummy = async (req, res) => {
  const Dummy = mongoose.model("Dummy", dummySchema);
  try {
    const dummy = await Dummy.findOne({ __v: 0 });
    res.status(200).json({ dummy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

module.exports = createDummy;
