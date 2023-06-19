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
exports.todoRepository = void 0;
const db_1 = require("../configs/db");
class TodoRepository {
    retriveWhere() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    retrive(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.query)(`
            select 
            *
            from todos
            where ${key} = ?
        `, [value]);
        });
    }
    create(userId, { title, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.query)(`
            insert 
            into todos(user_id, title, description)
            values(?,?,?)
        `, [userId, title, description]);
        });
    }
    /**
     * @todo Refactoring 업데이트 property만 되도록...
     */
    update({ id, title, description, is_completed, is_deleted }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.query)(`
            update todos
            set title = ?, description = ?, is_completed = ?, is_deleted = ? 
            where id = ? 
        `, [title, description, String(is_completed ? 1 : 0), String(is_deleted ? 1 : 0), id]);
        });
    }
}
exports.todoRepository = new TodoRepository();
//# sourceMappingURL=todo.repository.js.map