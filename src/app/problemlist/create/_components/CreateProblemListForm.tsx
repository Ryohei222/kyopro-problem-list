"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createProblemList } from "../../../../features/problemlist/db/createProblemList";
import {
  ProblemListMetadataSchema,
  type ProblemListMetadataSchemaType,
} from "../../../../features/problemlist/types/ProblemListMetadataSchema";

export function CreateProblemListForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: ProblemListMetadataSchemaType = {
    name: "",
    description: "",
    isPublic: true,
  };

  const form = useForm<ProblemListMetadataSchemaType>({
    resolver: zodResolver(ProblemListMetadataSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ProblemListMetadataSchemaType) => {
    console.log("Form submitted:", data);
    setIsSubmitting(true);
    try {
      const response = await createProblemList(data);
      if (response === "format error") {
        return;
      }
      router.push(`/problemlist/show/${response.id}`);
    } catch (error) {
      console.error("エラー:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          新しい問題リストを作成
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 p-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    リスト名
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="例: 初心者向けグラフアルゴリズム集"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    問題リストの内容を簡潔に表す名前をつけてください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">概要</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="この問題リストの内容や目的について説明してください"
                      className="min-h-[120px]"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    問題リストの内容や目的について説明してください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-base font-medium">
                      公開設定
                    </FormLabel>
                    <FormDescription>
                      チェックを入れると、このリストはトップページやあなたのプロフィールに表示されます。
                      <br />
                      チェックを外すと、リンクを知っている人のみが閲覧できるリストになります。
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? "保存中..." : "問題リストを作成"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
