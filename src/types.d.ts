declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
  }

  export const Github: FC<IconProps>;
  export const Linkedin: FC<IconProps>;
  export const Mail: FC<IconProps>;
  export const Terminal: FC<IconProps>;
  export const Cpu: FC<IconProps>;
  export const BrainCircuit: FC<IconProps>;
  export const Code2: FC<IconProps>;
  export const Layers: FC<IconProps>;
  export const Workflow: FC<IconProps>;
  export const ChevronDown: FC<IconProps>;
  export const Wifi: FC<IconProps>;
  export const Bluetooth: FC<IconProps>;
  export const Settings: FC<IconProps>;
  export const CircuitBoard: FC<IconProps>;
} 