"use client";
import { ReactNode, useState } from "react";
import { cn } from "@/app/utils/cn";
import { UnitVariant } from "../components/variants/unit-variant";
import { ColorVariant } from "../components/variants/color-variant";
import { ProductMetadata } from "../domain/Product";

interface Props {
  metadata: ProductMetadata;
  onSelectVariant: (variant: { unit: string; value: string }) => void;
}

function VariantSection({ children }: { children: ReactNode }) {
  return <section className={cn("flex gap-2")}>{children}</section>;
}

export const ProductVariants: React.FC<Props> = ({
  metadata,
  onSelectVariant,
}) => {
  const { colores: colors, mililitros, miligramos, longitud } = metadata;

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

  // State to hold the active variant for each unit
  const [activeMililitros, setActiveMililitros] = useState<string>("");
  const [activeMiligramos, setActiveMiligramos] = useState<string>("");
  const [activeLongitud, setActiveLongitud] = useState<string>("");
  const [activeColor, setActiveColor] = useState<string>("");

  const handleSelect = (variant: string, unit: string) => {
    let selectedVariant = "";
    if (unit === "mililitros") {
      selectedVariant = `${variant}-ml`; // Add unit (e.g., '10-ml')
      setActiveMililitros(variant);
    } else if (unit === "miligramos") {
      selectedVariant = `${variant}-mg`; // Add unit (e.g., '50-mg')
      setActiveMiligramos(variant);
    } else if (unit === "longitud") {
      selectedVariant = `${variant}-cm`; // Add unit (e.g., '30-cm')
      setActiveLongitud(variant);
    } else if (unit === "colores") {
      selectedVariant = variant; // For colors, just pass the color name (e.g., 'red')
      setActiveColor(variant);
    }

    // Pass the selected variant back to the parent component
    onSelectVariant({ unit, value: selectedVariant });
  };

  return (
    <div className="flex flex-col gap-2">
      {colors !== "N/A" && colorVariants.length > 0 && (
        <VariantSection>
          {colorVariants.map((colorVariant, index) => (
            <ColorVariant
              key={index}
              colorVariant={colorVariant}
              // isActive={activeColor === colorVariant}
              // onSelect={() => handleSelect(colorVariant, "colores")}
            />
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
