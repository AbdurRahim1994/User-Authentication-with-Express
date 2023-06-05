const { ComparePassword, HashingPassword } = require('../utility/PasswordUtility')
const UserUpdatePasswordWithLoginService = async (request, userModel) => {
    try {
        const { email } = request.headers;
        const { oldPassword, newPassword } = request.body;

        const userExists = await userModel.aggregate([
            { $match: { email: email } }
        ])

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

        const matchPassword = await ComparePassword(oldPassword, userExists[0]['password'])
        if (!matchPassword) {
            return { status: "Invalid password provided" }
        }
        else if (!passwordRegex.test(newPassword)) {
            return { status: "Password must be at least 8 characters including 1 uppercase, 1 lowercase, 1 number" }
        }
        else {
            const hashPassword = await HashingPassword(newPassword);
            const updatedPassword = await userModel.updateOne({ email: email }, { password: hashPassword })
            return { status: "success", data: updatedPassword }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserUpdatePasswordWithLoginService