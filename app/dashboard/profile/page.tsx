'use client';

import { useEffect, useState } from 'react';
import { Loader2, Save, User } from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  const { profile, refreshProfile, organisation } = useAuth();
  const { toast } = useToast();

  const brandColor =
    organisation?.primary_color || '#005EB8';

  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] =
    useState('');

  const [lastName, setLastName] =
    useState('');

  const [phone, setPhone] =
    useState('');

  const [professionalRole, setProfessionalRole] =
    useState('');

  useEffect(() => {
    if (!profile) return;

    setFirstName(profile.first_name || '');
    setLastName(profile.last_name || '');
    setProfessionalRole(
      profile.professional_role || ''
    );

    setPhone(
      (profile as any).phone || ''
    );
  }, [profile]);

  const handleSave = async () => {
    if (!profile) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          professional_role: professionalRole,
          phone,
        })
        .eq('id', profile.id);

      if (error) throw error;

      await refreshProfile();

      toast({
        title: 'Profile Updated',
        description:
          'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Update Failed',
        description:
          error.message ||
          'Unable to update profile.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="p-6">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className=" space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-slate-500 mt-1">
          Manage your personal information.
        </p>
      </div>

      <Card className="max-w-7xl">
        <CardHeader>
          <CardTitle>
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar */}

          <div className="flex items-center gap-4">
            <div 
              className="w-20 h-20 rounded-full text-white flex items-center justify-center text-2xl font-bold"
              style={{
                backgroundColor: brandColor,
              }}
            >
              {firstName?.[0]}
              {lastName?.[0]}
            </div>

            <div>
              <h3 className="font-semibold">
                {firstName} {lastName}
              </h3>

              <p className="text-sm text-slate-500">
                {profile.role}
              </p>
            </div>
          </div>

          {/* Email */}

          <div className="space-y-2">
            <Label>Email Address</Label>

            <Input
              value={profile.email}
              disabled
            />
          </div>

          {/* First Name */}

          <div className="space-y-2">
            <Label>First Name</Label>

            <Input
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                )
              }
            />
          </div>

          {/* Last Name */}

          <div className="space-y-2">
            <Label>Last Name</Label>

            <Input
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value
                )
              }
            />
          </div>

          {/* Phone */}

          <div className="space-y-2">
            <Label>Phone Number</Label>

            <Input
              value={phone}
              placeholder="+44..."
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
            />
          </div>

          {/* Professional Role */}

          <div className="space-y-2">
            <Label>
              Professional Role
            </Label>

            <Input
              value={professionalRole}
              onChange={(e) =>
                setProfessionalRole(
                  e.target.value
                )
              }
            />
          </div>

          {/* Account Info */}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>
                System Role
              </Label>

              <Input
                value={profile.role}
                disabled
              />
            </div>

            <div>
              <Label>
                Account Status
              </Label>

              <Input
                value={
                  profile.is_active
                    ? 'Active'
                    : 'Inactive'
                }
                disabled
              />
            </div>
          </div>

          {/* Save */}

          <Button
            onClick={handleSave}
            disabled={loading}
            className="hover:bg-[#004a93]"
            style={{
              backgroundColor: brandColor,
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}