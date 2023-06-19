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
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoService = void 0;
const user_repository_1 = require("../users/user.repository");
const response_1 = require("../utils/response");
const huelgo_monad_1 = require("huelgo-monad");
const todo_repository_1 = require("./todo.repository");
class TodoService {
    update({ todo, changes }) {
        return __awaiter(this, void 0, void 0, function* () {
            const changesTodo = Object.assign(Object.assign({}, todo), changes);
            const tryUpdate = yield todo_repository_1.todoRepository.update(changesTodo);
            if ((0, huelgo_monad_1.isFail)(tryUpdate)) {
                return (0, response_1.expressResponse)({
                    status: 202,
                    msg: 'Not Update Todos',
                    data: {
                        changesTodo,
                    },
                });
            }
            return (0, response_1.expressResponse)({
                status: 200,
                msg: 'done',
            });
        });
    }
    read({ id }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const tryUserValid = yield user_repository_1.userRepository.retrieveWhere('id', String(id));
            if ((0, huelgo_monad_1.isFail)(tryUserValid) || tryUserValid.value.length === 0) {
                return (0, response_1.expressResponse)({
                    status: 401,
                    msg: 'Not Access',
                });
            }
            const tryTodo = yield todo_repository_1.todoRepository.retrive('user_id', String(id));
            const todoDict = (_a = tryTodo.value) === null || _a === void 0 ? void 0 : _a.reduce((acc, cur) => {
                if (cur.is_completed && cur.is_deleted) {
                    acc['last_todo'].push(cur);
                }
                else if (cur.is_deleted) {
                    acc['delete_todo'].push(cur);
                }
                else if (cur.is_completed) {
                    acc['is_completed'].push(cur);
                }
                else {
                    acc['live_todo'].push(cur);
                }
                return acc;
            }, {
                live_todo: [],
                complete_todo: [],
                delete_todo: [],
                last_todo: [],
            });
            return (0, response_1.expressResponse)({
                status: 200,
                msg: 'done',
                data: todoDict,
            });
        });
    }
    create({ user, todo }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const existsUser = yield user_repository_1.userRepository.retrieveWhere('id', (_a = user === null || user === void 0 ? void 0 : user.id) !== null && _a !== void 0 ? _a : 'A');
            // not exists user
            if ((0, huelgo_monad_1.isFail)(existsUser) || existsUser.value.length === 0) {
                return (0, response_1.expressResponse)({
                    status: 401,
                    msg: 'Not Access',
                });
            }
            const tryTodo = yield todo_repository_1.todoRepository.create(String(user.id), {
                title: todo.title,
                description: todo.description,
            });
            return (0, huelgo_monad_1.isFail)(tryTodo)
                ? (0, response_1.expressResponse)({
                    status: 202,
                    msg: 'Invalid todos',
                    data: {
                        user,
                        todo,
                    },
                })
                : (0, response_1.expressResponse)({
                    status: 200,
                    msg: 'done',
                });
        });
    }
}
exports.todoService = new TodoService();
//# sourceMappingURL=todo.service.js.map