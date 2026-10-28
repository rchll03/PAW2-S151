import  z  from 'zod';

const passwordschema = z
  .string()
  .trim()
  .min(8, "Pasword Minimal 3 Karakter")
  .refine(
    (value) =>Buffer.byteLength(value, 'utf-8') <=  72,
    {
      error : "Password maksimal 72 byte UTF-8"
    }
  )

export const registerschema = z.object({
  name: z.string().trim().min(3, "Nama Minimal 3 Karakter"),
  email: z.email(),
  password : passwordschema

})

export const loginschema = z.object({
  email: z.email(),
  password : passwordschem

})

export default Authschema