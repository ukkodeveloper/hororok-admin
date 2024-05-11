'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';

import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

import CafeInputField from '@/app/_components/cafeInputField';
import TelephoneField from '@/app/_components/telephoneField';
import ImageField from '@/app/_components/imageField';

const cafeSchema = z.object({
  cafe: z.string({
    required_error: '카페 이름은 필수입니다.',
  }),
  coordinates: z
    .array(z.string())
    .length(2, '좌표는 반드시 2개의 숫자로 이루어져야 합니다.'),
  address: z.string({
    required_error: '주소는 필수입니다.',
  }),
  telephone: z
    .string()
    .regex(/^(\d{2,3}-\d{3,4}-\d{4})$/, '전화번호 형식이 올바르지 않습니다.')
    .optional(),
  images: z
    .array(z.instanceof(File))
    .min(1, '최소 1개의 이미지가 필요합니다.')
    .max(3, '최대 3개의 이미지까지 가능합니다.'),
});

export type CafeSchema = z.infer<typeof cafeSchema>;

const defaultValues: Partial<CafeSchema> = {
  images: [],
};

export default function Home() {
  const form = useForm<CafeSchema>({
    resolver: zodResolver(cafeSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  function onSubmit(data: CafeSchema) {
    console.log(data);
    toast({
      title: '값이 등록되었습니다.',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <main className="flex flex-col min-w-[640px] max-w-screen-sm m-auto p-24 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 grid-cols-3 bg-gray-50 px-8 py-10 rounded-md"
        >
          <CafeInputField />
          <TelephoneField />
          <ImageField />
          <div className="flex justify-end">
            <Button type="submit">등록하기</Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
