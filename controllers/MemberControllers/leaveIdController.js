const Member = require('../../model/Member');
const path = require('path');
const bcrypt = require('bcryptjs');


const getMethod = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/views', 'leaveId.html'));
}

// body 
const deleteMethod = async (req, res) => {
    const getUserId = req.userId;
    const getPassword = req.body.password;

    // body 비밀번호 유무 체킹
    if (!getPassword) {
        return res.status(400).json({ 'message': 'There is missing data' });
    }

    const foundUser = await Member.findOne({ userId: getUserId }).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }

    // body 비밀번호 체킹
    const match = await bcrypt.compare(getPassword, foundUser.password);
    if (match) {
        //DB 삭제
        const result = await Member.deleteOne({ userId: getUserId });
        console.log(result);
        const responseData = {
            message: 'delete complete',
            redirect: '/'
        }
        res.status(200).json({ responseData });
    }
    else {
        res.sendStatus(401);
    }
}


module.exports = { getMethod, deleteMethod };