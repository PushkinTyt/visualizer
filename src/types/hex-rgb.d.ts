declare module "rgb-hex" {
    export default function rgbHex(strFArg: string): string;
    export default function rgbHex(r: number, g: number, b: number): string;
    export default function rgbHex(r: number, g: number, b: number, opacity: string | number): string;
}

declare module "hex-rgb" {
    export default function hexRgb(strFArg: string): [number, number, number];
}