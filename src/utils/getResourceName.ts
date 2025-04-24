import type { Resource } from "@prisma/client";

export default function getResourceName(resource: Resource): string {
	switch (resource) {
		case "ATCODER":
			return "AtCoder";
		case "CODEFORCES":
			return "Codeforces";
		case "YUKICODER":
			return "yukicoder";
		case "AOJ":
			return "AOJ";
		case "MOFE":
			return "MOFE";
	}
}
