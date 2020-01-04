import TouserInfoModel from './touserInfo';
import UserInfoModel from './userInfo';

export default interface CommentModel {
    id: string
    uid: string
    touid: string
    videoid: string
    commentid: string
    parentid: string
    content: string
    likes: string
    addtime: string
    at_info: string
    userinfo: UserInfoModel
    datetime: string
    islike: string
    touserinfo: TouserInfoModel
    replys: string
}