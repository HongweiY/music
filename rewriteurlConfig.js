module.exports = [
    { regex: /\/abc/, dist: '/user/login' },
    { regex: /\/public(.*)/, dist: null },
    { src: '/', dist: '/user/login' }
]