import { z } from "zod";

export const UserFormSchema = z.object({
    name: z
        .string()
        .min(1, { message: "名前は1文字以上である必要があります" })
        .max(50, { message: "名前は50文字以下である必要があります" }),
    bio: z.string().max(500, { message: "自己紹介は500文字以内である必要があります" }),
    aojId: z.union([
        z
            .string()
            .min(3, { message: "AOJ IDは3文字以上である必要があります" })
            .regex(/^[a-zA-Z0-9_]+$/, {
                message: "AOJ IDは半角英数字とアンダースコアのみ使用できます",
            })
            .max(16, { message: "AOJ IDは16文字以内である必要があります" }),
        z.literal(""),
    ]),
    atcoderId: z.union([
        z
            .string()
            .min(3, { message: "AtCoder IDは3文字以上である必要があります" })
            .regex(/^[a-zA-Z0-9_]+$/, {
                message: "AtCoder IDは半角英数字とアンダースコアのみ使用できます",
            })
            .max(16, { message: "AtCoder IDは16文字以内である必要があります" }),
        z.literal(""),
    ]),
    codeforcesId: z.union([
        z
            .string()
            .regex(/^[a-zA-Z0-9_\.-]+$/, {
                message:
                    "Codeforces IDは半角英数字とアンダースコア、ハイフン、ピリオドのみ使用できます",
            })
            .min(3, { message: "Codeforces IDは3文字以上である必要があります" })
            .max(30, { message: "Codeforces IDは30文字以内である必要があります" }),
        z.literal(""),
    ]),
    mofeId: z.union([
        z
            .string()
            .min(3, { message: "MOFE IDは3文字以上である必要があります" })
            .max(16, { message: "MOFE IDは16文字以内である必要があります" }),
        z.literal(""),
    ]),
    yukicoderId: z.union([
        z
            .string()
            .min(3, { message: "yukicoder IDは3文字以上である必要があります" })
            .max(16, { message: "yukicoder IDは16文字以内である必要があります" }),
        z.literal(""),
    ]),
    xId: z.union([
        z
            .string()
            .min(1, { message: "X(Twitter) IDは1文字以上である必要があります" })
            .max(15, { message: "X(Twitter) IDは15文字以内である必要があります" }),
        z.literal(""),
    ]),
    githubId: z.union([
        z
            .string()
            .min(1, { message: "GitHub IDは1文字以上である必要があります" })
            .max(39, { message: "GitHub IDは39文字以内である必要があります" }),
        z.literal(""),
    ]),
    blogURL: z.union([
        z
            .string()
            .url({ message: "URLの形式が正しくありません" })
            .max(200, { message: "URLは200文字以内である必要があります" }),
        z.literal(""),
    ]),
});

export type UserForm = z.infer<typeof UserFormSchema>;
