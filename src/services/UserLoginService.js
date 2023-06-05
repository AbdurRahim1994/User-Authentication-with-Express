const CreateToken = require('../utility/TokenUtility')
const { ComparePassword } = require('../utility/PasswordUtility')

const UserLoginService = async (request, userModel) => {
    try {
        const { email, password } = request.body;

        const emailExists = await userModel.aggregate([
            { $match: { email: email } },
            { $project: { _id: 1, name: 1, email: 1, password: 1 } }
        ])

        if (emailExists.length <= 0) {
            return { status: "Invalid username / password" }
        }

        const matchPassword = await ComparePassword(password, emailExists[0]['password'])

        if (!matchPassword) {
            return { status: "Invalid username / password" }
        }
        else {
            const token = await CreateToken(emailExists[0]['email']);
            return { status: "success", token: token, data: emailExists[0] }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserLoginService;