interface SectionWrapperProps {
  children: React.ReactNode;
}

const SectionWrapper = ({ children }: SectionWrapperProps) => {
  return (
    <div className="border-1 rounded-xl bg-white p-10 shadow-xl">
      {children}
    </div>
  );
};

export default SectionWrapper;
