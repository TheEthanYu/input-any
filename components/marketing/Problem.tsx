const Arrow = ({ extraStyle }: { extraStyle: string }) => {
  return (
    <svg
      className={`w-12 opacity-50 ${extraStyle}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H20M20 12L14 6M20 12L14 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const Step = ({
  emoji,
  text,
  description,
}: {
  emoji: string
  text: string
  description: string
}) => {
  return (
    <div className="relative group">
      <div className="flex flex-col items-center gap-3 p-5">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </span>
        <div className="text-center">
          <h3 className="font-semibold text-base">{text}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function Problem() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />

      {/* Glow Effect */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1/2 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-3xl"
          aria-hidden="true"
        />
      </div>

      {/* Dot Pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#00000004_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff04_1px,transparent_1px)]"
        style={{ backgroundSize: '40px 40px' }}
      />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            80% of startups fail before launch
          </h2>
          <p className="text-muted-foreground">
            Don&apos;t let technical complexity stop you from shipping
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 max-w-4xl mx-auto">
          <Step
            emoji="🧑‍💻"
            text="Setup Hell"
            description="Stuck on auth & payments"
          />

          <Arrow extraStyle="max-md:rotate-90 text-muted-foreground/30" />

          <Step
            emoji="😮‍💨"
            text="Time Sink"
            description="Lost in technical details"
          />

          <Arrow extraStyle="max-md:rotate-90 text-muted-foreground/30" />

          <Step emoji="😔" text="Give Up" description="Never reach users" />
        </div>
      </div>
    </section>
  )
}
