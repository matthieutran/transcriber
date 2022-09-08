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
exports.buildFetchTranscriptResult = exports.buildFetchTranscript = exports.buildQueueAudio = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
function buildQueueAudio(ASSEMBLYAI_ENDPOINT, ASSEMBLYAI_API_KEY) {
    return function queueAudio(source) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ASSEMBLYAI_API_KEY === undefined) {
                throw new Error("AssemblyAI API Key missing from .env file");
            }
            const res = yield (0, node_fetch_1.default)(`${ASSEMBLYAI_ENDPOINT}/transcript`, {
                method: "POST",
                headers: {
                    authorization: ASSEMBLYAI_API_KEY,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    audio_url: source,
                }),
            });
            return (yield res.json());
        });
    };
}
exports.buildQueueAudio = buildQueueAudio;
function buildFetchTranscript(ASSEMBLYAI_ENDPOINT, ASSEMBLYAI_API_KEY) {
    return function fetchTranscript(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = "processing";
            let transcript;
            return yield new Promise((resolve) => {
                const intv = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    transcript = yield buildFetchTranscriptResult(ASSEMBLYAI_ENDPOINT, ASSEMBLYAI_API_KEY)(id);
                    status = transcript.status;
                    if (status !== "processing") {
                        clearInterval(intv);
                    }
                    resolve(transcript);
                }), 5000);
            });
        });
    };
}
exports.buildFetchTranscript = buildFetchTranscript;
function buildFetchTranscriptResult(ASSEMBLYAI_ENDPOINT, ASSEMBLYAI_API_KEY) {
    return function fetchTranscriptResult(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ASSEMBLYAI_API_KEY === undefined) {
                throw new Error("AssemblyAI API Key missing from .env file");
            }
            const res = yield (0, node_fetch_1.default)(`${ASSEMBLYAI_ENDPOINT}/transcript/${id}`, {
                headers: {
                    authorization: ASSEMBLYAI_API_KEY,
                    "content-type": "application/json",
                },
            });
            const transcript = (yield res.json());
            return transcript;
        });
    };
}
exports.buildFetchTranscriptResult = buildFetchTranscriptResult;
//# sourceMappingURL=queue-audio.js.map