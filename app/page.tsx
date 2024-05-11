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
import ky from 'ky';
import { compress } from '@/app/_utils/compress';

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
    .regex(
      /^(\s*|\d{2,3}-\d{3,4}-\d{4})$/,
      '전화번호 형식에 맞춰주세요.(- 붙여주세요.)'
    ),
  images: z
    .array(z.instanceof(File))
    .min(1, '최소 1개의 이미지가 필요합니다.')
    .max(3, '최대 3개의 이미지까지 가능합니다.'),
});

export type CafeSchema = z.infer<typeof cafeSchema>;

const defaultValues: Partial<CafeSchema> = {
  images: [],
  telephone: '',
};

export default function Home() {
  const form = useForm<CafeSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(cafeSchema),
    defaultValues,
  });

  async function onSubmit(data: CafeSchema) {
    // compression
    const imageFiles = await compress(data.images);

    // formData
    const formData = new FormData();

    formData.append(
      'request',
      JSON.stringify({
        name: data.cafe,
        roadAddress: data.address,
        mapx: Number(data.coordinates[0]),
        mapy: Number(data.coordinates[1]),
        telephone: data.telephone,
      })
    );

    formData.append('mainImage', imageFiles[0]);

    if (imageFiles.length > 1) {
      imageFiles.slice(1).forEach(image => {
        formData.append('otherImages', image);
      });
    }

    // api call
    try {
      const response = await ky
        .post('https://api.hororok.o-r.kr/api/admin/cafe/save', {
          body: formData,
          headers: {
            accept: 'application/json',
          },
        })
        .json();

      toast({
        title: '값이 등록되었습니다.',
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(response, null, 2)}
            </code>
          </pre>
        ),
      });

      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: '통신에 실패했어요.',
          description: <p>{error?.message}</p>,
        });
      } else {
        toast({
          title: '알수 없는 에러',
        });
      }
    }
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
