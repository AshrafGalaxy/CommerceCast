
'use client';

import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import DashboardLayout from '@/components/dashboard-layout';
import { TourGuide } from '@/components/dashboard/tour-guide';
import { GoogleSheetAutoSync } from '@/components/GoogleSheetAutoSync';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the initial auth check is done and there's no user, redirect to login.
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  // While loading auth state, show the branded loading screen
  if (isUserLoading || !user) {
    return <LoadingScreen />;
  }

  return (
    <DashboardLayout>
      <GoogleSheetAutoSync />
      {children}
      <Suspense fallback={null}>
        <OnboardingModal />
      </Suspense>
      <TourGuide />
    </DashboardLayout>
  );
}

