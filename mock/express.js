// express_demo.js 文件
// 导入 app.js
const crypto = require('node:crypto')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
app.use(bodyParser())

function generateUUID() {
  return crypto.randomBytes(16).toString('hex').replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next()
})

app.post('/api/login', (req, res) => {
  const { account, pwd } = req.body
  if (account === '123456' && pwd === '123456') {
    res.send({
      code: 0,
      msg: 'ok',
      data: {
        token: 'Token',
      },
    })
  }
  else {
    res.send({
      code: 10000,
      msg: '账号或者密码错误',
      data: {},
    })
  }
})

app.get('/api/user/info', (req, res) => {
  const t = req.headers.token
  if (t === 'Token') {
    res.send({
      code: 0,
      msg: 'ok',
      data: {
        nickname: '满脑的思绪',
        avatar: 'https://s2.loli.net/2023/01/30/thNH2dbqjzETlSK.jpg',
        roles: [{
          id: 1,
          role_name: 'admin',
        }, {
          id: 2,
          role_name: 'user',
        }],
      },
    })
  }
  else {
    res.send({
      code: 10001,
      msg: '请先登录',
      data: {},
    })
  }
})

const userList = [
  {
    id: 500000197903123100,
    nickname: 'Brenda Lee',
    tel: '19868012552',
    sex: '1',
  },
  {
    id: 150000199906103900,
    nickname: 'Richard Walker',
    tel: '13163869615',
    sex: '2',
  },
  {
    id: 650000197507088600,
    nickname: 'Jose Williams',
    tel: '13135291871',
    sex: '1',
  },
  {
    id: 150000197602045300,
    nickname: 'Carol Thomas',
    tel: '18651712251',
    sex: '1',
  },
  {
    id: 410000201512163140,
    nickname: 'Matthew White',
    tel: '19850719293',
    sex: '1',
  },
  {
    id: 520000200106056300,
    nickname: 'Anthony Smith',
    tel: '18679852264',
    sex: '1',
  },
  {
    id: 460000200307153860,
    nickname: 'Jose Rodriguez',
    tel: '18108114124',
    sex: '1',
  },
  {
    id: 530000200005077900,
    nickname: 'Scott Thompson',
    tel: '18187829022',
    sex: '2',
  },
  {
    id: 210000199709288540,
    nickname: 'Jennifer Jackson',
    tel: '18683406529',
    sex: '2',
  },
  {
    id: 500000201809093570,
    nickname: 'Melissa Brown',
    tel: '18136162636',
    sex: '1',
  },
  {
    id: 370000199411228160,
    nickname: 'Melissa Martin',
    tel: '18173462648',
    sex: '1',
  },
  {
    id: 610000199911266200,
    nickname: 'Carol Lopez',
    tel: '19814976185',
    sex: '1',
  },
  {
    id: 13000020151226174,
    nickname: 'Jason Wilson',
    tel: '19857759947',
    sex: '1',
  },
  {
    id: 310000197203047200,
    nickname: 'Ruth Lee',
    tel: '19824051237',
    sex: '1',
  },
  {
    id: 630000199707172000,
    nickname: 'Frank Garcia',
    tel: '13194332447',
    sex: '2',
  },
  {
    id: 120000199503017890,
    nickname: 'Maria Gonzalez',
    tel: '19825356652',
    sex: '1',
  },
  {
    id: 230000200104222340,
    nickname: 'Deborah Allen',
    tel: '19819527474',
    sex: '2',
  },
  {
    id: 120000197311102190,
    nickname: 'Jessica Martin',
    tel: '18138079147',
    sex: '2',
  },
  {
    id: 460000198605081500,
    nickname: 'Jeffrey Johnson',
    tel: '18172923854',
    sex: '2',
  },
  {
    id: 350000200502183400,
    nickname: 'Jeffrey Harris',
    tel: '18158335757',
    sex: '2',
  },
  {
    id: 510000199004188200,
    nickname: 'Charles Gonzalez',
    tel: '18181894776',
    sex: '2',
  },
  {
    id: 640000197405132400,
    nickname: 'Helen Lopez',
    tel: '13427731574',
    sex: '2',
  },
  {
    id: 110000198507111140,
    nickname: 'Angela Miller',
    tel: '13027056173',
    sex: '1',
  },
  {
    id: 820000199812017000,
    nickname: 'Dorothy Garcia',
    tel: '18645448955',
    sex: '1',
  },
  {
    id: 650000201810259100,
    nickname: 'Cynthia Thomas',
    tel: '18647092743',
    sex: '2',
  },
  {
    id: 630000199406013800,
    nickname: 'Richard Lee',
    tel: '13552148853',
    sex: '1',
  },
  {
    id: 120000199803265400,
    nickname: 'Timothy Martin',
    tel: '18188359337',
    sex: '1',
  },
  {
    id: 350000202209302800,
    nickname: 'Maria Allen',
    tel: '18111922345',
    sex: '1',
  },
  {
    id: 310000200904213760,
    nickname: 'Mark White',
    tel: '18180465457',
    sex: '1',
  },
]

