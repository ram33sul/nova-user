import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label = "Type here",
  error = "",
  ...props
}: Props) {
  return (
    <div className="relative">
      <input
        {...props}
        placeholder=" "
        className={`relative peer w-full p-2 border-[1px] border-${
          error ? "red" : "gray"
        }-500 rounded-lg focus:outline-[1px] outline-black dark:outline-white`}
        required
      />
      <label className="absolute peer-placeholder-shown:-z-10 peer-placeholder-shown:top-[50%] -translate-y-[50%] left-2 peer-placeholder-shown:opacity-50 peer-placeholder-shown:text-base top-0 text-xs px-2 bg-white dark:bg-black z-10 transition-all text-black/75 dark:text-white/75">
        {error || label}
      </label>
    </div>
  );
}
