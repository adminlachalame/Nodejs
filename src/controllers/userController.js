import userService from "../services/userService";

let handleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs Paramter!'
        })
    }


    let userData = await userService.handleUserLogin(email, password);
    console.log(userData)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}

    })
}
let handleGetAllUsers = async(req, res) => {
    let id = req.query.id; // All, id
    let users = await userService.getAllUsers(id);
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }

    console.log(users)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}
let handleCreateNewUser = async(req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleDeleteUser = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: " missing required parameters !"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
let handleEditUser = async(req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data); // Sửa từ 'editUser' thành 'updateUserData'
    return res.status(200).json(message)
}

let deleteUser = (id) => {
    return new Promise(async())
}
let getAllCode = async(req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        // console.log(data);
        return res.status(200).json(data);
    } catch (e) {
        console.log(`get all code error: `, e)
        return res.status(200).json({
            errCode: -1,
            errMessage: `Error from server!!`
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    deleteUser: deleteUser,
    getAllCode: getAllCode,
}