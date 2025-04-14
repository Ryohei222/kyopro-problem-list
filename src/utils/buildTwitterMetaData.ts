import type { Twitter } from "next/dist/lib/metadata/types/twitter-types";

type BuildTwitterMetadataProps = {
	title?: string;
	description: string;
};

export default function buildTwitterMetadata(
	props: BuildTwitterMetadataProps,
): Twitter {
	const { title, description } = props;
	const titleWithPrefix = !title
		? "Kyopro Problem List"
		: `${title} | Kyopro Problem List`;
	return {
		card: "summary",
		title: titleWithPrefix,
		description,
	};
}
