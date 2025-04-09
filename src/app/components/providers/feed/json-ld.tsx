// src/app/components/providers/feed/json-ld.tsx
import React from "react";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonObject
  | JsonArray; // Add undefined

interface JsonObject {
  [key: string]: JsonValue;
}

type JsonArray = JsonValue[];

interface JsonLdProps {
  data: JsonObject & {
    "@context": string;
    "@type": string;
  }; // Make data required
}

export default function JsonLd({ data }: JsonLdProps) {
  let jsonString;
  try {
    jsonString = JSON.stringify(data);
  } catch (e) {
    console.error("Failed to serialize JSON-LD:", e);
    return null;
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
