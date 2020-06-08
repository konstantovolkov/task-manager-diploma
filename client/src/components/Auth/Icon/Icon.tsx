import React from "react";
import { ICONS } from "../../../icons/icons";
import { IIconProps } from "../../../types/IIconProps";

export const Icon: React.FC<IIconProps> = ({ icon, size, color }) => {
  const styles = {
    svg: {
      display: "inline-block",
      verticalAlign: "middle"
    },
    path: {
      fill: color
    }
  };

  return (
    <svg
      style={styles.svg}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 1024 1024"
    >
      <path style={styles.path} d={ICONS[icon]}></path>
    </svg>
  );
};
