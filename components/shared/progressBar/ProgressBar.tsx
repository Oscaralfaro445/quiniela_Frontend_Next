interface ProgressBarProps {
  value: number;
  max: number;
}

export const ProgressBar = ({ value, max }: ProgressBarProps) => {
  return (
    <progress
      className="w-full appearance-none h-3 rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full"
      value={value}
      max={max}
    />
  );
};
