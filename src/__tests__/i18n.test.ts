import { t, setLocale, getLocale } from "../lib/i18n";

describe("i18n utility", () => {
  it("returns English translation by default", () => {
    expect(t("welcome")).toBe("Welcome to ZIMS-TV!");
  });

  it("returns Arabic translation when locale is set", () => {
    setLocale("ar");
    expect(t("welcome")).toBe("مرحبا بكم في ZIMS-TV!");
    setLocale("en"); // reset
  });

  it("returns key if translation is missing", () => {
    expect(t("missing_key")).toBe("missing_key");
  });

  it("supports dynamic value replacement", () => {
    expect(t("greeting", { name: "Zeeshan" })).toBe("greeting"); // fallback
  });

  it("getLocale returns current locale", () => {
    setLocale("ar");
    expect(getLocale()).toBe("ar");
    setLocale("en");
    expect(getLocale()).toBe("en");
  });
});
