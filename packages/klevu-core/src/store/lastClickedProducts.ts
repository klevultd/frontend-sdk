class LastClickedProducts {
  public ids: string[] = []

  click(productId: string) {
    this.ids.unshift(productId)
  }
}

export const lastClickedProducts = new LastClickedProducts()
