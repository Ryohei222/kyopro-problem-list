"use client"

type Props = {
    toolbar: React.ReactNode;
    content: React.ReactNode;
};

export function PageLayout({ toolbar, content }: Props) {
    return (
      <div className="min-h-screen bg-gray-50">
            {toolbar}
            <main className="container mx-auto py-6 px-4">
                {content}
            </main>
      </div>
    );
}