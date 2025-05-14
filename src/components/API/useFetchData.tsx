// useFetchData.ts
import { useEffect, useState } from 'react';

export function useFetchData(
  fetcher: () => Promise<any>,
  transform?: (data: any) => Map<string, string>,
  interval: number | null = null, // 默认为 null，不自动刷新,
) {
  const [data, setData] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const getData = async () => {
      try {
        setLoading(true);
        const result = await fetcher();
        // 如果提供了转换函数，则使用它；否则默认将结果转换为 Map<string, string>
        const mapData = transform
          ? transform(result)
          : new Map<string, string>(
              Object.entries(result).map(([key, value]) => [key, String(value)]),
            );
        setData(mapData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getData();
    if (interval) {
      timer = setInterval(getData, interval);
    }

    return () => {
      if (timer) clearInterval(timer); // 组件卸载时清理定时器
    };
  }, [fetcher, transform, interval]);

  return { data, loading, error };
}

export const trans2Map = (data: any): Map<string, string> => {
  // 比如只取部分字段
  return new Map<string, string>(Object.entries(data).map(([key, value]) => [key, String(value)]));
};
