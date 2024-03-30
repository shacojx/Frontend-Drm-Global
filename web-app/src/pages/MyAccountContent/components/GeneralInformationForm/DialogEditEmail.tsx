import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  callApiChangeEmail,
  callApiGetUserProfile,
  callApiSendEditEmailOTP,
} from 'src/api/account';
import { DialogContainer } from 'src/components/DialogContainer';
import { DialogFailureFullscreen, DialogSuccessFullscreen } from 'src/components/DialogFormStatusFullscreen';
import { FormFieldEmail } from 'src/components/FormFieldEmail';
import { FormFieldOtp } from 'src/components/FormFieldOtp';
import { IconArrowLeft, IconSpinner } from 'src/components/icons';
import { AuthContext } from 'src/contexts/AuthContextProvider';
import { cn } from 'src/utils/cn.util';

type DialogEditEmailProps = {
  onClose?: () => void;
  open?: boolean;
};

export const DialogEditEmail = ({ onClose, open }: DialogEditEmailProps) => {
  const { t } = useTranslation();

  const { user, saveAuthUser } = useContext(AuthContext)

  const [email, setEmail] = useState<string>();
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState('');

  const [error, setError] = useState<false | string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown === 0) {
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);


  const handleSendOtp = async () => {
    try {
      setLoading(true);
      if (!email || !user?.firstName || !user?.lastName ) {
        return
      }
      await callApiSendEditEmailOTP({email, firstName: user.firstName, lastName: user.lastName});
      setLoading(false);
    } catch (error) {
      setError(String(error));
      setLoading(false);
    }
  };

  const handleChangeEmail = async () => {
    try {
      setLoading(true);
      email && (await callApiChangeEmail(email, otp));

      const newUser = await callApiGetUserProfile()
      saveAuthUser(newUser)

      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setError(String(error));
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <DialogContainer onClose={onClose}>
          <div className="px-8 py-9 text-center">
            {step === 0 && (
              <>
                <h4 className="text-xl font-bold mb-4">{t('Edit Email')}</h4>
                <div className="text-disable mb-8">{t('Enter the email you want to edit !')}</div>

                <FormFieldEmail
                  shouldLiveCheck
                  isRequired
                  id="edit-email"
                  onChange={setEmail}
                  validateCaller={{}}
                  value={email}
                />
              </>
            )}

            {step === 1 && (
              <>
                <h4 className="text-xl font-bold mb-4">{t('Email Verification')}</h4>
                <div className="text-disable mb-8">We have sent code to you email: {email}</div>
                <FormFieldOtp otpLength={4} onInputOtp={setOtp} onLastOtp={() => {}} />
                <div className="mt-4 flex gap-2 justify-center">
                  <span>Didn't receive code?</span>
                  <button
                    className={cn('text-primary font-semibold', {
                      'text-disable': countdown > 0,
                    })}
                    onClick={() => {
                      if (countdown === 0) {
                        handleSendOtp();
                        setCountdown(60)
                      }
                    }}
                    disabled={countdown > 0}
                  >
                    Resend {countdown > 0 ? `${countdown}s` : ''}
                  </button>
                </div>
              </>
            )}

            <button
              className={cn(
                'flex gap-2 items-center justify-center rounded-lg bg-primary text-white font-semibold h-13 w-full mt-10',
                {
                  'bg-disable': loading,
                }
              )}
              disabled={loading}
              onClick={async () => {
                if (step === 0) {
                  await handleSendOtp();
                  setStep((prev) => prev + 1);
                  return;
                }

                if (step === 1) {
                  await handleChangeEmail();
                }
              }}
            >
              {loading && <IconSpinner />}
              {step === 0 && t('Next')}
              {step === 1 && t('Verify Account')}
            </button>
            <button
              className="inline-flex gap-2 items-center text-sm mt-4 mx-auto"
              onClick={() => {
                if (step === 0) {
                  onClose?.();
                  return;
                }

                if (step === 1) {
                  setStep((prev) => prev - 1);
                }
              }}
            >
              <IconArrowLeft />
              <span>Previous Step</span>
            </button>
          </div>
        </DialogContainer>
      )}

      {error && (
        <DialogFailureFullscreen
          title={error}
          actionElement={
            <button
              className="rounded-lg bg-primary text-white font-semibold h-13 w-full mt-10"
              onClick={() => setError(false)}
            >
              {t('Close')}
            </button>
          }
        />
      )}

      {isSuccess && (
        <DialogSuccessFullscreen
          title="Email changed successfully"
          actionElement={
            <button
              className="rounded-lg bg-primary text-white font-semibold h-13 w-full mt-10"
              onClick={() => {
                setIsSuccess(false);
                onClose?.();
              }}
            >
              {t('Close')}
            </button>
          }
        />
      )}
    </>
  );
};
