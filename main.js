import Contract from 'Contract'
import Product from './product'
//import Factory from './factory';
import User from './users'

class TokenMain extends Contract {
  static viewFuncs = [

    'getFarm',
    'getFactory',
    'getTransportation',
    'getBorderCrossing',
    'getWarehouse',
    'getMarket',
    'getEnduser'

  ]
  static authenticationFuncs = [

    'addWashing',
    'addPacking',
    'addProcessing',
    'addDistributioncenter',
    'addEnduser'
  ]
  static publicFuncs = [
    'createFarm',
    'getFarm',
    'createFactory',
    'getFactory',
    'addWashing',
    //'getWashing',
    'addPacking',
    //'getPacking',
    'addProcessing',
    //'getProcessing',
    'createTransportation',
    'getTransportation',
    'createBorderCrossing',
    'getBorderCrossing',
    'createWarehouse',
    'getWarehouse',
    'addDistributioncenter',
    'createMarket',
    'getMarket',
    'addEnduser'
    //'getEnduser',

  ]
  static schemas = {
    name: {
      type: String,
      default: 'DISTRIBUTION'
    },
    accounts: [
      {
        type: {
          type: String,
          default: 0
        },
        address: {
          type: String,
          required: true
        }
      }
    ]
  }
  constructor(data) {
    super(data)
    this._product = new Product(data)
    this._user = new User(data)
  }
  //---------------------FARM------------------------------

  async createFarm() {
    let farm = await this._user.createUsers('FARM')
    return farm
  }
  getFarm() {
    let farm = this._user.getUsersByType('FARM')
    return farm
  }


  // async createFactory() {
  //   let factory = await this._user.createUsers('FACTORY')
  //   return factory
  // }
  // getFactory() {
  //   let farm = this._user.getUsersByType('FACTORY')
  //   return farm
  // }

  // async createWarehouse() {
  //   let warehouse = await this._user.createUsers('WAREHOUSE')
  //   return warehouse
  // }
  // getWarehouse() {
  //   let farm =this._user.getUsersByType('WAREHOUSE')
  //   return farm
  // }




  // --------------------FACTORY---------------------------
  async createFactory() {
    await this._user.checkUser(this.sender, 'FARM')
    let factory = await this._product.createProduct('FACTORY')
    return factory
  }
  async addWashing() {
    let checkFactory = this._product.getProductByAddress(this.sender)
    if (!checkFactory || checkFactory.type !== 'FACTORY') throw 'FACTORY IS NOT EXIST'
    let washing = await this._product.createProduct('WASHING')
    this.setToAddress(washing.address)
    //return { washing }
    return 'ADD SUCCESS'
  }
  async addPacking() {

    let checkFactory = this._product.getProductByAddress(this.sender)
    if (!checkFactory || checkFactory.type !== 'FACTORY') throw 'FACTORY IS NOT EXIST'
    let Packing = await this._product.createProduct('PACKING')
    this.setToAddress(Packing.address)
    //return { Packing }
    return 'ADD SUCCESS'
  }

  async addProcessing() {

    let checkFactory = this._product.getProductByAddress(this.sender)
    if (!checkFactory || checkFactory.type !== 'FACTORY') throw 'FACTORY IS NOT EXIST'
    let Processing = await this._product.createProduct('PROCESSING')
    this.setToAddress(Processing.address)
    // return { Processing }
    return 'ADD SUCCESS'
  }
  // --------------------TRASPORTATION--------------------------
  async createTransportation() {
    await this._user.checkUser(this.sender, 'FACTORY')
    let transportation = await this._product.createProduct('TRANSPORTATION')
    return transportation
  }

  // --------------------BORDERCROSSING---------------------------
  async createBorderCrossing() {
    await this._user.checkUser(this.sender, 'TRANSPORTATION')
    let bordercrossing = await this._product.createProduct('BORDERCROSSING')
    return bordercrossing
  }


  // --------------------WAREHOUSE---------------------------
  async createWarehouse() {
    await this._user.checkUser(this.sender, 'BORDERCROSSING')
    let warehouse = await this._product.createProduct('WAREHOUSE')
    return warehouse
  }
  async addDistributioncenter(){
    let checkWarehouse = this._product.getProductByAddress(this.sender)
    if (!checkWarehouse || checkWarehouse.type !== 'WAREHOUSE') throw 'MARKET IS NOT EXIST'
    let distributioncenter = await this._product.createProduct('DISTRIBUTIONCENTER')
    this.setToAddress(distributioncenter.address)
    // return { Enduser }
    return 'ADD SUCCESS'
  }

