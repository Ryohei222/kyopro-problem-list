import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ContestLink(url: string, text: string, note?: string) {
	return (
		<>
			<a
				href={url}
				className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
			>
				{text}
			</a>
			{note && <span className="text-gray-500 ml-2">({note})</span>}
		</>
	);
}

export default function HelpPage() {
	const onlineJudeges = [
		{
			name: "Aizu Online Judge",
			url: "https://onlinejudge.u-aizu.ac.jp/",
		},
		{
			name: "AtCoder",
			url: "https://atcoder.jp/",
		},
		{
			name: "Codeforces",
			url: "https://codeforces.com/",
		},
		{
			name: "MOFE",
			url: "https://mofecoder.com/",
			note: "提出取得機能は未実装",
		},
		{
			name: "yukicoder",
			url: "https://yukicoder.me/",
		},
	];
	return (
		<div className="container mx-auto px-4 py-8">
			<Card>
				<CardHeader>
					<CardTitle>
						<h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
							Help (WIP)
						</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					現在は以下のオンラインジャッジに対応しています。
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
						{onlineJudeges.map((oj) => (
							<li key={oj.name}>{ContestLink(oj.url, oj.name, oj.note)}</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
