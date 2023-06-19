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
exports.query = void 0;
const Logger_1 = require("../utils/Logger");
const dotenv_1 = __importDefault(require("dotenv"));
const huelgo_monad_1 = require("huelgo-monad");
const lodash_1 = __importDefault(require("lodash"));
const promise_1 = __importDefault(require("mysql2/promise"));
dotenv_1.default.config();
const dbConn = () => __awaiter(void 0, void 0, void 0, function* () {
    return promise_1.default.createPool({
        port: Number(process.env.DB_PORT),
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectTimeout: 5000,
        connectionLimit: 30,
        waitForConnections: true,
    });
});
function query(q, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let co = undefined;
        try {
            co = yield (yield dbConn()).getConnection();
            const [result] = yield co.query(q, params !== null && params !== void 0 ? params : null);
            if (lodash_1.default.isArray(result) && result.length > 0) {
                if (result.length === 1) {
                    const [obj] = result;
                    // model
                    return (0, huelgo_monad_1.passed)([obj]);
                }
            }
            // models
            return (0, huelgo_monad_1.passed)(result);
        }
        catch (e) {
            Logger_1.Logger.error(e);
            return (0, huelgo_monad_1.failed)(undefined);
        }
        finally {
            co === null || co === void 0 ? void 0 : co.release();
        }
    });
}
exports.query = query;
//# sourceMappingURL=db.js.map