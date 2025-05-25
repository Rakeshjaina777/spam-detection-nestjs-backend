import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Seeding started...');

  const userCount = 50;
  const contactPerUser = 10;
  const users: Awaited<ReturnType<typeof prisma.user.create>>[] = [];

  // 1. Seed Users
  for (let i = 0; i < userCount; i++) {
    const name = faker.person.fullName();
    const phone = `+91${faker.number.int({ min: 6000000000, max: 9999999999 })}`;


    const email = faker.internet.email();
    const password = await bcrypt.hash('password', 10);

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email,
        password,
        role: 'USER', // explicitly set default role
      },
    });

    users.push(user);
  }

  console.log(`✅ ${userCount} users created.`);

  // 2. Seed Contacts
  for (const user of users) {
    const others = users.filter((u) => u.id !== user.id);
    const contacts: { name: string; phone: string; userId: string }[] = [];

    for (let i = 0; i < contactPerUser; i++) {
      const randomUser = others[Math.floor(Math.random() * others.length)];

      contacts.push({
        name: faker.person.fullName(),
        phone: randomUser.phone,
        userId: user.id,
      });
    }

    try {
      await prisma.contact.createMany({
        data: contacts,
        skipDuplicates: true,
      });
    } catch (e) {
      console.error(`❌ Error creating contacts for user ${user.id}`, e);
    }
  }

  console.log(`✅ ${contactPerUser * userCount} contacts created.`);

  // 3. Seed Spam Reports
  const spamReports: { phone: string; userId: string }[] = [];

  for (let i = 0; i < 100; i++) {
    const reporter = users[Math.floor(Math.random() * users.length)];
    const victim = users[Math.floor(Math.random() * users.length)];

    if (reporter.id !== victim.id) {
      spamReports.push({
        phone: victim.phone,
        userId: reporter.id,
      });
    }
  }

  // Deduplicate by phone + userId
  const deduped = new Map<string, { phone: string; userId: string }>();
  for (const report of spamReports) {
    deduped.set(`${report.phone}_${report.userId}`, report);
  }

  try {
    await prisma.spamReport.createMany({
      data: Array.from(deduped.values()),
      skipDuplicates: true,
    });
  } catch (e) {
    console.error('❌ Error seeding spam reports', e);
  }

  console.log(`✅ ${deduped.size} spam reports created.`);
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
