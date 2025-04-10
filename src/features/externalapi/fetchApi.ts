export async function fetchApi<T>(url: string, zodSchema: Zod.Schema<T>): Promise<T> {
    const result = await fetch(url)
        .then((res) => res.json())
        .then(zodSchema.safeParse);
    if (!result.success) {
        throw new Error(`Failed to fetch and parse data.\nPath: ${url}`, result.error);
    }
    return result.data;
}
