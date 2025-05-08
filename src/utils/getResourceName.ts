import { Resource } from "@/types/Resource";

export default function getResourceName(resource: Resource): string {
	switch (resource) {
		case Resource.AOJ:
			return "Aizu Online Judge";
		case Resource.CODEFORCES:
			return "Codeforces";
		case Resource.YUKICODER:
			return "yukicoder";
		case Resource.MOFE:
			return "MOFE";
		case Resource.ATCODER:
			return "AtCoder";
	}
}
