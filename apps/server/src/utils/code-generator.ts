export function generateCode(len: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * characters.length);
    code += code[index];
  }
  return code;
}
