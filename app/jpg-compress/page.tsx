import { CompressUi } from "@/feature/compress/component/compress-ui";

export default function JpgCompressPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center text-zinc-900 dark:text-zinc-50 font-sans selection:bg-emerald-500/30 overflow-hidden">
      <main className="relative z-10 flex w-full flex-col items-center justify-start pt-24 pb-12 px-6">
        <CompressUi fileType="jpg" />
      </main>
    </div>
  );
}
