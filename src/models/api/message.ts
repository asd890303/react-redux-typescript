import UserInfoModel from './userInfo'

interface SysInfoModel {
    id: number
    uid: number
    title: string
    content: string
    admin: string
    addtime: string
    ip: string
}

interface OfficeInfoModel {
    id: number
    title: string
    sysnopsis: string
    type: number
    content: string
    url: string
    admin: string
    addtime: string
    ip: string
}

export default interface MessageModel {
    id: number
    uid: string
    title: string
    synopsis: string
    content: string
    addtime: string
    isattention: number
    avatar: string
    user_nicename: string
    video_title: string
    video_thumb: string
    videoid: number
    userinfo: UserInfoModel
    sysInfo: SysInfoModel
    officeInfo: OfficeInfoModel
}