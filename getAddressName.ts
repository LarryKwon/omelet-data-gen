import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function uniqueSigungu(sido_name: string){
  return await prisma.road_address_code.findMany({
    where: {
      sido_name: sido_name,
    },
    select: {
      sigungu_name: true,
    },
    distinct: ['sigungu_name'],
  })
}


export async function uniqueAddress(query: {
  sido_name: string;
  sigungu_name?: string;
}) {
  return await prisma.road_address_code.findMany({
    where: {
      sido_name: query.sido_name,
      sigungu_name: query.sigungu_name,
    },
    select: {
      sido_name: true,
      sigungu_name: true,
      address_name: true,
    },
    distinct: ['address_name'],
  })
}



