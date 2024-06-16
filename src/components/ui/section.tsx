import { cn } from "@/lib/utils";

const Section = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "container relative my-6 py-10 md:py-24 lg:py-32",
        className,
      )}
    >
      {children}
    </section>
  );
};
export default Section;
