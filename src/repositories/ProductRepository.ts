import BaseRepository from '@/repositories/BaseRepository'
import store from '@/store'
import { APIClient } from '@/network/APIClient'
import { ProductAPI } from '@/network/api/Product'
import { StoreItems, StoreItem, ClearItems } from '@/store/modules/product/types'
import { IProduct, IProductsCriteria } from '@/entities/Product'

export class ProductRepository implements BaseRepository {

  constructor() {}

  async fetchItem(id: number): Promise<IProduct> {
    return await APIClient.shared.request(new ProductAPI.GetProduct(id))
  }

  saveItem(item: IProduct) {
    store.commit(new StoreItem(item))
  }

  async fetchItems(params: PaginationRequest<IProductsCriteria>) {
    // Note: maybe use gateway?
    return await APIClient.shared.request(new ProductAPI.GetProducts(params))
  }

  // save items and params
  saveItems(params: List<IProduct>) {
    store.commit(new StoreItems(params))
  }

  clearItems(){
    store.commit(new ClearItems())
  }
}
