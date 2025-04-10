"use client";

import { ReactNode, useState } from "react";
import {
    useAtcoderSubmissions,
    useAojSubmissions,
    useYukicoderSubmissions,
    useCodeforcesSubmissions,
} from "@/hooks/useSubmissions";

export default function SubmissionPage(): ReactNode {
    const [service, setService] = useState<"atcoder" | "aoj" | "yukicoder" | "codeforces">(
        "atcoder",
    );
    const [userId, setUserId] = useState("kobaryo222");

    const {
        submissions: atcoderSubmissions,
        trigger: fetchAtCoder,
        isMutating: isAtCoderLoading,
    } = useAtcoderSubmissions(userId);
    const {
        submissions: aojSubmissions,
        trigger: fetchAOJ,
        isMutating: isAOJLoading,
    } = useAojSubmissions(userId);
    const {
        submissions: yukicoderSubmissions,
        trigger: fetchYukicoder,
        isMutating: isYukicoderLoading,
    } = useYukicoderSubmissions(userId);
    const {
        submissions: codeforcesSubmissions,
        trigger: fetchCodeforces,
        isMutating: isCodeforcesLoading,
    } = useCodeforcesSubmissions(userId);

    const isLoading = isAtCoderLoading || isAOJLoading || isYukicoderLoading || isCodeforcesLoading;
    const submissions =
        service === "atcoder"
            ? atcoderSubmissions
            : service === "aoj"
              ? aojSubmissions
              : service === "yukicoder"
                ? yukicoderSubmissions
                : codeforcesSubmissions;

    const fetchSubmissions = () => {
        if (service === "atcoder") fetchAtCoder(userId);
        else if (service === "aoj") fetchAOJ(userId);
        else if (service === "yukicoder") fetchYukicoder(userId);
        else if (service === "codeforces") fetchCodeforces(userId);
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button
                    onClick={fetchSubmissions}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Fetch Submissions
                </button>
            </div>
            <div className="mb-4">
                <button
                    onClick={() => setService("atcoder")}
                    className={`px-4 py-2 mr-2 ${service === "atcoder" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    AtCoder
                </button>
                <button
                    onClick={() => setService("aoj")}
                    className={`px-4 py-2 mr-2 ${service === "aoj" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    AOJ
                </button>
                <button
                    onClick={() => setService("yukicoder")}
                    className={`px-4 py-2 mr-2 ${service === "yukicoder" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    yukicoder
                </button>
                <button
                    onClick={() => setService("codeforces")}
                    className={`px-4 py-2 ${service === "codeforces" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Codeforces
                </button>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : submissions && submissions.length > 0 ? (
                <div>
                    {submissions.map((submission) => (
                        <div key={submission.submissionId} className="border p-4 mb-4">
                            <h2 className="text-xl font-bold">{submission.problemId}</h2>
                            <p>Result: {submission.verdict}</p>
                            <p>Submitted At: {new Date(submission.submittedAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No submissions found.</p>
            )}
        </div>
    );
}
