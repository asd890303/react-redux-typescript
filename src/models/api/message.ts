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

export default interface MsssageModel {
    id: number
    uid: number
    videoid: number
    touid: number
    title: string
    synopsis: string
    url: string
    addtime: string
    isattention: string
    avatar: string
    user_name: string
    video_title: string
    userinfo: UserInfoModel
    sysInfo: SysInfoModel
    officeInfo: OfficeInfoModel
}