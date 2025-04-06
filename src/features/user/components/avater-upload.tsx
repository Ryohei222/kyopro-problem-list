"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

type AvatarUploadProps = {
    currentAvatar: string | null;
    onAvatarChange: (url: string) => void;
};

export function AvatarUpload({ currentAvatar, onAvatarChange }: AvatarUploadProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // ファイルサイズチェック（2MB以下）
        if (file.size > 2 * 1024 * 1024) {
            alert("ファイルサイズは2MB以下にしてください");
            return;
        }

        // 画像ファイル形式チェック
        if (!file.type.match(/^image\/(jpeg|png|gif)$/)) {
            alert("JPG、PNG、GIF形式の画像ファイルを選択してください");
            return;
        }

        // プレビュー用のURLを作成
        const reader = new FileReader();
        reader.onload = (event) => {
            const url = event.target?.result as string;
            setPreviewUrl(url);
            onAvatarChange(url);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveAvatar = () => {
        setPreviewUrl(null);
        onAvatarChange("/placeholder.svg?height=200&width=200"); // デフォルトアバターに戻す
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <Image
                        src={previewUrl || "/placeholder.svg?height=200&width=200"}
                        alt="プロフィール画像"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                    />
                </div>

                {previewUrl && (
                    <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                        aria-label="画像を削除"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
            />

            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleButtonClick}
                className="flex items-center gap-1"
            >
                <Upload className="h-4 w-4" />
                画像をアップロード
            </Button>
        </div>
    );
}
