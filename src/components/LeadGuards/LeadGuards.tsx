"use client";

import { useRef } from "react";

import { HONEYPOT_FIELD, RENDERED_FIELD, RENDERED_TOKEN } from "@/lib/leads";

export function useLeadGuards() {
  const honeypotRef = useRef<HTMLInputElement>(null);

  const guards = (
    <div
      aria-hidden
      className="absolute left-[-9999px] h-px w-px overflow-hidden"
    >
      <input
        ref={honeypotRef}
        type="text"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );

  function readGuards() {
    return {
      [HONEYPOT_FIELD]: honeypotRef.current?.value ?? "",
      [RENDERED_FIELD]: RENDERED_TOKEN,
    };
  }

  return { guards, readGuards };
}
