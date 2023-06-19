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
exports.userRepository = void 0;
const db_1 = require("../configs/db");
class UserRepository {
    retrieveWhere(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.query)(`
      select 
      id
      from users
      where ${key} = ?
    `, [value]);
        });
    }
    retrieve(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('must be implentation');
        });
    }
    update({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.query)(`
        insert 
        into users(name, email, password)
        values(?,?,?)
      `, [name, email, password]);
        });
    }
    delete(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.query)(`
        delete 
        from users
        where ${key} = ?
      `, [value]);
        });
    }
}
exports.userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map