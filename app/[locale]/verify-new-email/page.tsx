'use client';

import { useRouter } from "next/navigation";
import useUserStore from '@/app/stores/userStore';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useLocaleStore from "@/app/stores/localeStore";

export default function VerifyNewEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { updateProfile } = useUserStore();
  const t = useTranslations("Email-verify-modal");
  const { locale } = useLocaleStore();

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setStatus('error');
        setMessage(t('token-missing'));
        return;
      }

      try {
        const response = await fetch(`/api/get-verify-email?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setStatus('error');
          setMessage(errorData.message || t('verification-failed'));
          return;
        }

        const data = await response.json();

        if (data.token) {
          document.cookie = `authToken=${data.token}; path=/; max-age=${3 * 60 * 60};`;
          updateProfile({ emailVerified: true });
          toast.success(t("success-verify"));
          router.push(`${process.env.NEXT_PUBLIC_FRONT_URL}/${locale}/dashboard/`);
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage(t('unexpected-error'));
      }
    }

    verifyToken();
  }, [router, token, updateProfile, t, locale]);

  return (
    <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {status === 'loading' && <p>{t("loading")}</p>}
      {status === 'error' && <p style={{ color: 'red' }}>{message}</p>}
      {status === 'success' && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}
