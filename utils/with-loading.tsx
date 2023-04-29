import React from 'react';
import { useUser } from '@/utils/use-user';
import LoadingDots from '@/components/ui/LoadingDots';

export default function withLoading(Component: React.ComponentType) {
  return (props: any) => {
    const { isLoading } = useUser();
    if (isLoading) return <LoadingDots fullScreen={true} />;
    return <Component {...props} />;
  };
};