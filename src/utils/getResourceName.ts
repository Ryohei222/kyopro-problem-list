import { Resource } from "@prisma/client";

export default function getResourceName(resource: Resource): string {
    switch (resource) {
        case Resource.ATCODER:
            return "AtCoder";
        case Resource.CODEFORCES:
            return "Codeforces";
        case Resource.YUKICODER:
            return "yukicoder";
        case Resource.AOJ:
            return "AOJ";
        case Resource.MOFE:
            return "MOFE";
    }
}
