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
exports.userService = void 0;
const response_1 = require("../utils/response");
const huelgo_monad_1 = require("huelgo-monad");
const user_repository_1 = require("./user.repository");
class UserService {
    register(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = userDto;
            const validChecks = yield Promise.all([this.isValidUserProperty('email', email), this.isValidUserProperty('name', name)]);
            // not matched
            if (validChecks.some((it) => !it)) {
                return (0, response_1.expressResponse)({
                    status: 202,
                    msg: 'Not Matched name or email',
                    data: {
                        name,
                        email,
                    },
                });
            }
            // regiser user info
            const isUpdate = yield user_repository_1.userRepository.update(userDto);
            if ((0, huelgo_monad_1.isFail)(isUpdate)) {
                return (0, response_1.expressResponse)({
                    status: 400,
                    msg: 'not register user',
                    data: {
                        user: userDto,
                        reason: isUpdate.value,
                    },
                });
            }
            return (0, response_1.expressResponse)({
                status: 200,
                msg: 'done',
            });
        });
    }
    delete({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpdate = yield user_repository_1.userRepository.delete('id', id);
            if ((0, huelgo_monad_1.isFail)(isUpdate)) {
                return (0, response_1.expressResponse)({
                    status: 400,
                    msg: 'not delete user',
                    data: {
                        user_id: id,
                        reason: isUpdate.value,
                    },
                });
            }
            return (0, response_1.expressResponse)({
                status: 200,
                msg: 'delete user',
            });
        });
    }
    isValidUserProperty(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield user_repository_1.userRepository.retrieveWhere(key, value);
            if (!property.value || property.value.length === 0) {
                return true;
            }
            return false;
        });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map