app.get('/api/user/list', (req, res) => {
  const page_no = req.query.page_no ?? 1
  const page_size = req.query.page_size ?? 10
  const sex = req.query.sex ?? 0
  // 等待 1s 返回数据
  setTimeout(() => {
    res.send({
      code: 0,
      msg: 'ok',
      data: {
        page_size,
        page_no,
        count: userList.filter(x => Number.parseInt(sex) === 0 || Number.parseInt(x.sex) === Number.parseInt(sex)).length,
        list: userList.filter(x => Number.parseInt(sex) === 0 || Number.parseInt(x.sex) === Number.parseInt(sex)).slice((page_no - 1) * page_size, page_no * page_size),
      },
    })
  }, 1000)
})

// 根据年月返回相应的作业分布
app.get('/api/homework/days', (req, res) => {
  const year = req.query.year ?? 1
  const month = req.query.month ?? 10
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const result = []
  for (let day = 1; day <= daysInMonth; day++) {
    // 随机生成0或者0-9以内的随机数
    const count = (Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 100))
    result.push({ id: generateUUID(), day, count })
  }

  setTimeout(() => {
    res.send({
      code: 0,
      msg: '获取成功！',
      data: result,
    })
  }, 1000)
})

// 根据日期获取作业列表
app.get('/api/homework/list', (req, res) => {
  const day = req.query.day
  const count = req.query.count
  const { page_size = 10, page_no = 1 } = req.query
  if (!day || Number.isNaN(count)) {
    return res.send({
      code: -1,
      msg: '获取作业列表失败，参数错误！',
    })
  }

  const startIndex = (page_no - 1) * page_size
  // 判断是否有足够的数据来填充当前页
  if (startIndex >= count) {
    // 如果请求的页码超过了实际数据范围，可选择返回空list或前一页数据，这里以返回空list为例
    return res.send({
      code: 0,
      msg: '获取成功！',
      data: {
        count,
        page_no,
        page_size,
        list: [],
      },
    })
  }
  // 计算本次应返回的数据量
  const pageSizeForThisPage = Math.min(page_size, count - startIndex)
  const result = {
    count: Number.parseInt(count),
    page_no: '1',
    page_size: '10',
    list: [],
  }
  for (let i = 0; i < pageSizeForThisPage; i++) {
    result.list.push({
      id: generateUUID(),
      type: Math.random() > 0.5 ? 0 : 1,
      title: `${day}号家庭作业作业${i + 1}`,
      status: Math.floor(Math.random() * 3) + 1,
      start_time: Math.floor(new Date().getTime() / 1000),
      end_time: (new Date().getTime() + Math.floor(Math.random() * 10) * 60 * 60 * 1000) / 1000,
      total: Math.floor(Math.random() * 100),
      done: Math.floor(Math.random() * 10),
    })
  }

  setTimeout(() => {
    res.send({
      code: 0,
      msg: '获取成功！',
      data: result,
    })
  }, 2000)
})

app.listen(8081, () => {
  // eslint-disable-next-line no-console
  console.log('应用实例，访问地址为 http://127.0.0.1:8081')
})
