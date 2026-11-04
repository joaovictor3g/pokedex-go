import React from "react";
import styled from "styled-components/native";
import { colors, radius } from "../theme";

interface ProgressBarProps {
  value: number; // 0..1
  color?: string;
  height?: number;
}

export function ProgressBar({ value, color = colors.accent, height = 8 }: ProgressBarProps) {
  const percent = Math.max(0, Math.min(1, value)) * 100;
  return (
    <Track style={{ height }}>
      <Fill style={{ width: `${percent}%`, backgroundColor: color }} />
    </Track>
  );
}

const Track = styled.View`
  flex: 1;
  border-radius: ${radius.pill}px;
  background-color: ${colors.border};
  overflow: hidden;
`;

const Fill = styled.View`
  height: 100%;
  border-radius: ${radius.pill}px;
`;