   // --------------------MARKET---------------------------
   async createMarket() {
    await this._user.checkUser(this.sender, 'WAREHOUSE')
    let market = await this._product.createProduct('MARKET')
    return market
  }


  // --------------------END USER ---------------------------
  async addEnduser() {
    let checkMarket = this._product.getProductByAddress(this.sender)
    if (!checkMarket || checkMarket.type !== 'MARKET') throw 'MARKET IS NOT EXIST'
    let Enduser = await this._product.createProduct('ENDUSER')
    this.setToAddress(Enduser.address)
    // return { Enduser }
    return 'ADD SUCCESS'
  }


  getFactory() {
    return this._product.getProductsByType('FACTORY')
  }
  getTransportation() {
    return this._product.getProductsByType('TRANSPORTATION')
  }
  getBorderCrossing() {
    return this._product.getProductsByType('BORDERCROSSING')
  }
  getWarehouse() {
    return this._product.getProductsByType('WAREHOUSE')
  }
  getMarket() {
    return this._product.getProductsByType('MARKET')
  }

  
 
  // async createEnduser() {
  //   await this._user.checkUser(this.sender, 'MARKET')
  //   let enduser = await this._product.createProduct('ENDUSER')
  //   return enduser
  // }


  // async addDistributioncenter() {
  //   // let checkWashing = this._product.getProductByAddress(this.sender)
  //   // if (!checkWashing || checkWashing.type !== 'WASHING') throw 'WASHING IS NOT EXIST'
  //   let checKW = this._product.getProductByAddress(this.sender)
  //   if (!checkFactory || checkFactory.type !== 'FACTORY') throw 'FACTORY IS NOT EXIST'
  //   let Processing= await this._product.createProduct('Processing')
  //   this.setToAddress(Processing.address)
  //   return { Processing }
  // }
  // async createEnduser() {
  //   await this._user.checkUser(this.sender, 'PRODUCER')
  //   let enduser = await this._product.createProduct('FACTORY')
  //   return enduser
  // }
  // async createFactory() {
  //   let checkFarm = this._product.getProductByAddress(this.sender)
  //   if (!checkFarm || checkFarm.type !== 'FARM') throw 'FARM IS NOT EXIST'
  //   let factory = await this._product.createProduct('FACTORY')
  //   this.setToAddress(tree.address)
  //  // return {factory  }
  //   return 'ADD SUCCESS'
  // }
  // async addTransportation() {
  //   let checkFactory = this._product.getProductByAddress(this.sender)
  //   if (!checkFactory || checkFactory.type !== 'FACTORY') throw 'FACTORY IS NOT EXIST'
  //   let tranportation = await this._product.createProduct('TRANPORTATION')
  //   this.setToAddress(tranportation.address)
  //   // return {tranportation }
  //   return 'ADD SUCCESS'
  // }
  // async addBordercrossing() {
  //   let checkTransportation = this._product.getProductByAddress(this.sender)
  //   if (!checkTransportation || checkTransportation.type !== 'TRANSPORTATION') throw 'TRANPORTATION IS NOT EXIST'
  //   let bordercrossing = await this._product.createProduct('BORDERCROSSING')
  //   this.setToAddress(bordercrossing.address)
  //   // return {bordercrossing }
  //   return 'ADD SUCCESS'
  // }
  // async createEnduser() {
  //   await this._user.checkUser(this.sender, 'FARM')
  //   let enduser = await this._product.createProduct('ENDUSER')
  //   return enduser
  // }
  // async addMartket() {
  //   let checkWarehose = this._product.getProductByAddress(this.sender)
  //   if (!checkWarehose || checkWarehose.type !== '  ') throw 'WAREHOUSEIS NOT EXIST'
  //   let market = await this._product.createProduct('MARKET')
  //   this.setToAddress(market.address)
  //   // return {market }
  //   return 'ADD SUCCESS'
  // }
  // async addEnduser() {
  //   let checkMarket = this._product.getProductByAddress(this.sender)
  //   if (!checkMarket || checkMarket.type !== '  ') throw 'MARKET IS NOT EXIST'
  //   let enduser = await this._product.createProduct('ENDUSER')
  //   this.setToAddress(enduser.address)
  //   // return {market }
  //   return 'ADD SUCCESS'
  // }

  // getFamer() {
  //   return this._product.getProductsByType('FARM')
  // }
  
  // getEnduse() {
  //   return this._product.getProductsByType('ENDUSER')
  // }



}
export default TokenMain;
