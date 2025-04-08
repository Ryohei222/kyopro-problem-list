import { z } from "zod";

const YukicoderGetUserInfoAPISchema = z.object({
    Id: z.number(),
    Name: z.string(),
    Solved: z.number(),
    Level: z.number(),
    LevelFloat: z.number(),
    Rank: z.number(),
    Score: z.number(),
    Points: z.number(),
    AtCoderId: z.string(),
    CodeforcesId: z.string(),
    Notice: z.string(),
});

const API_URL = "https://yukicoder.me/api/v1/user/name";
const YUKICODER_USER_URL = "https://yukicoder.me/users";

export async function fetchYukicoderUserUrl(userName: string): Promise<string> {
    if (!userName) {
        return "";
    }
    const result = await fetch(`${API_URL}/${userName}`)
        .then((res) => res.json())
        .then(YukicoderGetUserInfoAPISchema.safeParse);
    if (!result.success) {
        return "";
    }
    return `${YUKICODER_USER_URL}/${result.data.Id}`;
}
