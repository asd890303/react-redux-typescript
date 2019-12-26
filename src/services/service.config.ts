const Host = {
    prod: '',
    localhost: 'http://localhost:8050'
}

export const serviceConfig = {
    host: process.env.NODE_ENV === 'development' ? Host.localhost : Host.prod,
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
