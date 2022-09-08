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
exports.buildSearchPodcast = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
function buildSearchPodcast(LISTEN_NOTES_ENDPOINT, LISTEN_NOTES_API_KEY) {
    return function searchPodcast(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (LISTEN_NOTES_API_KEY === undefined) {
                throw new Error("ListenNotes API Key missing from .env file");
            }
            const res = yield (0, node_fetch_1.default)(`${LISTEN_NOTES_ENDPOINT}/search?q=${query}&type=podcast`, {
                headers: {
                    "X-ListenAPI-Key": LISTEN_NOTES_API_KEY,
                },
            });
            const podcasts = (yield res.json());
            return podcasts;
        });
    };
}
exports.buildSearchPodcast = buildSearchPodcast;
//# sourceMappingURL=search-podcast.js.map