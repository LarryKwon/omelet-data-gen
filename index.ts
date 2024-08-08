import {uniqueAddress, uniqueSigungu} from "./getAddressName";
import {KakaoAPI} from "./apiRequest";
import {createExcel} from "./makeCsv";
import {KakaoAPIInterface} from "./interfaces/kakaoAPI.interface";
import getTotalCountOfQuery = KakaoAPI.getTotalCountOfQuery;

/*
example
sido_name: 서울특별시
sigungu_name: 종로구
keyword: 약국
category_code: PM9

category_code는 kakaoAPI.interface.ts에 정의되어 있음
keyword와 category_code가 연관이 없으면 안 됩니다. (ex. keyword: 약국, category_code: SW8)
*/
async function setSearchTarget(sido_name: string,  keyword: string, category_code: string, sigungu_name?: string,): Promise<KakaoAPIInterface.Query[]> {
  const DBquery = sigungu_name !== undefined ? {
    sido_name: sido_name,
    sigungu_name: sigungu_name
  } : {
    sido_name: sido_name
  }

  const roadAddressName = (await uniqueAddress(DBquery)).map((address: { sido_name: any; sigungu_name: any; address_name: any; }) => {
    return `${address.sido_name} ${address.sigungu_name} ${address.address_name}`
  })

  const searchTargetList = roadAddressName.map((address: string) => {
    return `${address} ${keyword}`
  })

  const apiQuery: KakaoAPIInterface.Query[] = searchTargetList.map((address: string) => {
    return {
      query: address,
      category_group_code: category_code,
      sort: 'accuracy',
    }
  })

  return apiQuery
}

async function main(sido_name: string, keyword: string, category_code: string, sigungu_name?: string, ) {
  const query = await setSearchTarget(sido_name,  keyword, category_code, sigungu_name)

  const apiBatchSize = 5;
  const apiBatchCount = Math.ceil(query.length / apiBatchSize)
  const totalResult: KakaoAPIInterface.Document[] = []
  for (let i = 0; i < apiBatchCount; i++) {
    const batchQuery = query.slice(i * apiBatchSize, (i + 1) * apiBatchSize)
    const batchResult = (await Promise.all(batchQuery.flatMap((async (query: KakaoAPIInterface.Query) => {

          const totalCount = await getTotalCountOfQuery(query)
          const batchCount = Math.ceil(totalCount / 15)
          for (let i = 0; i < batchCount + 1; i++) {
            const result = await KakaoAPI.getKeywordSearch({
              ...query,
              page: i+1,
              size: 15
            })
            return result.documents
          }
        })
      )
    )).flat()
    const finalBatchResult = batchResult.flatMap(item => item !== undefined ? [item] : [])
    totalResult.push(...finalBatchResult)
  }


  createExcel(totalResult, `./output/${keyword}_${sido_name}_${sigungu_name}.csv`)
}


async function main_wrap(sido_name: string, keyword: string, category_code: string, sigungu_name?: string){
 if (sigungu_name === undefined) {
   const sigungu_name_list = (await uniqueSigungu(sido_name)).slice(0)
   console.log(sigungu_name_list)
   sigungu_name_list.slice()
   for (let sigungu of sigungu_name_list){
     if (sigungu.sigungu_name !== null){
       await main(sido_name, keyword, category_code, sigungu.sigungu_name)
     }
   }
 }else{
   await main(sido_name, keyword, category_code, sigungu_name)
 }
}



main_wrap('서울특별시', '세븐일레븐', 'CS2')
  .then(() => console.log('done'))