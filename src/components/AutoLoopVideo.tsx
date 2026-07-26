import chimneySweepVideo from "@/assets/videos/chimney-sweep-action.mp4.asset.json";

export function AutoLoopVideo({ className = "" }: { className?: string }) {
  return (
    <video
      className={className}
      src={chimneySweepVideo.url}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      aria-hidden="true"
    />
  );
}

export function AutoLoopVideoSection() {
  return (
    <section className="bg-background pt-10 md:pt-14">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="overflow-hidden rounded-none border border-border bg-card shadow-[0_20px_60px_-25px_oklch(0_0_0/0.35)]">
          <AutoLoopVideo className="block aspect-video w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
