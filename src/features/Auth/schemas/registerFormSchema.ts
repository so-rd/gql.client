import { z } from 'zod';

export const registerFormSchema = z.object({
  email: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});
// .and(
//   z
//     .object({
//       teamId: z.string().min(1, 'Required'),
//     })
//     .or(z.object({ teamName: z.string().min(1, 'Required') })),
// );
