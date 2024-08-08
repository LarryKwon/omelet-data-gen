
export namespace KakaoAPIInterface {
  export const apiUrl = process.env.KAKAO_API_URL
  export const apiKey = process.env.KAKAO_API_KEY

  export const category_group_code = {
    MT1: '대형마트',
    CS2: '편의점',
    PS3: '어린이집, 유치원',
    SC4: '학교',
    AC5: '학원',
    PK6: '주차장',
    OL7: '주유소, 충전소',
    SW8: '지하철역',
    BK9: '은행',
    CT1: '문화시설',
    AG2: '중개업소',
    PO3: '공공기관',
    AT4: '관광명소',
    AD5: '숙박',
    FD6: '음식점',
    CE7: '카페',
    HP8: '병원',
    PM9: '약국',
  }

  export interface Query {
    query?: string
    category_group_code?: string
    x?: string
    y?: string
    radius?: number
    rect?: string
    page?: number
    size?: number
    sort: string
  }

  export interface SameName {
    region: string[]
    keyword: string
    selected_region: string
  }

  export interface Meta {
    total_count: number
    pageable_count: number
    is_end: boolean
    same_name: SameName
  }
  export interface Document {
    id: string
    place_name: string
    category_name: string
    category_group_code: string
    category_group_name: string
    phone: string
    address_name: string
    road_address_name: string
    x: string
    y: string
    place_url: string
    distance: string
  }

  export interface Response {
    meta: Meta,
    documents: Document[]
  }
}