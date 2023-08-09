const { User } = require("../../models/User");
const { hashPassword } = require("../../module/hashPassword/hashPassword");

const createUser = async (req, res) => {
  console.log(req.path);
  try {
    const { userId, password, nickname } = req.body;
    console.log(`회원가입 시도 - ID: [${userId}] Nickname: [${nickname}]`);

    const foundUserByRequestedUserId = await User.findOne({ userId });
    const foundUserByRequestedNickname = await User.findOne({ nickname });

    // 패스워드에 알 수 없는 문자가 포함된 경우
    const isValidPassword = /^[a-zA-Z가-힣!@#$%^&*()_+|<>?:{}]*.{4,16}$/.test(password);
    if (!isValidPassword) {
      return res.status(400).json({ error: `패스워드에 알 수 없는 문자가 포함되어 있습니다.` });
    }

    // userId의 형식이 올바르지 않은 경우
    const isValidUserId = /^[a-zA-Z0-9]{4,16}$/.test(userId);
    if (!isValidUserId) {
      return res
        .status(400)
        .json({ error: `${userId}' 아이디는 4 ~ 16자의 영문, 숫자 조합으로 입력해야 합니다.` });
    }

    // nickname 형식이 올바르지 않은 경우
    const isValidNickname = /^[가-힣a-zA-Z0-9]{2,10}$/.test(nickname);
    if (!isValidNickname) {
      return res
        .status(400)
        .json({ error: `${nickname}' 닉네임은 2 ~ 10자의 한글, 영문, 숫자 조합으로 입력해야 합니다.` });
    }

    // 이미 존재하는 userId와 nickname인 경우
    if (foundUserByRequestedUserId && foundUserByRequestedNickname) {
      return res.status(409).json({
        status: "409-3",
        error: `'${foundUserByRequestedUserId.userId}' '${foundUserByRequestedNickname.nickname}'는 이미 사용 중입니다.`,
      });
    }

    // 이미 존재하는 userId인 경우
    if (foundUserByRequestedUserId) {
      return res.status(409).json({
        status: "409-1",
        error: "이미 사용중인 아이디입니다",
      });
    }

    // 이미 존재하는 nickname인 경우
    if (foundUserByRequestedNickname) {
      return res.status(409).json({
        status: "409-2",
        error: " 이미 사용중인 닉네임입니다",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUserData = new User({ userId, password: hashedPassword, nickname });
    await newUserData.save();

    // 회원 가입 성공
    console.log(`회원가입 성공 - ID: [${userId}] Nickname: [${nickname}]`);
    res.status(201).json({ message: "회원 가입이 완료되었습니다." });
  } catch (error) {
    // 이외의 예상치 못한 오류
    console.error(error);
    res.status(500).json({ error: "회원 가입 중 오류가 발생했습니다." });
  }
};

module.exports = createUser;
