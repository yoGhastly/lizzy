"use client";
import { cn } from "@/app/utils/cn";
import { ProductMetadata } from "../domain/Product";
import { ReactNode, useState } from "react";
import { UnitVariant } from "../components/variants/unit-variant";
import { ColorVariant } from "../components/variants/color-variant";

interface Props {
  metadata: ProductMetadata;
}

function VariantSection({ children }: { children: ReactNode }) {
  return <section className={cn("flex gap-2")}>{children}</section>;
}

export const ProductVariants: React.FC<Props> = ({ metadata }) => {
  const { colors, mililitros, miligramos, longitud } = metadata;

  const colorVariants = colors.split(",");
  const millilitersVariants = mililitros.split(",");
  const milligramsVariants = miligramos.split("-");
  const lengthVariants = longitud.split("-");

  // Define state to hold the active variant name
  const [activeVariant, setActiveVariant] = useState("");

  return (
    <div className="flex flex-col gap-2">
      {colors !== "N/A" && (
        <VariantSection>
          {colorVariants.map((colorVariant, index) => (
            <ColorVariant key={index} colorVariant={colorVariant.trim()} />
          ))}
        </VariantSection>
      )}
      {mililitros !== "N/A" && (
        <VariantSection>
          {millilitersVariants.map((mililitrosVariant, index) => (
            <UnitVariant
              key={index}
              unitVariant={mililitrosVariant.trim()}
              unit="mililitros"
            />
          ))}
        </VariantSection>
      )}
      {miligramos !== "N/A" && (
        <VariantSection>
          {milligramsVariants.map((miligramosVariant, index) => (
            <UnitVariant
              key={index}
              unitVariant={miligramosVariant.trim()}
              unit="miligramos"
            />
          ))}
        </VariantSection>
      )}
      {longitud !== "N/A" && (
        <VariantSection>
          {lengthVariants.map((longitudVariant, index) => (
            <UnitVariant
              key={index}
              unitVariant={longitudVariant.trim()}
              unit="longitud"
              activeVariant={activeVariant} // Pass active variant prop
              setActiveVariant={setActiveVariant} // Pass setActiveVariant function
            />
          ))}
        </VariantSection>
      )}
    </div>
  );
};
