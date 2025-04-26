import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@admin.com';
  const password = 'admin@123';

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create or update the admin user
  const adminUser = await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email: email,
      password: hashedPassword,
      role: 'ADMIN', // Assign the ADMIN role
    },
  });

  console.log({ adminUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });