//後から追加
import z from "zod";

const unwrap = <T>(arg: T | null | undefined): T => {
    if (arg == null) {
        throw new Error("ops");
    }
    return arg;
};

const inboudReqScm = z.object({
    aaa: z.string().optional(),
});

type inboudReq = z.infer<typeof inboudReqScm>;

const outboundReqScm = z.object({
    aaa: z.string(),
});
type outboundReq = z.infer<typeof outboundReqScm>;

const irawReq1: inboudReq = {};
const irawReq2: inboudReq = { aaa: undefined };
const irawReq3: inboudReq = { aaa: "value!" };

const ivalidReq1: inboudReq = inboudReqScm.parse(irawReq1);
console.log("irawReq1 parsed");
const ivalidReq2: inboudReq = inboudReqScm.parse(irawReq2);
console.log("irawReq1 parsed");
const ivalidReq3: inboudReq = inboudReqScm.parse(irawReq3);
console.log("irawReq1 parsed");

class builder {
    constructor() {}
    bulid(inreq: inboudReq): outboundReq {
        const rtn: outboundReq = {
            aaa: this.getAaa(inreq),
        };
        return rtn;
    }
    getAaa(arg: inboudReq): string {
        return unwrap(arg.aaa);
    }
}

const oReq1 = new builder().bulid(ivalidReq1);
console.log(oReq1);
const oReq2 = new builder().bulid(ivalidReq2);
console.log(oReq2);
const oReq3 = new builder().bulid(ivalidReq3);
console.log(oReq3);
