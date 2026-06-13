'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

type EmployeeRow = {
first_name: string;
last_name: string;
email: string;
professional_role: string;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const VALID_ROLES = [
'care_assistant',
'rgn',
'rmn',
'nurse_associate',
'clinical_lead',
'manager',
'admin',
'other',
];

export default function ImportEmployeesModal({
open,
onOpenChange,
onSuccess,
}: Props) {
const { toast } = useToast();

const [rows, setRows] = useState<EmployeeRow[]>([]);
const [errors, setErrors] = useState<string[]>([]);
const [importing, setImporting] = useState(false);

const downloadTemplate = () => {
const csv =
`first_name,last_name,email,professional_role
John,Smith,john@example.com,care_assistant
Mary,Jones,mary@example.com,rgn`;


const blob = new Blob([csv], {
  type: 'text/csv',
});

const url =
  window.URL.createObjectURL(blob);

const a =
  document.createElement('a');

a.href = url;
a.download =
  'employee-import-template.csv';

a.click();

window.URL.revokeObjectURL(url);


};

const handleFile = (
e: React.ChangeEvent<HTMLInputElement>
) => {
const file =
e.target.files?.[0];


if (!file) return;

if (
  file.type !== 'text/csv' &&
  !file.name.endsWith('.csv')
) {
  toast({
    title: 'Invalid File',
    description:
      'Please upload a CSV file.',
    variant: 'destructive',
  });

  return;
}

Papa.parse(file, {
  header: true,
  skipEmptyLines: true,
  complete: (result: any) => {
    const parsed =
      result.data as EmployeeRow[];

    const validationErrors: string[] = [];

    parsed.forEach((row, index) => {
      if (
        !row.first_name ||
        !row.last_name ||
        !row.email
      ) {
        validationErrors.push(
          `Row ${index + 1}: Missing required fields`
        );
      }

      if (
        !VALID_ROLES.includes(
          row.professional_role
        )
      ) {
        validationErrors.push(
          `Row ${index + 1}: Invalid professional_role`
        );
      }
    });

    setRows(parsed);
    setErrors(validationErrors);
  },
});


};

const importEmployees = async () => {
  if (
    rows.length === 0 ||
    errors.length > 0
  ) {
    return;
  }

  try {
    setImporting(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error(
        'You are not authenticated'
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/manage-employee`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'bulk_create',
          employees: rows,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || 'Import failed'
      );
    }

    toast({
      title: 'Import Complete',
      description: `Created ${data.created} employees`,
    });

    setRows([]);
    setErrors([]);

    onSuccess?.();

    onOpenChange(false);
  } catch (error: any) {
    toast({
      title: 'Import Failed',
      description: error.message,
      variant: 'destructive',
    });
  } finally {
    setImporting(false);
  }
};


return (
<Dialog
open={open}
onOpenChange={
onOpenChange
}
> <DialogContent className="max-w-2xl"> <DialogHeader> <DialogTitle>
Import Employees </DialogTitle> </DialogHeader>

```
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={
          downloadTemplate
        }
      >
        Download Template
      </Button>

      <input
        type="file"
        accept=".csv"
        onChange={
          handleFile
        }
      />

      {rows.length > 0 && (
        <div className="rounded-lg border p-3 bg-slate-50">
            <p className="font-medium">
            Import Summary
            </p>

            <p className="text-sm text-slate-600">
            {rows.length} employees detected
            </p>

            <p className="text-sm text-green-600">
            {rows.length - errors.length} valid
            </p>

            {errors.length > 0 && (
            <p className="text-sm text-red-600">
                {errors.length} errors
            </p>
            )}
        </div>
    )}

      {errors.length > 0 && (
        <div className="bg-red-50 border rounded p-3">
          {errors.map(
            (err) => (
              <div
                key={err}
              >
                {err}
              </div>
            )
          )}
        </div>
      )}

      <Button
        disabled={
          importing ||
          errors.length > 0 ||
          rows.length === 0
        }
        onClick={
          importEmployees
        }
      >
        {importing
          ? 'Importing...'
          : 'Import Employees'}
      </Button>
    </div>
  </DialogContent>
</Dialog>


)
}
