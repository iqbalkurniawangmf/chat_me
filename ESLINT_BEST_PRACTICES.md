# ESLint Type-Safety Best Practices

## 🎯 Cara Menghindari ESLint Unsafe Warnings

### 1. **Import Path - Gunakan Relative atau Path Alias yang Benar**

```typescript
// ❌ JANGAN - Menyebabkan type resolution issue
import { PrismaService } from 'src/prisma/prisma.service';

// ✅ CARA 1: Relative path
import { PrismaService } from '../prisma/prisma.service';

// ✅ CARA 2: Path alias (jika sudah setup di tsconfig.json)
import { PrismaService } from '@/prisma/prisma.service';
```

**Setup path alias di `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

### 2. **Import Library - Gunakan Named Import**

```typescript
// ❌ JANGAN - Type inference kurang optimal
import * as bcrypt from 'bcrypt';
const hash = await bcrypt.hash(password, 10);

// ✅ GUNAKAN - Type inference lebih baik
import { hash } from 'bcrypt';
const passwordHash = await hash(password, 10);
```

---

### 3. **Explicit Return Type untuk Async Functions**

```typescript
// ❌ JANGAN - Return type di-infer sebagai any
async create(dto: CreateUserDto) {
  return await this.prisma.user.create({ data: dto });
}

// ✅ GUNAKAN - Explicit return type
async create(dto: CreateUserDto): Promise<User> {
  return await this.prisma.user.create({ data: dto });
}
```

---

### 4. **Conditional Object dalam Query - Gunakan Filter**

```typescript
// ❌ JANGAN - Empty object menyebabkan unsafe
const user = await prisma.user.findFirst({
  where: {
    OR: [
      username ? { username } : {},
      email ? { email } : {},
    ],
  },
});

// ✅ GUNAKAN - Filter dengan type predicate
const conditions = [
  username && { username },
  email && { email },
].filter((c): c is { username: string } | { email: string } => Boolean(c));

const user = await prisma.user.findFirst({
  where: conditions.length > 0 ? { OR: conditions } : undefined,
});
```

---

### 5. **Prisma Service - Gunakan Composition atau Type Assertion**

```typescript
// ❌ JANGAN - Extends tanpa type assertion
export class PrismaService extends PrismaClient {
  async cleanDatabase() {
    await this.user.deleteMany(); // Unsafe!
  }
}

// ✅ CARA 1: Type assertion
export class PrismaService extends PrismaClient {
  async cleanDatabase() {
    const prisma = this as PrismaClient;
    await prisma.user.deleteMany();
  }
}

// ✅ CARA 2: Composition (lebih baik)
export class PrismaService {
  private prisma = new PrismaClient();
  
  get client() {
    return this.prisma;
  }
}
```

---

### 6. **Import Prisma Types**

```typescript
// ✅ Selalu import types dari @prisma/client
import type { User, Message, Conversation } from '@prisma/client';

async findUser(id: string): Promise<User | null> {
  return await this.prisma.user.findUnique({ where: { id } });
}
```

---

### 7. **Setelah Generate Prisma Client - Restart Services**

```bash
# Setelah npx prisma generate, restart:
# 1. VSCode TypeScript Server
# Cmd+Shift+P → "TypeScript: Restart TS Server"

# 2. VSCode ESLint Server
# Cmd+Shift+P → "ESLint: Restart ESLint Server"

# 3. Atau reload VSCode
# Cmd+Shift+P → "Developer: Reload Window"
```

---

### 8. **ESLint Config - Sesuaikan Rule Severity**

Jika tidak ingin error mengganggu development, ubah ke `warn`:

```javascript
// eslint.config.mjs
{
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
  }
}
```

---

## 🔧 Troubleshooting

### VSCode Masih Menunjukkan Error Padahal CLI Tidak?

1. **Clear cache:**
   ```bash
   rm -rf node_modules/.cache tsconfig.tsbuildinfo dist
   npm run build
   ```

2. **Restart VSCode services:**
   - TypeScript: Cmd+Shift+P → "TypeScript: Restart TS Server"
   - ESLint: Cmd+Shift+P → "ESLint: Restart ESLint Server"

3. **Reload VSCode:**
   - Cmd+Shift+P → "Developer: Reload Window"

4. **Regenerate Prisma Client:**
   ```bash
   npx prisma generate
   ```

---

## ✅ Checklist Sebelum Commit

- [ ] Semua import menggunakan relative path atau path alias yang benar
- [ ] Tidak ada `import * as` untuk library yang punya named exports
- [ ] Async functions punya explicit return type
- [ ] Tidak ada empty object `{}` dalam conditional query
- [ ] `npm run build` berhasil tanpa error
- [ ] `npm run lint` tidak ada error (warning boleh)
- [ ] VSCode tidak menunjukkan red squiggly lines

---

## 📚 Resources

- [TypeScript ESLint - Type-Aware Rules](https://typescript-eslint.io/linting/typed-linting/)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [NestJS Best Practices](https://docs.nestjs.com/techniques/database#prisma)
