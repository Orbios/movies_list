import {useImageLoader} from 'hooks/useImageLoader';

interface Props {
  url: string;
  title: string;
}

function ImageRender({url, title}: Props) {
  const [imageSrc] = useImageLoader(url);

  return <img width={96} height={142} src={imageSrc} title={title} alt={title} />;
}

export default ImageRender;
