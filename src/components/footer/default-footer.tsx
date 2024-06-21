import { LuGithub, LuLinkedin, LuTwitter } from "react-icons/lu";
import Link from "next/link";
import { env } from "@/env";

const SOCIALS = [
  {
    name: "LinkedIn",
    url: env.LINKEDIN_LINK,
    icon: LuLinkedin,
  },
  {
    name: "GitHub",
    url: env.GITHUB_LINK,
    icon: LuGithub,
  },
  {
    name: "Twitter",
    url: env.TWITTER_LINK,
    icon: LuTwitter,
  },
];

const Footer = () => {
  return (
    <footer className="container py-8">
      <div className="mb-4 flex justify-center gap-4">
        {SOCIALS.map((social, index) => (
          <Link
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            <social.icon className="h-6 w-6" />
          </Link>
        ))}
      </div>
      <div>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Ismail AJIZOU. All rights
            reserved.
          </p>
          <p className="text-center text-sm text-gray-500">
            Made with ❤️ by{" "}
            <Link
              href="https://ismailajizou.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Ismail AJIZOU
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
