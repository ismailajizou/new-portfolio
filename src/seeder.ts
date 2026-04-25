import { db } from "./server/db";
import { type Testimonial, testimonials } from "./server/db/schema";

async function seedTestimonials() {
  // Check if testimonials already exist
  const existing = await db.select().from(testimonials);
  if (existing.length > 0) {
    console.log("Testimonials already seeded, skipping...");
    return;
  }

  // insert the testimonials
  const records: Omit<Testimonial, "id">[] = [
    {
      name: "Imane Guennach",
      title: "FullStack Developer",
      company: "Arkx Talent Factory",
      text: "One of the most dedicated developers i have seen in the tech field. His attention to details, problem solving skills and ability to deliver high quality work on time made a significant impact on the project we worked on as a team.",
      status: "APPROVED",
      createdAt: new Date("2024-09-17T10:11:21.977Z"),
      updatedAt: new Date("2024-09-17T10:12:48.785Z"),
    },
    {
      name: "BAGHROUS Abdelmoumene",
      title: "CEO",
      company: "Digital Shifts",
      text: "Working with Ismail has been an incredible experience. His expertise in software engineering, combined with his strong problem-solving skills, makes him a valuable asset to any team. Ismail consistently delivers high-quality work. I highly recommend him for any challenging and impactful projects.",
      status: "APPROVED",
      createdAt: new Date("2024-10-18T11:27:19.787Z"),
      updatedAt: new Date("2024-10-18T11:28:54.484Z"),
    },
    {
      name: "Hicham El Aaouad",
      title: "Cyber Security Consultant ",
      company: "Nearsecure",
      text: "Ismail is one of the best JS developers I know. His deep understanding of how things work is unmatched. He delivers clean, efficient code and solves complex problems with ease. A true asset to any team!",
      status: "APPROVED",
      createdAt: new Date("2025-01-23T20:44:11.575Z"),
      updatedAt: new Date("2025-05-25T16:28:30.414Z"),
    },
  ];

  await db.insert(testimonials).values(records);
  console.log(`Seeded ${records.length} testimonials`);
}

async function main() {
  try {
    await seedTestimonials();
    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

main();
