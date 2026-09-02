import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">getff-docs-smoke</h1>
      <p className="text-fd-muted-foreground">BS0 leg-A static-export smoke target.</p>
      <Link
        href="/docs"
        className="text-fd-primary underline underline-offset-4"
      >
        Open the docs
      </Link>
    </main>
  );
}
