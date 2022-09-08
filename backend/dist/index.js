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
const koa_1 = require("./src/ports/koa");
const koa_router_1 = require("./src/ports/koa-router");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const LISTEN_NOTES_API_KEY = process.env.LISTEN_NOTES_API_KEY;
const LISTEN_NOTES_ENDPOINT = "https://listen-api-test.listennotes.com/api/v2";
const ASSEMBLYAI_ENDPOINT = "https://api.assemblyai.com/v2";
const HOST = "127.0.0.1";
const PORT = 8080;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const router = (0, koa_router_1.createRouter)();
        (0, koa_1.startHTTP)(PORT, HOST, router);
        // const podcasts = await searchPodcast("women%20in%20tech");
        // const audio = podcasts.results[0].audio;
        // const submission = await queueAudio(audio);
        // const transcript = await fetchTranscript(submission.id);
    });
}
main();
//# sourceMappingURL=index.js.map