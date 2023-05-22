import Image from 'next/image';
import { MouseEventHandler } from 'react';


interface Props {
  onClick?: MouseEventHandler<HTMLImageElement>;
  name: string;
  size?: number;
}

export default function SvgIcon(props: Props) {
  const { name, size = 18, ...rest } = props;
  return <Image src={`/assets/icons/${name}.svg`} alt={name} height={size} width={size} {...rest} className="cursor-pointer"/>;
}