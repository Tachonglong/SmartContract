import Contract from 'Contract'
class Factory extends Contract {
  async createFactory () {
    console.log(this.name)
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'FACTORY',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getFactoryByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getFactory () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'FACTORY') lists.push(account)
    })
    return lists
  }
}
export default Factory;