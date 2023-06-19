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
exports.userHandler = void 0;
const user_service_1 = require("./user.service");
class UserHandler {
    getRouter(router) {
        router.post('/register', this.register);
        router.delete('/delete', this.delete);
        return router;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield user_service_1.userService.register(req.body.data));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield user_service_1.userService.delete(req.body.data));
        });
    }
}
exports.userHandler = new UserHandler();
//# sourceMappingURL=user.handler.js.map