const Host = {
    prod: '',
    localhost: 'http://localhost'
}

export const serviceConfig = {
    host: process.env.NODE_ENV === 'development' ? Host.localhost : Host.prod,
    services: [
        {
            moudle: 'Video',
            rules: [
                'getVideoList',
                'getComments',
            ]
        },
        {
            moudle: 'Login',
            rules: [
                'userLogin',
                'getLoginCode',
            ]
        }
    ]
}
