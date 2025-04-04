import EditProblemSetPage from "@/features/problemset/pages/edit"

export default async function Page({ params }: { params: { id: string } }) {
    return <EditProblemSetPage id={params.id} />
}