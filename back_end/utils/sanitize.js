const stripTags = (value) => value.replace(/<[^>]*>/g, "").trim();

export const sanitizePayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload.map(sanitizePayload);
  }

  if (payload && typeof payload === "object") {
    return Object.fromEntries(
      Object.entries(payload).map(([key, value]) => [key, sanitizePayload(value)])
    );
  }

  if (typeof payload === "string") {
    return stripTags(payload);
  }

  return payload;
};

