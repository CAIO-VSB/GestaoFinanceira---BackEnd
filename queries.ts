// 1
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate'

// 2
const prisma = new PrismaClient()
  .$extends(withAccelerate())

// 3
async function main() {
 
  const allUsers = await prisma.user.findUnique({
    where: {
      email: 'teste123@gmail.com',
    },
    select: {
      name: true
    },
  })
  console.dir(allUsers, { depth: null })
}

// 4
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    // 5
    await prisma.$disconnect()
    process.exit(1)
  })

