import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import packageInfo from '../../package.json'

const adapter = new LocalStorage(`${packageInfo.name}-${packageInfo.version}`) // 持久化数据前缀？
const db = low(adapter)

db
  .defaults({
    sys: {},
    database: {}
  })
  .write()

export default db
