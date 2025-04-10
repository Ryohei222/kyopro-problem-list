import { getProblems } from "@/features/externalapi/getProblems";
import { Resource } from "@prisma/client";
// display all problems

export default async function ProblemsPage({ params }: { params: Promise<{ resource: string }> }) {
    const resource = (await params).resource as Resource;
    // check resource is in Resource
    if (!resource) {
        return <div> Set resource in path parameter </div>;
    }
    const problems = await getProblems(resource);

    return (
        <div>
            <h1>Problems</h1>
            <ul>
                {problems.map((problem) => (
                    <li key={`${problem.resource}-${problem.contestId}-${problem.problemId}`}>
                        {problem.name} ({problem.resource}) - {problem.contestId} -{" "}
                        {problem.problemId}
                    </li>
                ))}
            </ul>
        </div>
    );
}
