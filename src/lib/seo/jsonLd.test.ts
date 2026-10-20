import { describe, expect, it } from "vitest";

import {
  ORGANIZATION_ID,
  buildBreadcrumbJsonLd,
  buildCarJsonLd,
  buildOrganizationJsonLd,
  serializeJsonLd,
  type CarJsonLdInput,
} from "./jsonLd";

const car: CarJsonLdInput = {
  title: "BMW X5 xDrive40i",
  description: "Clean history",
  vin: "5UXCR6C05L9B12345",
  year: 2020,
  mileageKm: 54000,
  engine: "3.0 petrol",
  transmission: "automatic",
  drivetrain: "AWD",
  status: "available",
  price: 41500,
  url: "https://revolution-auto.com.ua/uk/cars/bmw-x5",
  images: ["https://revolution-auto.com.ua/api/car-media/file/x5.jpg"],
};

describe("serializeJsonLd", () => {
  it("escapes < so the payload cannot close the script tag", () => {
    const html = serializeJsonLd({
      "@context": "https://schema.org",
      "@type": "Thing",
      name: "</script><script>alert(1)</script>",
    });

    expect(html).not.toContain("<");
    expect(JSON.parse(html).name).toBe("</script><script>alert(1)</script>");
  });
});

describe("buildOrganizationJsonLd", () => {
  it("describes the dealer with contacts, address and hours", () => {
    const data = buildOrganizationJsonLd();

    expect(data).toMatchObject({
      "@type": "AutoDealer",
      "@id": ORGANIZATION_ID,
      name: "Revolution Auto",
      legalName: "ФОП Дудко Дмитро Борисович",
      url: "https://revolution-auto.com.ua",
      telephone: "+380938241360",
      address: {
        "@type": "PostalAddress",
        streetAddress: "вул. Глибочицька, 27-А",
        addressLocality: "Київ",
        addressCountry: "UA",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "19:00",
        },
      ],
    });
    expect(data.sameAs).toContain("https://t.me/RevolutionAuto1");
  });
});

describe("buildCarJsonLd", () => {
  it("maps the car specs onto schema.org Car", () => {
    expect(buildCarJsonLd(car)).toMatchObject({
      "@type": "Car",
      name: "BMW X5 xDrive40i",
      url: car.url,
      image: car.images,
      description: "Clean history",
      vehicleIdentificationNumber: "5UXCR6C05L9B12345",
      vehicleModelDate: "2020",
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: 54000,
        unitCode: "KMT",
      },
      vehicleEngine: { "@type": "EngineSpecification", name: "3.0 petrol" },
      vehicleTransmission: "Automatic",
      driveWheelConfiguration: "https://schema.org/AllWheelDriveConfiguration",
    });
  });

  it("offers an in-stock car at its turnkey price", () => {
    expect(buildCarJsonLd(car).offers).toEqual({
      "@type": "Offer",
      price: 41500,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
      url: car.url,
      seller: { "@id": ORGANIZATION_ID },
    });
  });

  it("marks a car in transit as a pre-order", () => {
    const data = buildCarJsonLd({ ...car, status: "inTransit" });

    expect(data.offers).toMatchObject({
      availability: "https://schema.org/PreOrder",
    });
  });

  it("leaves auction lots without an offer since their price is an estimate", () => {
    expect(buildCarJsonLd({ ...car, status: "auction" })).not.toHaveProperty(
      "offers",
    );
  });

  it("skips optional fields that are empty", () => {
    const data = buildCarJsonLd({ ...car, description: null, vin: null });

    expect(data).not.toHaveProperty("description");
    expect(data).not.toHaveProperty("vehicleIdentificationNumber");
  });
});

describe("buildBreadcrumbJsonLd", () => {
  it("numbers the trail from 1", () => {
    expect(
      buildBreadcrumbJsonLd([
        { name: "Головна", url: "https://revolution-auto.com.ua/uk" },
        { name: "Каталог", url: "https://revolution-auto.com.ua/uk/cars" },
      ]),
    ).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Головна",
          item: "https://revolution-auto.com.ua/uk",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Каталог",
          item: "https://revolution-auto.com.ua/uk/cars",
        },
      ],
    });
  });
});
