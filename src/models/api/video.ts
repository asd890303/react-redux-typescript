import UserInfoModel from './userInfo';

export default interface VideoModel {
    id: string
    uid: string
    title: string
    thumb: string
    thumb_s: string
    href: string
    likes: string
    views: string
    comments: string
    steps: string
    shares: string
    addtime: string
    lat: string
    lng: string
    city: string
    isdel: string
    status: string
    music_id: string
    xiajia_reason: string
    show_val: string
    nopass_time: string
    watch_ok: string
    is_ad: string
    ad_endtime: string
    ad_url: string
    orderno: string
    reward: string
    rebacktype: string
    reback_content: string
    userinfo: UserInfoModel
}