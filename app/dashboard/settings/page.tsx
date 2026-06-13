'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Shield, Upload, Building2 } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';

import { supabase } from '@/lib/supabase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {

    

    const { organisation, refreshProfile } = useAuth();

    const [logoUploading, setLogoUploading] =
    useState(false);

    const [primaryColor, setPrimaryColor] =
    useState(
        organisation?.primary_color || '#005EB8'
    );

    const brandColor =
      organisation?.primary_color || '#005EB8';

    useEffect(() => {
        if (organisation?.primary_color) {
            setPrimaryColor(organisation.primary_color);
        }
    }, [organisation]);

  const [currentPassword, setCurrentPassword] =
    useState('');

  const [newPassword, setNewPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

    const [savingBranding, setSavingBranding] =
    useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const validatePassword = (
    password: string
  ) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
      password
    );
  };

  console.log("Current Organisation:", organisation);

  const handleChangePassword =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
      ) {
        toast({
          title:
            'All fields are required',
          variant: 'destructive',
        });

        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        toast({
          title:
            'Passwords do not match',
          variant: 'destructive',
        });

        return;
      }

      if (
        !validatePassword(
          newPassword
        )
      ) {
        toast({
          title:
            'Weak Password',
          description:
            'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.',
          variant: 'destructive',
        });

        return;
      }

      try {
        setLoading(true);

        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        if (!user) {
          throw new Error(
            'User not found'
          );
        }

        const { error } =
          await supabase.auth.updateUser(
            {
              password:
                newPassword,
            }
          );

        if (error) {
          throw error;
        }

        toast({
          title:
            'Password Updated',
          description:
            'Please login again using your new password.',
        });

        await supabase.auth.signOut();

        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } catch (error: any) {
        toast({
          title:
            'Failed to update password',
          description:
            error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
    ) => {
    try {
        
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
        toast({
            title: 'Invalid file',
            description: 'Please upload an image.',
            variant: 'destructive',
        });

        return;
        }

        if (file.size > 2 * 1024 * 1024) {
        toast({
            title: 'File too large',
            description: 'Maximum size is 2MB.',
            variant: 'destructive',
        });

        return;
        }

        

        setLogoUploading(true);

        const fileExt =
        file.name.split('.').pop();

        const fileName =
        `${organisation?.id}-${Date.now()}.${fileExt}`;

        const filePath =
        `${organisation?.id}/${fileName}`;

        const { error: uploadError } =
        await supabase.storage
            .from('organisation-logos')
            .upload(filePath, file, {
            upsert: true,
            });

        if (uploadError)
        throw uploadError;

        const {
        data: { publicUrl },
        } = supabase.storage
        .from('organisation-logos')
        .getPublicUrl(filePath);

        const { error } =
        await supabase
            .from('organisations')
            .update({
            logo_url: publicUrl,
            })
            .eq(
            'id',
            organisation?.id
            );

        if (error) throw error;

        await refreshProfile();

        toast({
        title:
            'Logo updated successfully',
        });
    } catch (error: any) {
        toast({
        title:
            'Upload failed',
        description:
            error.message,
        variant: 'destructive',
        });
    } finally {
        setLogoUploading(false);
    }
    };

    const handleSaveBranding = async () => {
        try {
            setSavingBranding(true);
            if (!organisation) {
            throw new Error('Organisation not found');
            }

            const { error } = await supabase
            .from('organisations')
            .update({
                primary_color: primaryColor,
            })
            .eq('id', organisation.id);

            if (error) throw error;

            await refreshProfile();

            toast({
            title: 'Brand settings updated',
            description: 'Your branding has been saved successfully.',
            });
        } catch (error: any) {
            toast({
            title: 'Failed to save branding',
            description: error.message,
            variant: 'destructive',
            });
        } finally {
            setSavingBranding(false);
        }
    };

  const openBillingPortal =
    async () => {

      const {
        data: { session }
      } =
        await supabase.auth.getSession();

      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-billing-portal`,
          {
            method: "POST",
            headers: {
              Authorization:
                `Bearer ${session?.access_token}`,
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              organisation_id:
                organisation?.id,
            }),
          }
        );

      const data =
        await response.json();

      if (data.url) {
        window.location.href =
          data.url;
      }
    };

  return (
    <div 
      className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
    >
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-slate-500 mt-1">
          Manage your account security
          and preferences.
        </p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-6 max-w-7xl">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-[#005EB8]" />

          <div>
            <h2 className="font-semibold">
              Security
            </h2>

            <p className="text-sm text-slate-500">
              Update your password.
            </p>
          </div>
        </div>

        <form
          onSubmit={
            handleChangePassword
          }
          className="space-y-5"
        >
          <div>
            <Label>
              Current Password
            </Label>

            <div className="relative mt-2">
              <Input
                type={
                  showCurrent
                    ? 'text'
                    : 'password'
                }
                value={
                  currentPassword
                }
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() =>
                  setShowCurrent(
                    !showCurrent
                  )
                }
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label>
              New Password
            </Label>

            <div className="relative mt-2">
              <Input
                type={
                  showNew
                    ? 'text'
                    : 'password'
                }
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() =>
                  setShowNew(
                    !showNew
                  )
                }
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label>
              Confirm Password
            </Label>

            <div className="relative mt-2">
              <Input
                type={
                  showConfirm
                    ? 'text'
                    : 'password'
                }
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-slate-50 border rounded-lg p-4 text-sm text-slate-600">
            Password requirements:
            <ul className="list-disc ml-5 mt-2">
              <li>
                Minimum 8 characters
              </li>
              <li>
                At least one uppercase
                letter
              </li>
              <li>
                At least one lowercase
                letter
              </li>
              <li>
                At least one number
              </li>
            </ul>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="hover:bg-[#004a93]"
            style={{
              backgroundColor: brandColor,
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </div>
      <div className="bg-white rounded-2xl border shadow-sm p-6 max-w-7xl">
    <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-5 h-5 text-[#005EB8]" />

        <div>
        <h2 className="font-semibold">
            Organisation Branding
        </h2>

        <p className="text-sm text-slate-500">
            Customize your organisation.
        </p>
        </div>
    </div>

    <div className="space-y-5">

        <div>
        <Label>
            Organisation Logo
        </Label>

        {organisation?.logo_url && (
            <img
            src={
                organisation.logo_url
            }
            alt="Logo"
            className="w-20 h-20 object-cover rounded-lg border mt-2 mb-3"
            />
        )}

        <Input
            type="file"
            accept="image/*"
            onChange={
            handleLogoUpload
            }
        />

        {logoUploading && (
            <p className="text-sm text-slate-500 mt-2">
            Uploading...
            </p>
        )}
        </div>

        <div>
        <Label>
            Primary Colour
        </Label>

        <Input
            type="color"
            value={primaryColor}
            onChange={(e) =>
            setPrimaryColor(
                e.target.value
            )
            }
            className="h-14"
        />
        </div>

        <Button
            onClick={handleSaveBranding}
            disabled={savingBranding}
            style={{
              backgroundColor: brandColor,
            }}
            >
            {savingBranding ? (
                <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
                </>
            ) : (
                'Save Branding'
            )}
        </Button>

    </div>
    </div>
    </div>
  );
}