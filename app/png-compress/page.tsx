import { CompressUi } from "@/feature/compress/component/compress-ui";

export default function CompressPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="pointer-events-none absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-40 dark:opacity-30 blur-[100px]"></div>
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-cyan-500 opacity-40 dark:opacity-30 blur-[120px]"></div>
      <div className="pointer-events-none absolute top-[40%] left-[-10%] -z-10 h-[300px] w-[300px] rounded-full bg-purple-500 opacity-30 dark:opacity-20 blur-[100px]"></div>

      <main className="relative z-10 flex w-full flex-col items-center justify-start pt-24 pb-12 px-6">
        <CompressUi fileType="png" />
      </main>
    </div>
  );
}
