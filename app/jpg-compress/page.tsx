import { CompressUi } from "@/feature/compress/component/compress-ui";

export default function JpgCompressPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-emerald-500/30">
      <main className="flex w-full flex-col items-center justify-start pt-24 pb-12 px-6">
        <CompressUi fileType="jpg" />
      </main>
    </div>
  );
}
