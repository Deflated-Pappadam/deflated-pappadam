import { MotionValue } from "framer-motion";

export interface FloatingItem {
  id: string;
  text?: string;
  imageUrl?: string;
  type: "text" | "image" | "testimonial";
  baseX: number;
  baseY: number;
  mobileX?: number;
  mobileY?: number;
  size: "small" | "medium" | "large";
  author?: string;
  title?: string;
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
  followStrength: number;
  scrollSpeed?: number;
}

export interface FloatingItemProps {
  item: FloatingItem;
  globalMouseX: MotionValue<number>;
  globalMouseY: MotionValue<number>;
  scrollY: MotionValue<number>;
  isMobile: boolean;
}

export interface NavbarProps {
  hoveredOption: boolean;
  setHoveredOption: (hovered: boolean) => void;
}

export interface HeroSectionProps {
  hoveredOption: boolean;
  setHoveredOption: (hovered: boolean) => void;
}