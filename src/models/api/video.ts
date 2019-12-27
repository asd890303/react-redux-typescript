import MusicInfoModel from './musicInfo';
import UserInfoModel from './userInfo';

export default interface VideoModel {
    ad_endtime: string
    ad_url: string
    addtime: string
    author: string
    city: string
    comments: string
    datetime: string
    file_url: string
    href: string
    id: string
    img_url: string
    is_ad: string
    isattent: string
    isdel: string
    islike: string
    isstep: string
    lat: string
    length: string
    likes: string
    lng: string
    music_format: string
    music_id: string
    musicinfo: MusicInfoModel
    nopass_time: string
    orderno: string
    reback_content: string
    rebacktype: string
    reward: string
    shares: string
    show_val: string
    status: string
    steps: string
    thumb_s: string
    thumb: string
    title: string
    uid: string
    use_nums: string
    userinfo: UserInfoModel
    views: string
    watch_ok: string
    xiajia_reason: string
}