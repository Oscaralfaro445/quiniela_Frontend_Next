"use client";

import { useCodeVerification } from "@/hooks/register/mutations/useCodeValidation";
import { useRef, useState } from "react";
import { Button } from "../shared/button/Button";

interface CodeVerificationFormProps {
  mutation: ReturnType<typeof useCodeVerification>;
}

export const CodeVerificationForm = ({
  mutation,
}: CodeVerificationFormProps) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const concatenatedCode = code.join("");

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 5);

    if (digits.length > 0) {
      const newCode = digits.split("");
      while (newCode.length < 5) {
        newCode.push("");
      }
      setCode(newCode as string[]);

      const focusIndex = Math.min(digits.length, 4);
      setTimeout(() => inputRefs.current[focusIndex]?.focus(), 0);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (concatenatedCode.length === 5) {
      mutation.mutate(concatenatedCode);
    }
  };

  return (
    <form className="grid gap-6">
      <div className="flex justify-center gap-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(event) => handleInputChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className="w-12 h-14 text-center text-2xl font-bold border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
            placeholder="-"
          />
        ))}
      </div>

      <Button
        type="submit"
        title={mutation?.isPending ? "Verificando..." : "Verificar código"}
        disabled={mutation?.isPending || concatenatedCode.length !== 5}
        onClick={(event) => handleSubmit(event)}
      />
    </form>
  );
};
