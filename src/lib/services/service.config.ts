const Host = {
    // prod: 'http://212.64.127.100',
    prod: 'http://111.229.15.227',
    gcp: 'http://111.229.15.227',
    localhost: 'http://localhost:8050'
}

export const serviceConfig = {
    host: process.env.NODE_ENV === 'development' ? Host.gcp : Host.gcp,
    services: [
        {
            moudle: 'Video',
            rules: [
                'getVideoList',
                'getComments',
                'getReplys',
                'setVideo',
                'setComment',
                'addView',
                'addLike',
                'addStep',
                'addShare',
                'setBlack',
                'addCommentLike',
                'getAttentionVideo',
                'getVideo',
                'getMyVideo'
            ]
        },
        {
            moduel: 'User',
            rules: [
                'iftoken',
                'getBaseInfo',
                'updateAvatar',
                'updateFields',
                'setAttent',
                'isAttent',
                'isBlacked',
                'checkBlack',
                'setBlack',
                'getFollowsList',
                'getFansList',
                'getBlackList',
                'getUserHome',
                'getPmUserInfo',
                'getMultiInfo',
                'getLikeVideos',
                'getBalance',
                'getInvitationimglist',
                'getQRcode',
                'getInvitationrecord',
                'getInvitationinfo',
                'getVotes',
                'createShareimg'
            ]
        },
        {
            moudle: 'Login',
            rules: [
                'userLogin',
                'userLoginByThird',
                'getLoginCode',
                'userReg'
            ]
        }
    ]
}
