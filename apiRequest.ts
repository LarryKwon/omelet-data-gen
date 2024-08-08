import axios, {AxiosResponse} from "axios";
import {KakaoAPIInterface} from "./interfaces/kakaoAPI.interface";


export namespace KakaoAPI {
  function requestToAddrAPI(apiUrl: string, confmKey: string) {
    return async (query: KakaoAPIInterface.Query): Promise<AxiosResponse> => {
      try {
        return axios({
          url: apiUrl,
          headers: {
            'Authorization': `KakaoAK ${confmKey}`
          },
          method: 'get',
          params: query
        })
      } catch (error) {
        throw new Error(`Error: ${error}`)
      }
    }
  }

  export async function getKeywordSearch(query: KakaoAPIInterface.Query): Promise<KakaoAPIInterface.Response>{
    const apiURL = process.env.KAKAO_API_URL
    const apiKey = process.env.KAKAO_API_KEY
    if(apiURL === undefined || apiKey === undefined){
      throw new Error('API URL or API Key is not defined')
    }
    try{
      const result =  await requestToAddrAPI(apiURL, apiKey)(query)
      if(result.status !== 200){
        throw new Error(`Error: ${result.status}`)
      }
      return result.data
    }catch (e) {
      // @ts-ignore
      if(e.errno == -3008){
        return await getKeywordSearch(query)
      }
    }
    return await getKeywordSearch(query)
  }

  export async function getTotalCountOfQuery(query: KakaoAPIInterface.Query) {
    const result = await getKeywordSearch(query)
    const totalCount = result.meta.total_count
    const pageableCount = result.meta.pageable_count
    if(pageableCount < totalCount){
      console.error('There are more results than pageable count with this query', query);
      console.error('Total count:', totalCount, 'Pageable count:', pageableCount)
    }
    return pageableCount;
  }

}