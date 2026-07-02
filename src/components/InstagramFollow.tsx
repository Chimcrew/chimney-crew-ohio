import { Instagram, Heart, MessageCircle, ArrowUpRight, BadgeCheck } from "lucide-react";
import p1 from "@/assets/projects/project-01-double-crown.jpg";
import p2 from "@/assets/projects/project-04-cap-install.jpg";
import p3 from "@/assets/projects/project-06-tech-onsite.jpg";
import p4 from "@/assets/projects/project-03-liner-install.jpg";
import p5 from "@/assets/projects/project-05-crown-rebuild.jpg";
import p6 from "@/assets/projects/project-08-cap-finished.jpg";
import logoAsset from "@/assets/chimcrew-logo-transparent-v2.png.asset.json";

const IG_URL = "https://www.instagram.com/chim_crew/";

const posts = [
  { src: p1, caption: "Fresh double-crown rebuild ✅", likes: 214, comments: 18 },
  { src: p2, caption: "New stainless cap install 🔥", likes: 187, comments: 12 },
  { src: p3, caption: "On the roof before sunset", likes: 302, comments: 24 },
  { src: p4, caption: "Full stainless liner drop-in", likes: 176, comments: 9 },
  { src: p5, caption: "Crown poured & sealed", likes: 241, comments: 21 },
  { src: p6, caption: "Another cap. Another happy homeowner.", likes: 268, comments: 15 },
];

export function InstagramFollow() {
  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header — profile card */}
        <div className="mx-auto max-w-3xl">
          <div className="relative rounded-none border-2 border-primary/20 bg-card p-6 shadow-[8px_8px_0_rgba(0,0,0,0.06)] md:p-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
              {/* Avatar with IG gradient ring */}
              <div className="relative shrink-0">
                <div
                  className="grid h-24 w-24 place-items-center rounded-full p-[3px]"
                  style={{
                    background:
                      "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                  }}
                >
                  <div className="grid h-full w-full place-items-center rounded-full bg-background p-[3px]">
                    <img
                      src={logoAsset.url}
                      alt="ChimCrew Instagram avatar"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <span className="font-display text-xl font-bold tracking-tight">@chim_crew</span>
                  <BadgeCheck className="h-5 w-5 fill-primary text-primary-foreground" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Chimney sweeps of Columbus, Cincinnati &amp; Dayton · Behind-the-scenes from every rooftop.
                </p>

                <div className="mt-4 flex items-center justify-center gap-6 text-sm sm:justify-start">
                  <div>
                    <div className="font-display text-lg font-bold text-foreground">18+</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Years</div>
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-foreground">4.9★</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Rated</div>
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-foreground">1000s</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Jobs</div>
                  </div>
                </div>
              </div>

              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-none px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                }}
              >
                <Instagram className="h-4 w-4" />
                Follow
              </a>
            </div>
          </div>
        </div>

        {/* Grid of "posts" */}
        <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
          {posts.map((post, i) => (
            <a
              key={i}
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden border border-border bg-secondary"
              aria-label={`Open Instagram post: ${post.caption}`}
            >
              <img
                src={post.src}
                alt={post.caption}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              {/* Hover overlay — IG-style likes/comments */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 text-white opacity-0 transition group-hover:opacity-100">
                <div className="flex items-center gap-5 text-sm font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <Heart className="h-5 w-5 fill-white" />
                    {post.likes}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MessageCircle className="h-5 w-5 fill-white text-black" />
                    {post.comments}
                  </span>
                </div>
                <span className="max-w-[85%] text-center text-xs text-white/90">
                  {post.caption}
                </span>
              </div>
              {/* Corner IG glyph */}
              <div className="pointer-events-none absolute right-2 top-2 grid h-7 w-7 place-items-center bg-black/50 text-white opacity-90">
                <Instagram className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">
            See every job we finish — fresh photos &amp; videos from the roof.
          </p>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-foreground bg-foreground px-6 py-3 text-sm font-semibold uppercase tracking-widest text-background transition hover:bg-background hover:text-foreground"
          >
            Follow @chim_crew on Instagram
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default InstagramFollow;