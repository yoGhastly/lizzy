"use client";
import { ReactNode, useState } from "react";
import { cn } from "@/app/utils/cn";
import { UnitVariant } from "../components/variants/unit-variant";
import { ColorVariant } from "../components/variants/color-variant";
import { ProductMetadata } from "../domain/Product";

interface Props {
  metadata: ProductMetadata;
}

function VariantSection({ children }: { children: ReactNode }) {
  return <section className={cn("flex gap-2")}>{children}</section>;
}

export const ProductVariants: React.FC<Props> = ({ metadata }) => {
  const { colores: colors, mililitros, miligramos, longitud } = metadata;

  console.log("Product metadata:", metadata);
  console.log("Color variants:", colors);
  console.log("Mililitros variants:", mililitros);
  console.log("Miligramos variants:", miligramos);
  console.log("Longitud variants:", longitud);

  // Split variants and remove duplicates using Set, while filtering out "N/A"
  const colorVariants = Array.from(
    new Set(colors.split(",").map((s) => s.trim())),
  ).filter((color) => color !== "N/A");
  const millilitersVariants = Array.from(
    new Set(mililitros.split(",").map((s) => s.trim())),
  ).filter((mil) => mil !== "N/A");
  const milligramsVariants = Array.from(
    new Set(miligramos.split(",").map((s) => s.trim())),
  ).filter((mg) => mg !== "N/A");
  const lengthVariants = Array.from(
    new Set(longitud.split(",").map((s) => s.trim())),
  ).filter((len) => len !== "N/A");

  console.log("Filtered Color variants:", colorVariants);
  console.log("Filtered Milliliters variants:", millilitersVariants);
  console.log("Filtered Milligrams variants:", milligramsVariants);
  console.log("Filtered Length variants:", lengthVariants);

  // Define state to hold the active variant name for each unit
  const [activeMililitros, setActiveMililitros] = useState<string>("");
  const [activeMiligramos, setActiveMiligramos] = useState<string>("");
  const [activeLongitud, setActiveLongitud] = useState<string>("");

  const handleSelect = (variant: string, unit: string) => {
    console.log(`Variant selected: ${variant} (${unit})`);

    if (unit === "mililitros") {
      setActiveMililitros(variant);
    } else if (unit === "miligramos") {
      setActiveMiligramos(variant);
    } else if (unit === "longitud") {
      setActiveLongitud(variant);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {colors !== "N/A" && colorVariants.length > 0 && (
        <VariantSection>
          {colorVariants.map((colorVariant, index) => (
            <ColorVariant key={index} colorVariant={colorVariant} />
          ))}
        </VariantSection>
      )}
      {mililitros !== "N/A" && millilitersVariants.length > 0 && (
        <VariantSection>
          {millilitersVariants.map((mililitrosVariant, index) => (
            <UnitVariant
              key={index}
              unitVariant={mililitrosVariant}
              unit="mililitros"
              isActive={activeMililitros === mililitrosVariant}
              onSelect={() => handleSelect(mililitrosVariant, "mililitros")}
            />
          ))}
        </VariantSection>
      )}
      {miligramos !== "N/A" && milligramsVariants.length > 0 && (
        <VariantSection>
          {milligramsVariants.map((miligramosVariant, index) => (
            <UnitVariant
              key={index}
              unitVariant={miligramosVariant}
              unit="miligramos"
              isActive={activeMiligramos === miligramosVariant}
              onSelect={() => handleSelect(miligramosVariant, "miligramos")}
            />
          ))}
        </VariantSection>
      )}
      {longitud !== "N/A" && lengthVariants.length > 0 && (
        <VariantSection>
          {lengthVariants.map((longitudVariant, index) => (
            <UnitVariant
              key={index}
              unitVariant={longitudVariant}
              unit="longitud"
              isActive={activeLongitud === longitudVariant}
              onSelect={() => handleSelect(longitudVariant, "longitud")}
            />
          ))}
        </VariantSection>
      )}
    </div>
  );
};
