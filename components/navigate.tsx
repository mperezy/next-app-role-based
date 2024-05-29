import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Path } from 'components/app-shell/routes';

type NavigateProps = { to: Path; replace?: boolean };

export default ({ to, replace = false }: NavigateProps): null => {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [replace, router, to]);

  return null;
};
