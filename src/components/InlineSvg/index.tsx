import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { FileField } from '~/generated/sdk';
import { notNullish } from '~/utils/notNullish';

const InlineSvg = ({
  asset,
  width,
  height,
  color = 'black',
}: {
  asset: FileField;
  width: number;
  height: number;
  color?: string;
}) => {
  const [viewBox, setViewBox] = useState<string>();
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const loadPath = async () => {
      const res = await fetch(asset.url);
      const text = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'image/svg+xml');
      const parsedViewBox = doc.querySelector('svg')?.getAttribute('viewBox');
      if (parsedViewBox) setViewBox(parsedViewBox);
      // @ts-expect-error -- don't want to config tsc only for that
      const parsedPaths = [...doc.querySelectorAll('path')]
        .map((p: SVGPathElement) => {
          return p.getAttribute('d');
        })
        .filter(notNullish);
      if (parsedPaths) setPaths(parsedPaths);
    };
    loadPath();
  }, [asset.url]);

  const renderedPaths = useMemo(() => {
    return paths.map((path, i) => `<path d="${path}" />`).join('');
  }, [paths]);

  if (paths.length === 0 || !viewBox) return null;
  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      fill={color}
      dangerouslySetInnerHTML={{ __html: renderedPaths }}
    />
  );
};

export default InlineSvg;
