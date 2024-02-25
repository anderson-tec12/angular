export enum ProductEvent {
  ADD_PRODUCT_EVENT = "Adicionar produto",
  EDIT_PRODUCT_EVENT = "Editar produto",
  SALE_PRODUCT_EVENT = 'Vender produto'
}

export interface DeleteProductAction{
  product_id:string;
  product_name:string
}
