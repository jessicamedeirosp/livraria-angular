import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

import { Product } from "../shared/product.model";
import { ProductsService } from "./../shared/products.service";

@Component({
  selector: "app-products-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.read().subscribe(
      (products: Product[]) => (this.products = products),
      () => Swal.fire("Oops...", "Ocorreu um erro ao listar os livros", "error")
    );
  }

  deleteProduct(product: Product) {
    Swal.fire({
      title: "Tem certeza?",
      text: "você deseja excluir este livro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.value) this.delete(product);
    });
  }

  // protected method

  protected delete(product: Product) {
    this.productService.delete(product.id).subscribe(
      () => {
        this.products = this.products.filter((element) => element !== product);
        Swal.fire("Deletado!", "Livro deletado com sucesso.", "success");
      },
      () =>
        Swal.fire(
          "Oops...",
          `Ocorreu um erro ao tentar excluir o livro: ${product.name}`,
          "error"
        )
    );
  }
}
