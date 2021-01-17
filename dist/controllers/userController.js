"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const userClassValidator_1 = __importDefault(require("../classValidators/userClassValidator"));
const validation_1 = require("../classValidators/validation");
// const User = require('../models/user');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.status(200).json({ users });
    }
    catch (error) {
        console.log("myerror");
        console.log(error);
        res.status(403).json("Fordidden");
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, } = req;
        const user = yield user_1.default.findOne({ _id: id });
        if (!user) {
            res.status(404).json("Id doesn't exist");
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.log("myerror");
        console.log(error);
        res.status(403).json("Fordidden");
    }
});
exports.getUser = getUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = new user_1.default({
            nick: body.nick,
            login: body.login,
            password: body.password,
            role: body.role,
            email: body.email
        });
        const userValidator = new userClassValidator_1.default(user);
        yield validation_1.validateOrRejectExample(userValidator);
        const newUser = yield user.save();
        const allUsers = yield user_1.default.find();
        // res.status(201).json({ message: 'User added', user: newUser, users: allUsers })
        res.status(201).json({ user: newUser });
    }
    catch (error) {
        console.log("myerror");
        console.log(error);
        res.status(403).json("Fordidden");
    }
});
exports.addUser = addUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const userValidator = new userClassValidator_1.default(body);
        yield validation_1.validateOrRejectExample(userValidator);
        const user = yield user_1.default.findOne({ _id: id });
        if (!user) {
            res.status(404).json("Id doesn't exist");
            return;
        }
        const updateUser = yield user_1.default.findByIdAndUpdate({ _id: id }, body);
        //const allUsers = await User.find()
        // res.status(200).json({
        //     message: 'User updated',
        //     user: updateUser,
        //     users: allUsers,
        // })
        res.status(200).json({ user: updateUser });
    }
    catch (error) {
        console.log("myerror");
        console.log(error);
        res.status(403).json("Fordidden");
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id } } = req;
        const user = yield user_1.default.findOne({ _id: id });
        if (!user) {
            res.status(404).json("Id doesn't exist");
            return;
        }
        const deletedUser = yield user_1.default.findByIdAndRemove(
        // req.params.id
        id);
        // const allUsers = await User.find()
        // res.status(200).json({
        //     message: 'User deleted',
        //     user: deletedUser,
        //     users:allUsers,
        // })
        res.status(200).json({ user: deletedUser });
    }
    catch (error) {
        console.log("myerror");
        console.log(error);
        res.status(403).json("Fordidden");
        // throw error
    }
});
exports.deleteUser = deleteUser;
// module.exports.getUsers = getUsers;
// module.exports.addUser = addUser;
// module.exports.updateUser = updateUser;
// module.exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map