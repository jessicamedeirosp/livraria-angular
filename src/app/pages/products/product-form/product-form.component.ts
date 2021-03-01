import { ProductsService } from "./../shared/products.service";
import { AfterContentChecked, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { formatCurrency } from "@angular/common";

import { Product } from "./../shared/product.model";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit, AfterContentChecked {
  CREATE = "create";
  UPDATE = "update";

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: "",
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ",",
  };

  currentyAction: string = this.CREATE;
  productForm: FormGroup;
  pageTitle: string = "Cadastro de Livros";
  submittingForm: boolean = false;
  product: Product;
  serverErrorMessages: string[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setCurrencyAction();
    this.buildProductForm();
    this.loadProduct();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentyAction === this.CREATE) this.createProduct();
    else this.updateProduct();
  }

  // protected method

  protected buildProductForm() {
    this.productForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      author: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  protected setCurrencyAction() {
    if (this.route.snapshot.url[0].path !== this.CREATE)
      this.currentyAction = this.UPDATE;
  }

  protected setPageTitle() {
    if (this.currentyAction !== this.CREATE) {
      this.pageTitle = "Alterar livro";
    }
  }

  protected loadProduct() {
    if (this.currentyAction === this.UPDATE)
      this.route.paramMap
        .pipe(
          switchMap((params) => this.productService.readById(params.get("id")))
        )
        .subscribe(
          (product: Product) => {
            product = this.getAndFormatProduct(product);
            this.product = product;
            this.productForm.patchValue(product);
          },
          () =>
            Swal.fire(
              "Oops...",
              `Ocorreu um erro ao tentar ao carregar dados do livro: ${this.product.name}`,
              "error"
            )
        );
  }

  protected createProduct() {
    const product: Product = this.getAndFormatProduct();
    this.productService.create(product).subscribe(
      (product) => this.actionsForSuccess(),

      (error) => this.actionsForError(error)
    );
  }

  protected updateProduct() {
    const product: Product = this.getAndFormatProduct();
    this.productService.update(product).subscribe(
      (product) => this.actionsForSuccess(),
      (error) => this.actionsForError(error)
    );
  }

  protected actionsForError(error: any) {
    Swal.fire({
      title: "Oops...",
      text: "Ocorreu um erro ao salvar o livro",
      icon: "error",
    }).then(() => {
      this.submittingForm = false;

      if (error.status === 422)
        this.serverErrorMessages = JSON.parse(error._body).errors;
      else
        this.serverErrorMessages = [
          "Falha na comunicação com o servidor. Por favor, tente mais tarde",
        ];
    });
  }

  protected actionsForSuccess() {
    Swal.fire({
      title: "Salvo",
      text: "Livro Salvo com sucesso!",
      icon: "success",
    }).then(() => {
      this.router.navigate([""]);
    });
  }
  protected getAndFormatProduct(
    product: Product = Product.fromJson(this.productForm.value)
  ) {
    let price: string = product.price ? product.price : "";
    const newProduct: Product = {
      id: product.id,
      name: product.name,
      author: product.author,
      price: price.toString().replace(",", "."),
    };
    return newProduct;
  }
}
