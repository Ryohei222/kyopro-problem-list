import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Link({ url, text }: { url: string; text: string }) {
	return (
		<a
			href={url}
			className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
		>
			{text}
		</a>
	);
}

function Header2({ text }: { text: string }) {
	return (
		<h2 className="mt-8 mb-4 scroll-m-20 border-b pb-1 text-2xl font-semibold tracking-tight transition-colors first:mt-0 text-gray-800 dark:text-gray-200">
			{text}
		</h2>
	);
}

function ContestLink(url: string, text: string, note?: string) {
	return (
		<>
			<Link url={url} text={text} />
			{note && <span className="text-gray-500 ml-2">({note})</span>}
		</>
	);
}

export default function AboutPage() {
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
	const apiReferences = [
		{
			name: "AtCoder Problems",
			url: "https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md",
		},
		{
			name: "Aizu Online Judge API",
			url: "http://developers.u-aizu.ac.jp/index",
		},
		{
			name: "Codeforces API",
			url: "https://codeforces.com/apiHelp",
		},
		{
			name: "MOFE",
			url: "https://mofecoder.com/",
		},
		{
			name: "yukicoder API",
			url: "https://petstore.swagger.io/?url=https://yukicoder.me/api/swagger.yaml",
		},
	];
	return (
		<div className="container max-w-4xl mx-auto px-4 py-8">
			<Card>
				<CardHeader>
					<CardTitle>
						<h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
							About
						</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Header2 text="このサイトについて" />
					<p>
						Kyopro Problem Lists
						は、競技プログラミングのオンラインジャッジに存在する問題から問題リストを作成・共有できるサービスです。
						<br />
						現在は以下のオンラインジャッジに対応しています。
					</p>
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
						{onlineJudeges.map((oj) => (
							<li key={oj.name}>{ContestLink(oj.url, oj.name, oj.note)}</li>
						))}
					</ul>
					<div>
						<Header2 text="使用例" />
						<ul className="mb-6 list-disc ml-6 space-y-2">
							<li>
								特定のアルゴリズムやデータ構造、テクニックで解ける問題をまとめたリスト
							</li>
							<li> 教育的な問題をまとめたリスト </li>
							<li> 自分が作問した問題をまとめたリスト </li>
							<li> 自分が好きな問題をまとめたリスト </li>
						</ul>
					</div>
					<div>
						<Header2 text="問題リストの作成" />
						<p className="mb-6">
							問題リストを作成するためには、GitHub
							アカウントでユーザー登録を行う必要があります。
							<br />
							登録している場合、ツールバーにある「新規作成」ボタンをクリックすることで、問題リストを作成できます。
						</p>
					</div>
					<div>
						<Header2 text="連絡先" />
						<p className="mb-6">
							質問やバグ報告・要望などはお気軽に作者の X (
							<Link url="https://x.com/6Lgug" text="@6Lgug" />) や{" "}
							<Link
								url="https://github.com/Ryohei222/kyopro-problem-list/issues"
								text="GitHub Issues"
							/>{" "}
							までご連絡ください。
						</p>
					</div>
					<div>
						<Header2 text="Special Thanks" />
						<p className="mb-6">
							このWebアプリは、次のサービスを使用しています。ありがとうございます。
						</p>
						<ul className="mb-6 list-disc ml-6 space-y-2">
							{apiReferences.map((ref) => (
								<li key={ref.name}>
									<Link url={ref.url} text={ref.name} />
								</li>
							))}
						</ul>
						<p>
							また、開発にあたってアドバイスをくださった皆さまに感謝いたします。
						</p>
					</div>
					<Header2 text="プライバシー・アクセス解析について" />
					<p>
						このWebアプリでは、サービス改善のため Google Analytics
						を利用しています。 Google Analytics はトラフィックデータ収集のために
						Cookie を使用する場合があります。
						収集されるデータは匿名であり、個人を特定するものではありません。
						<br />
						詳細は Google の{" "}
						<Link
							url="https://policies.google.com/technologies/partner-sites?hl=ja"
							text="ポリシー"
						/>{" "}
						をご参照ください。
					</p>
					<Header2 text="ライセンス表記" />
					<p>
						<Link
							url="https://github.com/Ryohei222/kyopro-problem-list/blob/main/oss-attribution/attribution.txt"
							text="https://github.com/Ryohei222/kyopro-problem-list/blob/main/oss-attribution/attribution.txt"
						/>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
