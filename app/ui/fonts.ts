// import { Inter } from 'next/font/google';
 
// export const inter = Inter({ subsets: ['latin'] });

// fonts.ts
// 导入 @fontsource/lusitana
// import '@fontsource/lusitana';
// // 定义主字体和次要字体
// export const primaryFont = 'Your Primary Font, sans-serif';
// export const secondaryFont = 'Lusitana, serif';

import { Inter, Lusitana } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] });
 
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});
