import { useRouter } from 'wouter';

export default () => {
  const router = useRouter();

  return router.currentUser || {};
};
