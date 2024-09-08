import Footer from "@/components/footer/default-footer";
import TestimonialSection from "@/components/home-section/testimonial.section";
import Navbar from "@/components/navigation/navbar";
// import Timeline from "@/components/timeline";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import ContactTerminal from "@/components/ui/contact-terminal";
import IconCloud from "@/components/ui/icon-cloud";
import ParticlesBg from "@/components/ui/particles-bg";
import RevealSection from "@/components/ui/reveal-section";
import Section from "@/components/ui/section";
import { Timeline } from "@/components/ui/timeline";
import WordRotate from "@/components/ui/word-rotate";
import { TECHNICAL_SKILLS } from "@/lib/constants";
import connectMongo from "@/server/db";
import Testimonial from "@/server/db/models/testimonial";
import Image from "next/image";
import { CAREER_EVENTS } from "@/lib/constants";
import Link from "next/link";

export default async function HomePage() {
  await connectMongo();
  const data = await Testimonial.find({ status: "APPROVED" });
  const testimonials = data.map((testimonial) => ({
    ...testimonial.toJSON(),
    _id: testimonial._id.toString(),
  }));
  return (
    <div className="">
      <Navbar />

      <section className="relative" id="hero">
        {/* <ParticlesBg /> */}
        {/* {
          // show only on prod
          process.env.NODE_ENV === "production" && <ParticlesBg />
        } */}
        <ParticlesBg />
        <div className="container relative flex flex-col-reverse items-center justify-between gap-8 py-8 md:my-6 md:flex-row md:py-24 lg:py-32">
          <div className="relative space-y-4 text-center md:text-left">
            <p className="text-md md:text-xl">Hi 👋, I&apos;m</p>
            <p className="bg-gradient-to-r from-sky-500 via-blue-700 to-purple-500 bg-clip-text text-4xl font-bold tracking-widest text-transparent md:text-7xl">
              Ismail AJIZOU
            </p>
            <p className="text-md md:text-xl">
              A passionate software Developer with an interest in
            </p>
            {/* <p className="text-2xl font-semibold">Full Stack Developer</p> */}
            <WordRotate
              className="text-xl font-semibold md:text-2xl"
              words={[
                "Full Stack Development",
                "Frontend Development",
                "Backend Development",
              ]}
            />
            <div className="flex justify-center gap-4 md:justify-start">
              <Link
                href="#contact"
                className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:min-w-48"
              >
                Get in touch
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:min-w-48"
                href="/resume/en.pdf"
                target="_blank"
              >
                Resume
              </Link>
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

      <Section id="about">
        <h2 className="text-center text-2xl font-bold md:text-4xl">About Me</h2>
        <RevealSection
          className="text-center"
          text="Hey there!😊 I'm Ismail Ajizou, a Full Stack Developer hailing from Morocco. My coding journey began at the age of 15, and I've been hooked ever since! With over 5 years of experience, I've mastered JavaScript, React.js, and web development. 💻 My career has taken me to exciting roles, where I've dived deep into several technologies, and enjoyed mentoring some awesome teams. 🚀 I thrive on innovation, collaboration, and the occasional cup of strong Moroccan tea 🍵."
        />
      </Section>
      <Section>
        <h2 className="text-center text-2xl font-bold md:text-4xl">
          My Journey
        </h2>
        <Timeline data={CAREER_EVENTS} />
      </Section>

      <Section>
        <h2 className="text-center text-4xl font-bold">Technical Skills</h2>

        <div>
          {/* {
            // show only on prod
            process.env.NODE_ENV === "production" && ( */}
          <IconCloud iconSlugs={TECHNICAL_SKILLS} />
          {/* )
          } */}
        </div>
      </Section>
      <TestimonialSection testimonials={testimonials} />

      <Section id="contact">
        <ContactTerminal />
      </Section>

      <Footer />
    </div>
  );
}
