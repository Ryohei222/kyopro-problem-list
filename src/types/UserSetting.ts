import { Code } from "lucide-react";
import { z } from "zod";

const UserSettingSchema = z.object({
    name: z.string().min(1).max(40),
    AtCoderId: z
        .string()
        .min(3)
        .max(16)
        .regex(/^[a-zA-Z0-9_]+$/)
        .optional(),
    CodeforcesId: z
        .string()
        .min(3)
        .max(16)
        .regex(/^[a-zA-Z0-9_]+$/)
        .optional(),
});
