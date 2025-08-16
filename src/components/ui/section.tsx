import { cn } from "@/lib/utils";

const Section = ({
  children,
  className,
  id,
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <section
      className={cn(
        "relative container my-6 py-10 md:py-24 lg:py-32",
        className,
      )}
      id={id}
    >
      {children}
    </section>
  );
};
export default Section;
