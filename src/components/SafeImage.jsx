import { useEffect, useMemo, useState } from "react";

function getPicsumFallbackUrl(seed, width, height) {
  const resolvedSeed =
    seed && String(seed).trim()
      ? encodeURIComponent(String(seed).trim())
      : Math.random().toString(36).slice(2);
  return `https://picsum.photos/seed/${resolvedSeed}/${width}/${height}`;
}

function SafeImage({
  src,
  alt,
  className,
  fallbackSeed,
  width = 1200,
  height = 630,
  ...rest
}) {
  const fallbackSrc = useMemo(
    () => getPicsumFallbackUrl(fallbackSeed, width, height),
    [fallbackSeed, width, height]
  );

  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [fallbackStage, setFallbackStage] = useState(0);

  useEffect(() => {
    setFallbackStage(0);
    setCurrentSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (fallbackStage === 0 && currentSrc !== fallbackSrc) {
          setFallbackStage(1);
          setCurrentSrc(fallbackSrc);
          return;
        }
        if (fallbackStage <= 1 && currentSrc !== "/vite.svg") {
          setFallbackStage(2);
          setCurrentSrc("/vite.svg");
        }
      }}
      {...rest}
    />
  );
}

export default SafeImage;
