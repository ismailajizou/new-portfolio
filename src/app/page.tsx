import Navbar from "@/components/navigation/navbar";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import ParticlesBg from "@/components/ui/particles-bg";
import TextRevealByWord from "@/components/ui/text-reveal";
import WordRotate from "@/components/ui/word-rotate";
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
        <TextRevealByWord
          className="text-center"
          text="I am a passionate software developer with an interest in Full Stack
            Development. I have experience in building web applications using
            modern technologies like React, Next.js, and Node.js. I am also
            familiar with the agile methodology and have experience working in
            teams."
        />
      </section>
    </div>
  );
}
