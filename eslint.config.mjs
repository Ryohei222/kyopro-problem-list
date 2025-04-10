import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: ["next/core-web-vitals", "next", "prettier"],
    }),
    {
        rules: {
            "import/no-restricted-paths": [
                "error",
                {
                    zones: [
                        //profile feature以外でtargetのpathをインポートできないように
                        {
                            from: "./src/features/!(profile)/**/*", // 対象の依存パス
                            target: "./src/features/profile", // 禁止するパス
                            message: "features同士で依存することはできません", // エラーメッセージ
                        },
                        //message feature以外でtargetのpathをインポートできないように
                        {
                            from: "./src/features/!(message)/**/*", // 対象の依存パス
                            target: "./src/features/message", // 禁止するパス
                            message: "features同士で依存することはできません", // エラーメッセージ
                        },
                    ],
                },
            ],
        },
    },
];

export default eslintConfig;
