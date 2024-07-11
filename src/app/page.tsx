import Footer from "@/components/footer/default-footer";
import TestimonialSection from "@/components/home-section/testimonial.section";
import Navbar from "@/components/navigation/navbar";
import Timeline from "@/components/timeline";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import ContactTerminal from "@/components/ui/contact-terminal";
import IconCloud from "@/components/ui/icon-cloud";
import ParticlesBg from "@/components/ui/particles-bg";
import RevealSection from "@/components/ui/reveal-section";
import Section from "@/components/ui/section";
import WordRotate from "@/components/ui/word-rotate";
import { TECHNICAL_SKILLS } from "@/lib/constants";
import connectMongo from "@/server/db";
import Testimonial, { ITestimonial } from "@/server/db/models/testimonial";
import Image from "next/image";


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

      <section className="relative">
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
              <Button className="md:min-w-48">Get in touch</Button>
              <Button className="md:min-w-48" variant={"secondary"}>
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

      <Section>
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

      <Section>
        <ContactTerminal />
      </Section>

      <Footer />
    </div>
  );
}
