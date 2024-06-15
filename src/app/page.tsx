import Navbar from "@/components/navigation/navbar";
import Timeline from "@/components/timeline";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import IconCloud from "@/components/ui/icon-cloud";
import Marquee from "@/components/ui/marquee";
import ParticlesBg from "@/components/ui/particles-bg";
import RevealSection from "@/components/ui/reveal-section";
import TestimonialCard from "@/components/ui/testimonial-card";
import WordRotate from "@/components/ui/word-rotate";
import { TECHNICAL_SKILLS } from "@/lib/constants";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <Navbar />

      <section className="relative">
        <ParticlesBg />
        <div className="container relative my-6 flex flex-col-reverse items-center justify-between gap-8 py-10 md:flex-row md:py-24 lg:py-32">
          <div className="relative space-y-4 text-center md:text-left">
            <p className="text-xl">Hi 👋, I&apos;m</p>
            <p className="bg-gradient-to-r from-sky-500 via-blue-700 to-purple-500 bg-clip-text text-7xl font-bold tracking-widest text-transparent">
              Ismail AJIZOU
            </p>
            <p className="text-lg md:text-xl">
              A passionate software Developer with an interest in
            </p>
            {/* <p className="text-2xl font-semibold">Full Stack Developer</p> */}
            <WordRotate
              className="text-2xl font-semibold"
              words={[
                "Full Stack Development",
                "Frontend Development",
                "Backend Development",
              ]}
            />
            <div className="flex justify-center gap-4 md:justify-start">
              <Button className="min-w-48">Get in touch</Button>
              <Button className="min-w-48" variant={"secondary"}>
                Resume
              </Button>
            </div>
          </div>
          <div className="relative h-60 w-60 overflow-hidden rounded-full md:h-96 md:w-96">
            <BorderBeam borderWidth={3} />

            <Image
              src="/assets/hero.JPG"
              className="h-full w-full object-cover"
              width={500}
              height={500}
              alt="Hero"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container relative my-6 py-10 md:py-24 lg:py-32">
        <h2 className="text-center text-4xl font-bold">About Me</h2>
        <RevealSection
          className="text-center"
          text="Hey there!😊 I'm Ismail Ajizou, a Full Stack Developer hailing from Morocco. My coding journey began at the age of 15, and I've been hooked ever since! With over 5 years of experience, I've mastered JavaScript, React.js, and web development. 💻 My career has taken me to exciting roles, where I've dived deep into several technologies, and enjoyed mentoring some awesome teams. 🚀 I thrive on innovation, collaboration, and the occasional cup of strong Moroccan tea 🍵."
        />
      </section>
      <section className="container relative my-6 py-10 md:py-24 lg:py-32">
        <h2 className="text-center text-4xl font-bold">My Journey</h2>
        <Timeline
          items={[
            {
              title: "Started Coding",
              date: "2015",
              description:
                "I started coding at the age of 15, and I've been hooked ever since!",
            },
            {
              title: "CS Degree",
              date: "2022",
              description:
                "I graduated from the University of Morocco with a degree in Computer Science.",
            },
            {
              title: "Full Stack Developer - Intern",
              date: "2022",
              description:
                "I graduated from high school and started my journey as a developer.",
            },
          ]}
        />
      </section>

      <section className="container relative my-6 py-10 md:py-24 lg:py-32">
        <h2 className="text-center text-4xl font-bold">Technical Skills</h2>

        <div>
          <IconCloud iconSlugs={TECHNICAL_SKILLS} />
        </div>
      </section>
      <section className="container relative my-6 py-10 md:py-24 lg:py-32">
        <h2 className="mb-8 text-center text-4xl font-bold">Testimonials</h2>

        <div className="mb-8">
          <Marquee>
            {Array.from({ length: 10 }).map((_, i) => (
              <TestimonialCard
                key={i}
                name="John Doe"
                title="CEO, Company"
                relation="Client"
                quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
                image="/assets/hero.JPG"
              />
            ))}
          </Marquee>
          <Marquee reverse>
            {Array.from({ length: 10 }).map((_, i) => (
              <TestimonialCard
                key={i}
                name="John Doe"
                title="CEO, Company"
                relation="Client"
                quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
                image="/assets/hero.JPG"
              />
            ))}
          </Marquee>
        </div>
        <div className="flex justify-center">
          <Button>Write Me Something</Button>
        </div>
      </section>
    </div>
  );
}
