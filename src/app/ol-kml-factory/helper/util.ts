import {ColorType} from '@bioroxx/kmljs';

export function colorTypeToCSSRGBAString(colorType: ColorType): string {

  const alpha = parseInt(colorType.substring(0, 2), 16) / 255.0;
  let blue = parseInt(colorType.substring(2, 4), 16);
  let green = parseInt(colorType.substring(4, 6), 16);
  let red = parseInt(colorType.substring(6, 8), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(1)})`;
}
