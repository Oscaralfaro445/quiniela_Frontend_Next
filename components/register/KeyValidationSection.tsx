"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Title } from "../shared/text/Title";
import { TextBody } from "../shared/text/TextBody";

interface KeyValidationSectionProps {
  onValidated: (code: string) => void;
}

export const KeyValidationSection = ({
  onValidated,
}: KeyValidationSectionProps) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const concatenatedCode = code.join("");

  const handleSubmit = () => {
    if (concatenatedCode.length === 5) {
      onValidated(concatenatedCode);
    }
  };

  return (
    <section className="flex min-h-screen pt-16 items-center">
      <div className="grid w-full max-w-[768px] mx-auto px-4 py-8 gap-6 lg:border border-neutral-300 rounded-2xl lg:shadow-xs">
        <div className="grid gap-2 justify-items-center items-center">
          <Image src="/images/NFL.png" alt="Logo NFL" width={50} height={50} />
          <Title
            className="text-center"
            title="Clave de Confirmación"
            color="blue"
          />
          <TextBody
            className="text-center"
            text="Ingresa los 5 dígitos que recibiste para verificar tu cuenta."
          />
        </div>

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

        <button
          onClick={handleSubmit}
          disabled={concatenatedCode.length !== 5}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
            concatenatedCode.length === 5
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
          }`}
        >
          Verificar Código
        </button>

        <div className="grid md:flex gap-2 items-center justify-center">
          <p className="text-neutral-600">¿Ya tienes una cuenta?</p>

          <Link href="/login">
            <p className="text-center md:text-end text-blue-600 hover:underline">
              Inicia sesión
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
